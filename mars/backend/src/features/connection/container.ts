import {asClass} from "awilix";
import {ConnectionRepository} from "./repositories/connection.repository";
import {ConnectionService} from "./services/connection.service";
import {ConnectionController} from "./controllers/connection.controller";
import { NotificationService } from "./services/notification.service";

export const load = () => {
  return {
    connectionRepository: asClass(ConnectionRepository),
    connectionService: asClass(ConnectionService),
    connectionController: asClass(ConnectionController),
    notificationService: asClass(NotificationService)
  }
}
