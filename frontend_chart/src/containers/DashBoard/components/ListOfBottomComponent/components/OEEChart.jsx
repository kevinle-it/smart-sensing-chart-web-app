import React, {Component} from 'react'
import DoughnutChart from "../../../../Charts/ChartJS/components/DoughnutChart";

export default class OEEChart extends Component {

    render() {
        let {availabilityNumber, performanceNumber, qualityNumber, loading} = this.props;
        let availabilityChartData = [{
            data: [availabilityNumber, 100 - availabilityNumber],
            backgroundColor: [
                "#FFFFFF",
                "#303339"
            ]
        }];
        let performanceChartData = [{
            data: [performanceNumber, 100 - performanceNumber],
            backgroundColor: [
                "#C88FFA",
                "#303339"
            ]
        }];

        let qualityCenterText = 'N/A';
        let qualityChartData = [{
            data: [0, 100],
            backgroundColor: [
                "#FF7033",
                "#303339"
            ]
        }];
        if (qualityNumber != 'N/A'){
            qualityChartData = [{
                data: [qualityNumber, 100 - qualityNumber],
                backgroundColor: [
                    "#FF7033",
                    "#303339"
                ]
            }];
            qualityCenterText = `Quality\n${qualityNumber}%`;
        }

        return (
            <div className="oee-main">
                <div className="container">
                    <div className="row">
                        <div className="col-12"><h4>OEE</h4></div>
                        <div className="col-4 align-self-center"><DoughnutChart loading={loading} labels={["Availability", ""]} data={availabilityChartData} centerText={`Availability\n${availabilityNumber}%`}/></div>
                        <div className="col-4 align-self-center"><DoughnutChart loading={loading} labels={["Performance", ""]} data={performanceChartData} centerText={`Performance\n${performanceNumber}%`}/></div>
                        <div className="col-4 align-self-center"><DoughnutChart loading={loading} labels={["Quality", ""]} data={qualityChartData} centerText={qualityCenterText}/></div>
                    </div>
                </div>
            </div>
        )
    }
}
