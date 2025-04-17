import {initApi} from "./api"
import {configDotenv} from "dotenv";
import {loadConfig} from "./features/configuration";

async function startup() {
  configDotenv()
  const config = loadConfig()
  await initApi(config)
}

startup()
