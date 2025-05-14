import ApiAdapter from "@/common/api/api-adapter";
import {appConfig} from "@/common/config/appConfig";

export const BackendApiAdapter = new ApiAdapter(appConfig.apis.backend.baseURL);
