import Paho from 'paho-mqtt'

// Configuration of the MQTT Client
const broker_ip = '192.168.1.170';
const broker_port = 9001

// Default Subscriptions
const default_subscriptions = [
    '/status/compass',
    '/status/gps',
    '/status/adc',
    '/status/internal_compass',
    '/status/temp',
    '/status/vector',
    '/command/log/startstop',
    '/command/log/name',
]

// State for the MQTT Client
var client = null
var subscriberCallbacks = {
    "/status/compass": [],
    "/status/gps": [],
    "/status/adc": [],
    '/status/internal_compass': [],
    "/status/temp": [],
    "/status/vector": [],
    "/command/log/startstop": [],
    "/command/log/name": [],
}

// Initializes the MQTT client's connection if the connection hasn't been established
function initializeConnection() {
    if (client == null) {
        client = connect(true, default_subscriptions)
    }
}

// Adds a new callback for the given topic
function subscribe_to_topic(topic, callback) {
    initializeConnection()
    subscriberCallbacks[topic].push(callback)
}

//publishes a message to the broker
function publish_message(topic, msg) {
    initializeConnection()
    var message = new Paho.Message(msg);
    message.destinationName = topic;
    client.send(message);
}

// Creates an MQTT client and connects to the broker service. 
function connect(tryReconnect, topic) {
    const clientID = Math.floor(Math.random() * 100);
    const client = new Paho.Client(broker_ip, broker_port, 'web-' + clientID);
    console.log('Trying to connecct to broker')
    client.connect({
        cleanSession: true,
        reconnect: tryReconnect,
        onSuccess: () => {
            console.log('Connected to Broker at : ' + broker_ip);
            client.subscribe(topic, {
                onSuccess: () => {
                    console.log('Subscribed to topic : ' + topic)
                }
            });
        }
    });
    // Set Callback handlers 
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    return client;
}

// Callled when the client loses it's connection 
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage);
    }
}

// Set the client's default callback message
function onMessageArrived(message) {
    var obj = JSON.parse(message.payloadString)
    var topic = message.destinationName
    var callbacks = subscriberCallbacks[topic]
    callbacks.forEach(x => x(obj))
}

const mqttService = {
    subscribe_to_topic,
    publish_message,
}

export default mqttService; 