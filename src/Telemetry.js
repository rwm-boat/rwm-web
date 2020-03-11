import React, {Component} from 'react';

import mqttService from './mqtt-common/mqttClient'

class Telemetry extends Component {
    constructor(props) {
        super(props);

        this.state = { temp: 0.0, compass: 0.0, gyro_z: 0.0, kalman_lp: 0.0, kalman: 0.0 };

        // Create MQTT Client, subscribe to '/status/compass'
        this.client = mqttService.connect(true, '/status/compass')
        
        // Set the client's default callback message
        this.client.onMessageArrived = (message) => {
            //console.log('Telemetry : onMessageArrived:' + message.payloadString)
            var obj = JSON.parse(message.payloadString)
            this.setState({
                temp: obj.temp,
                compass: obj.compass,
                gyro_z: obj.gyro_z,
                kalman_lp: obj.kalman_lp,
                kalman: obj.kalman
            })
        }

    }

    render() {
        return (
            <div className="telemetry">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sensor</th>
                            <th className="num">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Temperature</td>
                            <td className="num">{this.state.temp.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Compass</td>
                            <td className="num">{this.state.compass.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Gyro-Z</td>
                            <td className="num">{this.state.gyro_z.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Kalman-LP</td>
                            <td className="num">{this.state.kalman_lp.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Kalman</td>
                            <td className="num">{this.state.kalman.toFixed(4) || 0.0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Telemetry;