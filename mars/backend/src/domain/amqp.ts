import amqp, {Channel} from 'amqplib'
import {Queue} from "../common/types/amqp";
import {AppConfig} from "../common/configuration";

export async function init(config: AppConfig) {
  const channel = await connect(config);
  await initQueues(channel);
  return channel;
}

async function connect(config: AppConfig) {
  const connections = await amqp.connect(config.amqp.host, {
    credentials: amqp.credentials.plain(config.amqp.username, config.amqp.password)
  })

  return await connections.createChannel()
}

async function initQueues(channel: Channel): Promise<void> {
  await channel.assertQueue(Queue.Notification, {
    durable: true
  });
}
