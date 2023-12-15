const {PubSub} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();
let data= "My message"
let projectId = process.env.PROJECT_ID
let topicNameOrId = `projects/${projectId}/topics/my-topic2`;

async function publishMessage(topicNameOrId, data) {
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