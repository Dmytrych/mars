import {ConnectionStatus} from "../../domain/models/connection.model";

export interface IConnection {
  id: string,
  clientId: string,
  trainerId: string,
  status: ConnectionStatus,
  createdAt: Date,
}

export interface ICreateConnectionParams {
  clientId: string,
  trainerId: string,
  status: ConnectionStatus,
  createdAt: Date,
}
