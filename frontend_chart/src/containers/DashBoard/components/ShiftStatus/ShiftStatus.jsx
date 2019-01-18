import React, {Component} from 'react'
import ShiftStatusItem from './components/ShiftStatusItem';
import moment from "moment";
import Singleton from "../../../../services/Socket";

export default class ShiftStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArray: "",
        };
    }

    componentDidMount() {
        let loginData = JSON.parse(localStorage.getItem('logindata'));
        let token = loginData.token;
        let socket = Singleton.getInstance(token);

        var mDateFrom = moment.utc([2019, 0, 2, 10, 6, 40]);
        var uDateFrom = mDateFrom.unix();
        var mDateTo = moment.utc([2019, 0, 2, 10, 6, 43]);
        var uDateTo = mDateTo.unix();
        socket.emit('shift_status', {
            msg: {
                event: 'sna_shift_status',
                from_timedevice: "",
                to_timedevice: "",
                minute: 30
            }
        });

        socket.on('sna_shift_status', (data) => {

            let returnArray = JSON.parse(data);
            let dataArray = returnArray.data;
            dataArray.sort(function (a, b) {
                if (parseInt(a.idStation) < parseInt(b.idStation)) {
                    return -1;
                }
                if (parseInt(a.idStation) > parseInt(b.idStation)) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                dataArray: dataArray,
            });
        });

        socket.on('token', (data) => {
            let tokenObject = JSON.parse(data);
            if (!tokenObject.success) {
                console.log('Token is expired');
                window.location.href = ("/logout");
            }
        });

    }

    specifyCurrentShift(dataArray) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth();
        let yyyy = today.getFullYear();
        //shift 1: 6:00 am - 2:00 pm
        //shift 2: 2:00 am - 20:00 pm
        //shift 3: 20:00 pm - 6:00 am
        let shift1From = moment.utc([yyyy, mm, dd, 6, 0, 0]).unix();
        let shift1To = moment.utc([yyyy, mm, dd, 14, 0, 0]).unix();
        let shift2From = shift1To;
        let shift2To = moment.utc([yyyy, mm, dd, 20, 0, 0]).unix();
        let shift3From = shift2To;
        let shift3To = moment.utc([yyyy, mm, dd + 1, 6, 0, 0]).unix();

        let result = 0;
        if (dataArray.length > 0) {
            let timeReceived = dataArray[7].timeRecieved;
            if (timeReceived >= shift1From && timeReceived < shift1To) {
                result = 1;
            } else if (timeReceived >= shift2From && timeReceived < shift2To) {
                result = 2;
            } else if (timeReceived >= shift3From && timeReceived < shift3To) {
                result = 3;
            }
        }
        result = 3;
        return result;
    }

    showShiftItem(dataArray, shiftNo) {
        let result = "";
        if (dataArray.length > 0) {
            if (shiftNo == 1) {
                let total = 0;
                for (let i = 0; i < 8; i++) {
                    total += parseInt(dataArray[i].first_shift);
                }
                result = <ShiftStatusItem shiftNo={shiftNo} total={total}
                                          count1={dataArray[0].first_shift}
                                          count2={dataArray[1].first_shift}
                                          count3={dataArray[2].first_shift}
                                          count4={dataArray[3].first_shift}
                                          count5={dataArray[4].first_shift}
                                          count6={dataArray[5].first_shift}
                                          count7={dataArray[6].first_shift}
                                          count8={dataArray[7].first_shift}
                />
            } else if (shiftNo == 2) {
                let total = 0;
                for (let i = 0; i < 8; i++) {
                    total += parseInt(dataArray[i].second_shift);
                }
                result = <ShiftStatusItem shiftNo={shiftNo} total={total}
                                          count1={dataArray[0].second_shift}
                                          count2={dataArray[1].second_shift}
                                          count3={dataArray[2].second_shift}
                                          count4={dataArray[3].second_shift}
                                          count5={dataArray[4].second_shift}
                                          count6={dataArray[5].second_shift}
                                          count7={dataArray[6].second_shift}
                                          count8={dataArray[7].second_shift}
                />
            } else if (shiftNo == 3) {
                let total = 0;
                for (let i = 0; i < 8; i++) {
                    total += parseInt(dataArray[i].third_shift);
                }
                result = <ShiftStatusItem shiftNo={shiftNo} total={total}
                                          count1={dataArray[0].third_shift}
                                          count2={dataArray[1].third_shift}
                                          count3={dataArray[2].third_shift}
                                          count4={dataArray[3].third_shift}
                                          count5={dataArray[4].third_shift}
                                          count6={dataArray[5].third_shift}
                                          count7={dataArray[6].third_shift}
                                          count8={dataArray[7].third_shift}
                />
            }
        } else {
            result = <ShiftStatusItem/>;
        }
        return result;
    }

    showShiftTable(dataArray) {
        let result = '';
        let currentShift = this.specifyCurrentShift(dataArray);
        let shift1 = this.showShiftItem(dataArray, 1);
        let shift2 = this.showShiftItem(dataArray, 2);
        let shift3 = this.showShiftItem(dataArray, 3);
        if (currentShift == 1) {
            result = <tbody>{shift2}{shift3}{shift1}</tbody>;
        } else if (currentShift == 2) {
            result = <tbody>{shift1}{shift3}{shift2}</tbody>;
        } else if (currentShift == 3) {
            result = <tbody>{shift1}{shift2}{shift3}</tbody>;
        }
        return result;
    };


    render() {
        let dataArray = this.state.dataArray;
        return (
            <table className="table table-bordered table-dark">
                <thead>
                <tr>
                    <th scope="col">Shifts' Status</th>
                    <th scope="col"> 1</th>
                    <th scope="col"> 2</th>
                    <th scope="col"> 3</th>
                    <th scope="col"> 4</th>
                    <th scope="col"> 5</th>
                    <th scope="col"> 6</th>
                    <th scope="col"> 7</th>
                    <th scope="col"> 8</th>
                    <th scope="col"> Total</th>
                </tr>
                </thead>
                {this.showShiftTable(dataArray)}
            </table>
        )
    }
}
