import React, { Component } from 'react';

import mqttService from '../services/mqttService';

class LogControl extends Component {

    constructor (props) {
        super(props);
        
        this.state= {
             // from '/command/log/startstop' and '/command/log/name'
             log_running: -1, log_name: 'none',
        }

        // Set Callbacks for Updating Component
        mqttService.subscribe_to_topic("/command/log/startstop", x => this.update_log_running(x));
        mqttService.subscribe_to_topic("/command/log/name", x => this.update_log_name(x));
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

    render () {
        return (
            <div className="telemetry">
                <h1>Change Logging</h1>
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
                            <td className="num">{this.state.log_name || 'none found'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


export default LogControl;