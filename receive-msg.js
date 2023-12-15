const {PubSub} = require('@google-cloud/pubsub');
require('dotenv').config()
let projectId = process.env.PROJECT_ID

// Creates a client; cache this for further use

const subscriptionNameOrId = `projects/${projectId}/subscriptions/New-Topic-1-Sub`;
const timeout = 60;
const pubSubClient = new PubSub();
function listenForMessages(subscriptionNameOrId, timeout) {
    console.log(subscriptionNameOrId)
    // References an existing subscription
    const subscription = pubSubClient.subscription(subscriptionNameOrId);
  
    // Create an event handler to handle messages
    let messageCount = 0;
    const messageHandler = (message) => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${message.attributes}`);
      console.log(message)
      messageCount += 1;
  
      // "Ack" (acknowledge receipt of) the message
      message.ack();
    };
  
    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);
  
    // Wait a while for the subscription to run. (Part of the sample only.)
    setTimeout(() => {
      subscription.removeListener('message', messageHandler);
      console.log(`${messageCount} message(s) received.`);
    }, timeout * 1000);
}
listenForMessages(subscriptionNameOrId,timeout)