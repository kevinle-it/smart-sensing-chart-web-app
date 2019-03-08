import React, {Component} from 'react';
import DefectRate from './components/DefectRate';
import DefectRateOverview from './components/DefectRateOverview';
import ProductionRate from './components/ProductionRate';
import ProductionRateOverview from './components/ProductionRateOverview';
import {TabContent, TabPane} from 'reactstrap';
import API from "../../services/api";
import moment from "moment";
import {GlobalFilterProps} from "../../shared/prop-types/ReducerProps";
import {connect} from "react-redux";

class ReportPage extends Component {
    static propTypes = {
        globalDateFilter: GlobalFilterProps.isRequired,
    };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            productionRateDateLabels: null,
            productionRate: null,
            defectRateDateLabels: null,
            defectByTypeOverTime: null,
        };

        //initiate socket
        this.loginData = JSON.parse(localStorage.getItem('logindata'));
        this.role = this.loginData.data.role;

        switch (this.role) {
            case 'admin':
                this.lineCode = 'OS001';
                break;
            case 'ip':
                this.lineCode = '4B01';
                break;
            case 'os':
                this.lineCode = 'OS001';
                break;
            default:
                this.lineCode = 'OS001';
                break;
        }
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            let {startDate, endDate} = this.props.globalDateFilter;

            // Subtract 1 day because the Oracle DB is now only store Date in YYYYMMDD format without exact Time
            let param = {
                from_workdate: moment(startDate.toISOString()).format("YYYYMMDD"),
                to_workdate: moment(endDate.toISOString()).subtract(1, "days").format("YYYYMMDD"),
            };

            this.requestProductionRates(param);
            this.requestDefectByTypeOverTime(param);
        }
    }

    componentDidMount() {
        let {startDate, endDate} = this.props.globalDateFilter;

        let param = {
            from_workdate: moment(startDate.toISOString()).format("YYYYMMDD"),
            to_workdate: moment(endDate.toISOString()).subtract(1, "days").format("YYYYMMDD"),
        };

        this.requestProductionRates(param);
        this.requestDefectByTypeOverTime(param);
    }

    requestProductionRates = (param) => {
        API('api/os/productionRate', 'POST', param)
            .then((response) => {
                if (response.data.success) {
                    let dataArray = response.data.data;

                    let {from_workdate, to_workdate} = param;
                    let startMoment = moment(from_workdate, "YYYYMMDD");
                    let endMoment = moment(to_workdate, "YYYYMMDD");

                    let dateLabelsAndProductionRatesMap = new Map();
                    while (startMoment.isSameOrBefore(endMoment)) {
                        // array of 3 (zero) elements for 3 production rates of 3 shifts each day
                        dateLabelsAndProductionRatesMap.set(startMoment.format('DD/MM/YYYY'), [0, 0, 0]);

                        startMoment = startMoment.add(1, "days");
                    }

                    let shiftDataOfCurrentDay, currentProductionRate = 0;
                    dataArray.map(currentData => {
                        currentProductionRate = currentData['PRODUCTION_RATE'];
                        // Round to 2 decimal places
                        currentProductionRate = currentProductionRate % 1 === 0
                            ? currentProductionRate
                            : Math.round(currentProductionRate * 100) / 100;

                        switch (currentData['SHIFT_NO']) {
                            case '1':
                                shiftDataOfCurrentDay = dateLabelsAndProductionRatesMap.get(currentData['WORK_DATE']);
                                shiftDataOfCurrentDay[0] = currentProductionRate;
                                dateLabelsAndProductionRatesMap.set(currentData['WORK_DATE'], shiftDataOfCurrentDay);
                                break;
                            case '2':
                                shiftDataOfCurrentDay = dateLabelsAndProductionRatesMap.get(currentData['WORK_DATE']);
                                shiftDataOfCurrentDay[1] = currentProductionRate;
                                dateLabelsAndProductionRatesMap.set(currentData['WORK_DATE'], shiftDataOfCurrentDay);
                                break;
                            case '3':
                                shiftDataOfCurrentDay = dateLabelsAndProductionRatesMap.get(currentData['WORK_DATE']);
                                shiftDataOfCurrentDay[2] = currentProductionRate;
                                dateLabelsAndProductionRatesMap.set(currentData['WORK_DATE'], shiftDataOfCurrentDay);
                                break;
                        }
                    });

                    let dateLabels = [];
                    let shift1 = [], shift2 = [], shift3 = [];
                    let averageProductionRate = 0, averageProductionRatesByDay = [];
                    dateLabelsAndProductionRatesMap.forEach((shiftData, date) => {
                        dateLabels.push(date);

                        shift1.push(shiftData[0]);
                        shift2.push(shiftData[1]);
                        shift3.push(shiftData[2]);

                        averageProductionRate = (shiftData[0] + shiftData[1] + shiftData[2]) / 3;

                        averageProductionRate = averageProductionRate % 1 !== 0
                            ? Math.round(averageProductionRate * 100) / 100
                            : averageProductionRate;

                        averageProductionRatesByDay.push(averageProductionRate);    // Average of 3 shifts
                    });

                    let dataToShow = [];
                    // Colors = Shift 1 + Shift 2 + Shift 3 + Average line + Average point background color
                    let colors = ['#FF9C64', '#8C67F6', '#F575F7', '#EBEDF1', '#CCCCCC'];
                    for (let i = 1; i <= 4; ++i) {  // 3 Shifts' Production Rates + 1 Average Production Rates
                        if (i < 4) {
                            dataToShow.push(
                                {
                                    label: `Shift ${i}`,
                                    backgroundColor: colors[i - 1],
                                    data: eval(`shift${i}`)
                                }
                            );
                        } else {
                            dataToShow.push(
                                {
                                    label: 'Average',
                                    borderColor: colors[i - 1],
                                    borderWidth: 2,
                                    pointRadius: 0,
                                    pointBorderWidth: 2,
                                    pointBackgroundColor: colors[i],
                                    pointBorderColor: colors[i - 1],
                                    data: averageProductionRatesByDay,

                                    type: 'line',
                                    fill: false,
                                    tension: 0
                                }
                            );
                        }
                    }

                    this.setState({
                        ...this.state,
                        productionRateDateLabels: dateLabels,
                        productionRate: dataToShow,
                    });
                }
            })
            .catch((err) => console.log('err:', err));
    };

    requestDefectByTypeOverTime = (param) => {
        API('api/os/defectByTypeOverTime', 'POST', param)
            .then((response) => {
                if (response.data.success) {
                    let dataArray = response.data.data;

                    let {from_workdate, to_workdate} = param;
                    let startMoment = moment(from_workdate, "YYYYMMDD");
                    let endMoment = moment(to_workdate, "YYYYMMDD");

                    let dateLabelsAndDefectRatesMap = new Map();
                    while (startMoment.isSameOrBefore(endMoment)) {
                        // array of 4 (zero) elements for 4 defect rates of 4 shifts each day
                        dateLabelsAndDefectRatesMap.set(startMoment.format('DD/MM/YYYY'), [0, 0, 0, 0]);

                        startMoment = startMoment.add(1, "days");
                    }

                    let defectRatesOfCurrentDay;
                    dataArray.map(currentDay => {
                        defectRatesOfCurrentDay = dateLabelsAndDefectRatesMap.get(currentDay['WORK_DATE']);

                        defectRatesOfCurrentDay[0] = currentDay['DEFECT_COUNT1'];
                        defectRatesOfCurrentDay[1] = currentDay['DEFECT_COUNT2'];
                        defectRatesOfCurrentDay[2] = currentDay['DEFECT_COUNT3'];
                        defectRatesOfCurrentDay[3] = currentDay['DEFECT_COUNT4'];

                        dateLabelsAndDefectRatesMap.set(currentDay['WORK_DATE'], defectRatesOfCurrentDay);
                    });

                    let dateLabels = [];
                    let defectType1 = [], defectType2 = [], defectType3 = [], defectType4 = [];
                    let totalDefectsByDay = [];
                    dateLabelsAndDefectRatesMap.forEach((defectRates, date) => {
                        dateLabels.push(date);

                        defectType1.push(defectRates[0]);
                        defectType2.push(defectRates[1]);
                        defectType3.push(defectRates[2]);
                        defectType4.push(defectRates[3]);

                        totalDefectsByDay.push(defectRates[0] + defectRates[1] + defectRates[2] + defectRates[3]);
                    });

                    let dataToShow = [];
                    // Colors = Type 1 + Type 2 + Type 3 + Type 4 + Total Defect line + Total Defect point background color
                    let colors = ['#FF9C64', '#46D6EA', '#F575F7', '#8C67F6', '#EB6A91', '#EBEDF1'];
                    for (let i = 1; i <= 5; ++i) {  // 4 Defect Types + 1 Total Defect
                        if (i < 5) {
                            dataToShow.push(
                                {
                                    label: `Type ${i}`,
                                    backgroundColor: colors[i - 1],
                                    data: eval(`defectType${i}`)
                                }
                            );
                        } else {
                            dataToShow.push(
                                {
                                    label: 'Total Defect',
                                    borderColor: colors[i - 1],
                                    borderWidth: 2,
                                    pointRadius: 0,
                                    pointBorderWidth: 2,
                                    pointBackgroundColor: colors[i],
                                    pointBorderColor: colors[i - 1],
                                    data: totalDefectsByDay,

                                    type: 'line',
                                    fill: false,
                                    tension: 0
                                }
                            );
                        }
                    }

                    this.setState({
                        ...this.state,
                        defectRateDateLabels: dateLabels,
                        defectByTypeOverTime: dataToShow,
                    });
                }
            })
            .catch((err) => console.log('err:', err));
    };

    render() {
        return (
            <div className="container report">
                <div className="row">
                    <div className="col-10">
                        <h3>Line {this.lineCode}</h3>
                    </div>
                    <div className="col-2">
                        <div className="btn-group">
                            <button type="button"
                                    className={(this.state.activeTab === '1') ? "btn btn-primary active" : "btn btn-secondary"}
                                    onClick={() => {
                                        this.toggle('1');
                                    }}
                            >Productivity
                            </button>
                            <button type="button"
                                    className={(this.state.activeTab === '2') ? "btn btn-primary active" : "btn btn-secondary"}
                                    onClick={() => {
                                        this.toggle('2');
                                    }}
                            >Defect
                            </button>
                        </div>
                    </div>
                </div>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <div className="row">
                            <div className="col-9">
                                <ProductionRate labels={this.state.productionRateDateLabels}
                                                productionRate={this.state.productionRate}/>
                            </div>
                            <div className="col-3">
                                <ProductionRateOverview productionRate={this.state.productionRate}/>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <div className="row">
                            <div className="col-9">
                                <DefectRate labels={this.state.defectRateDateLabels}
                                            defectByTypeOverTime={this.state.defectByTypeOverTime}/>
                            </div>
                            <div className="col-3">
                                <DefectRateOverview defectByTypeOverTime={this.state.defectByTypeOverTime}/>
                            </div>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    globalDateFilter: state.globalDateFilter
});

export default connect(mapStateToProps)(ReportPage);
