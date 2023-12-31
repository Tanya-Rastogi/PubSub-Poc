// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');
require('dotenv').config()

async function quickstart(
  projectId = process.env.PROJECT_ID, // Your Google Cloud Platform project ID
  topicNameOrId = 'New-Topic-1', // Name for the new topic to create
  subscriptionName = 'New-Topic-1-Sub' // Name for the new subscription to create
) {
  // Instantiates a client
  const pubsub = new PubSub({projectId});

  // Creates a new topic
  const [topic] = await pubsub.createTopic(topicNameOrId);
  console.log(`Topic ${topic.name} created.`);

  // Creates a subscription on that new topic
  const [subscription] = await topic.createSubscription(subscriptionName);
  console.log(`Subscription ${subscription.name} created.`);

  // Receive callbacks for new messages on the subscription
  // subscription.on('message', message => {
  //   console.log('Received message:', message.data.toString());
  //   process.exit(0);
  // });

  // // Receive callbacks for errors on the subscription
  // subscription.on('error', error => {
  //   console.error('Received error:', error);
  //   process.exit(1);
  // });

  // // Send a message to the topic
  // topic.publishMessage({data: Buffer.from('Test message!')});
}
quickstart()