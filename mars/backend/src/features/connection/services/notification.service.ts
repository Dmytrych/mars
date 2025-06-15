import {Channel} from "amqplib";
import {Queue} from "../../../common/types/amqp";
import {ILogger} from "../../../common/types/logger";

export interface INotificationService {
  send(): Promise<void>;
}

interface INotificationServiceDependencies {
  amqp: Channel
  logger: ILogger
}

export class NotificationService implements INotificationService{
  private readonly amqpChannel: Channel;
  private readonly logger: ILogger;

  constructor(deps: INotificationServiceDependencies) {
    this.amqpChannel = deps.amqp;
    this.logger = deps.logger;
  }

  public async send() {
    this.amqpChannel.sendToQueue(Queue.Notification, Buffer.from("Hello, world!"))
    this.logger.info("Sending notification to queue");
  }
}
