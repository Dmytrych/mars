import {configDotenv} from "dotenv";
import {loadConfig} from "./config";
import {init as initAmqp, Queue} from "./amqp";

async function run() {
  configDotenv()

  const appConfig = loadConfig()

  const channel = await initAmqp(appConfig)

  await channel.consume(Queue.Notification, (message) => {
    console.log("TODO: IMPLEMENT");
  })
}

run()
