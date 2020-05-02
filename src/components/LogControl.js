import React, { Component } from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import mqttService from '../services/mqttService';

class LogControl extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // from '/command/log/startstop' and '/command/log/name'
            log_running: 0, log_name: 'none', log_newname: 'Enter a Log Title',
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

    handleChange(event) {
        this.setState({
            log_newname: event.target.value,
        });
    }

    handleSubmit(event) {
        console.log(this.state.log_newname)
        mqttService.publish_message('/command/log/name', JSON.stringify({
            name: this.state.log_newname
        }));
        event.preventDefault();
    }

    handleButtonChange(event) {
        if (event.length > 0){
            var old = event[0];
            var updated = event[1];
            if ((old !== -1) && (updated !== -1)){
                console.log(old, updated)
                mqttService.publish_message('/command/log/startstop', JSON.stringify({
                    running: updated
                }));
            }

        }
    }

    render() {
        return (
            <div className="telemetry">
                <h1>Logging Control</h1>
                <h2>Status '/command/log'</h2>
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
                            <td className="num">{this.state.log_running || -1.0}</td>
                        </tr>
                        <tr>
                            <td>Log Name</td>
                            <td className="num">{this.state.log_name || 'none found'}</td>
                        </tr>
                    </tbody>
                </table>
                <h2>Publish '/command/log'</h2>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <label>
                        Name:
                        <input type="text" value={this.state.log_newname} onChange={event => this.handleChange(event)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <ToggleButtonGroup type="checkbox" value={this.state.log_running} onChange={event => this.handleButtonChange(event)}>
                    <ToggleButton value={-1}>No Connection</ToggleButton>
                    <ToggleButton value={0}>Not Logging</ToggleButton>
                    <ToggleButton value={1}>Log Running</ToggleButton>
                </ToggleButtonGroup>
            </div>
        );
    }
}


export default LogControl;
