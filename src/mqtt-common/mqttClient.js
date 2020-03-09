// Import Paho
import Paho from 'paho-mqtt'

var client = new Paho.Client('192.168.1.170', 9001, 'web-client');
// Set Callback handlers 
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.onConnected = onConnected;
// Connect to the Broker
connect(true)
// Subscribe To some topics
subscribe_to_topic('/status/compass')



async function connect(tryReconnect) {
    // Connect the Client
    console.log('Trying to connecct to broker')
    await client.connect({
        cleanSession: true,
        reconnect: tryReconnect, 
    });
}

// Called when the client connectes
function onConnected (reconnect, uri) {
    if (reconnect) console.log('Reconnected to Broker at : ' + uri);
    else console.log('Connected to new Broker at : ' + uri);
}

// Callled when the client loses it's connection 
function onConnectionLost (responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage);
    }
}

function subscribe_to_topic (topic) {
    client.subscribe(topic, {onSuccess: () => {
        console.log('Subscribed to topic : ' + topic)
    }});
}

function pubish_message (topic, msg) {
    var message = new Paho.Message(msg);
    message.destinationName = topic;
    client.send(message);
}

// Called when a Message arrives
function onMessageArrived (message) {
    console.log('onMessageArrived:' + message.payloadString)
}




