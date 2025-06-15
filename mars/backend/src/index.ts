import {initApi} from "./api"
import {configDotenv} from "dotenv";
import {loadConfig} from "./api/config/load-config";

async function startup() {
  configDotenv()
  await initApi(loadConfig())
}

startup()
