const {PubSub} = require('@google-cloud/pubsub');
require('dotenv').config()
const pubSubClient = new PubSub();
let data= "My message ---3"
let projectId = process.env.PROJECT_ID
let topicNameOrId = `projects/${projectId}/topics/New-Topic-1`;

async function publishMessage(topicNameOrId, data) {
    console.log(topicNameOrId)
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(data);
  
    try {
      const messageId = await pubSubClient
        .topic(topicNameOrId)
        .publishMessage({data: dataBuffer});

      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
}
publishMessage(topicNameOrId,data)