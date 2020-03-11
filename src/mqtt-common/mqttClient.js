import Paho from 'paho-mqtt'

const broker_ip = '192.168.1.170';
const broker_port = 9001

// Creates an MQTT client and connects to the broker service. 
function connect(tryReconnect, topic) {
    const client = new Paho.Client(broker_ip, broker_port, 'web-client');
    console.log('Trying to connecct to broker')
    client.connect({
        cleanSession: true,
        reconnect: tryReconnect, 
        onSuccess: () => {
            console.log('Connected to Broker at : ' + broker_ip);
            client.subscribe(topic, {onSuccess: () => {
                console.log('Subscribed to topic : ' + topic)
            }});
        }
    });
    // Set Callback handlers 
    client.onConnectionLost = onConnectionLost;
    return client;
}

// Callled when the client loses it's connection 
function onConnectionLost (responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage);
    }
}


function subscribe_to_topic (client, topic) {
    client.subscribe(topic, {onSuccess: () => {
        console.log('Subscribed to topic : ' + topic)
    }});
}

function pubish_message (client, topic, msg) {
    var message = new Paho.Message(msg);
    message.destinationName = topic;
    client.send(message);
}


const mqttService = {
    connect,
    subscribe_to_topic,
    pubish_message,
}

export default mqttService; 