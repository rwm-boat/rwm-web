import React, {Component} from 'react';

import mqttService from './mqtt-common/mqttClient'

class Telemetry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            temp: 0.0, compass: 0.0, gyro_z: 0.0, kalman_lp: 0.0, kalman: 0.0,
            time: 0.0, latitude: 0.0, longitude: 0.0, speed: 0.0, course: 0.0, distance: 0.0,
        };


        // Create MQTT Client, subscribe to '/status/compass'
        this.client = mqttService.connect(true, ['/status/compass', '/status/gps'])
        
        // Set the client's default callback message
        this.client.onMessageArrived = (message) => {
            // console.log('Telemetry: Message Received on Topic : ' + message.destinationName)
            //console.log('Telemetry : onMessageArrived:' + message.payloadString)
            var obj = JSON.parse(message.payloadString)
            var topic = message.destinationName

            switch (topic) {
                case "/status/compass":
                    this.setState({
                        temp: obj.temp,
                        compass: obj.compass,
                        gyro_z: obj.gyro_z,
                        kalman_lp: obj.kalman_lp,
                        kalman: obj.kalman
                    });
                    break;
                case "/status/gps":
                    this.setState({
                        time: obj.time,
                        latitude: obj.latitude,
                        longitude: obj.longitude,
                        speed: obj.speed,
                        course: obj.course,
                        distance: obj.distance,
                    });
                    break;
                default:
                    console.log('Received Message on Unrecognized Topic' + topic)
            }

            
            
        }

    }

    render() {
        return (
            <div className="telemetry">
                <h1>Live Telemetry</h1> 
                <h2>/status/compass</h2> 
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
                <h2>/status/gps</h2> 
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sensor</th>
                            <th className="num">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Time</td>
                            <td className="num">{this.state.time || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Latitude</td>
                            <td className="num">{this.state.latitude.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Longitude</td>
                            <td className="num">{this.state.longitude.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td className="num">{this.state.speed.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Course</td>
                            <td className="num">{this.state.course.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Distance</td>
                            <td className="num">{this.state.distance.toFixed(4) || 0.0}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Telemetry;