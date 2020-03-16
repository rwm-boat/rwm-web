import React, { Component } from 'react';

import mqttService from './mqtt-common/mqttClient'

class Telemetry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // from '/command/log/startstop' and '/command/log/name'
            log_running: -1, log_name: 'none',
            // from '/status/compass'
            temp: 0.0, compass: 0.0, gyro_z: 0.0, kalman_lp: 0.0, kalman: 0.0,
            // from '/status/gps'
            time: 0.0, latitude: 0.0, longitude: 0.0, speed: 0.0, course: 0.0, distance: 0.0,
            // from '/status/vector'
            heading: 0.0, magnitude: 0.0,
            // from '/status/adc'
            jet1_amps: 0.0, jet2_amps: 0.0, jet_delta: 0.0, pack_voltage: 0.0,
            // from '/status/temp'
            jet1_temp: 0.0, jet2_temp: 0.0, compartment_temp: 0.0,
        };

        // Set callbacks for the needed topics
        mqttService.subscribe_to_topic("/status/compass", x => this.update_compass(x));
        mqttService.subscribe_to_topic("/status/gps", x => this.update_gps(x));
        mqttService.subscribe_to_topic("/status/vector", x => this.update_vector(x));
        mqttService.subscribe_to_topic("/status/adc", x => this.update_adc(x));
        mqttService.subscribe_to_topic("/status/temp", x => this.update_temp(x));
        mqttService.subscribe_to_topic("/command/log/startstop", x => this.update_log_running(x));
        mqttService.subscribe_to_topic("/command/log/name", x => this.update_log_name(x));
    }

    update_compass(obj) {
        this.setState({
            temp: obj.temp,
            compass: obj.compass,
            gyro_z: obj.gyro_z,
            kalman_lp: obj.kalman_lp,
            kalman: obj.kalman
        });
    }

    update_gps(obj) {
        this.setState({
            time: obj.time,
            latitude: obj.latitude,
            longitude: obj.longitude,
            speed: obj.speed,
            course: obj.course,
            distance: obj.distance,
        });
    }

    update_vector(obj) {
        this.setState({
            heading: obj.heading,
            magnitude: obj.magnitude,
        });
    }

    update_adc(obj) {
        this.setState({
            jet1_amps: obj.jet1_amps,
            jet2_amps: obj.jet2_amps,
            pack_voltage: obj.pack_voltage,
            jet_delta: obj.jet1_amps - obj.jet2_amps
        });
    }

    update_temp(obj) {
        this.setState({
            jet1_temp: obj.jet1_temp,
            jet2_temp: obj.jet2_temp,
            compartment_temp: obj.compartment_temp,
        });
    }

    update_log_running(obj) {
        this.setState({
            log_running: obj.running,
        });
    }

    update_log_name(obj) {
        this.setState({
            log_name: obj.name,
        });
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
                <h2>/status/vector</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sensor</th>
                            <th className="num">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Heading</td>
                            <td className="num">{this.state.heading.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Magnitude</td>
                            <td className="num">{this.state.magnitude.toFixed(4) || 0.0}</td>
                        </tr>
                    </tbody>
                </table>
                <h2>/status/adc</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sensor</th>
                            <th className="num">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jet 1 Current</td>
                            <td className="num">{this.state.jet1_amps.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Jet 2 Current</td>
                            <td className="num">{this.state.jet2_amps.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Jet Delta</td>
                            <td className="num">{this.state.jet_delta.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Pack Voltage</td>
                            <td className="num">{this.state.pack_voltage.toFixed(4) || 0.0}</td>
                        </tr>
                    </tbody>
                </table>
                <h2>/status/temp</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sensor</th>
                            <th className="num">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jet 1 Temp</td>
                            <td className="num">{this.state.jet1_temp.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Jet 2 Temp</td>
                            <td className="num">{this.state.jet2_temp.toFixed(4) || 0.0}</td>
                        </tr>
                        <tr>
                            <td>Compartment Temp</td>
                            <td className="num">{this.state.compartment_temp.toFixed(4) || 0.0}</td>
                        </tr>
                    </tbody>
                </table>
                <h2>/command/log</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sensor</th>
                            <th className="num">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Log Running</td>
                            <td className="num">{this.state.log_running.toFixed(4) || -1.0}</td>
                        </tr>
                        <tr>
                            <td>Log Name</td>
                            <td className="num">{this.state.log_name || 'none'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Telemetry;