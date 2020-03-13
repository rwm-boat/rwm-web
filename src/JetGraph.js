import React, { Component } from 'react';

import mqttService from './mqtt-common/mqttClient'

import { Scatter } from 'react-chartjs-2'

class JetGraph extends Component {
    constructor(props) {
        super(props);

        //example data
        //this.state = {
        //    current_time: null,
        //    jet1_amps: [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 2, y: 30 }, { x: 5, y: 50 }],
        //    jet2_amps: [{ x: 0, y: 0 }, { x: 3, y: 33 }, { x: 5, y: 55 }]
        //};

        this.state = {
            current_time: null,
            jet1_amps: [],
            jet2_amps: []
        };


        mqttService.subscribe_to_topic("/status/adc", x => this.update_adc(x))
        mqttService.subscribe_to_topic("/status/gps", x => this.update_gps(x));
    }

    update_gps(obj) {
        this.setState({
            current_time: new Date(obj.time).getTime()
        });
    }

    update_adc(obj) {
        if (this.state.current_time != null) {
            let j1_datapoint = { x: this.state.current_time, y: obj.jet1_amps }
            let j2_datapoint = { x: this.state.current_time, y: obj.jet2_amps }
            this.setState({
                jet1_amps: [...this.state.jet1_amps, j1_datapoint],
                jet2_amps: [...this.state.jet2_amps, j2_datapoint]
            });
        }

    }

    render() {
        let data = {
            labels: this.state.times,
            datasets: [
                {
                    label: 'Jet 1',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(0,0,0,1)',
                    borderColor: 'rgba(255,0,0,1)',
                    borderWidth: 2,
                    data: this.state.jet1_amps,
                    showLine: true
                },
                {
                    label: 'Jet 2',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(0,0,0,1)',
                    borderColor: 'rgba(0,255,0,1)',
                    borderWidth: 2,
                    data: this.state.jet2_amps,
                    showLine: true
                }
            ]
        }
        let options = {
            title: {
                display: true,
                text: 'Jet amps',
                fontSize: 20
            },
            legend: {
                display: true,
                position: 'right'
            }
        }

        return (
            <div>
                <Scatter
                    data={data}
                    options={options}
                />
            </div>
        );
    }
}


export default JetGraph;