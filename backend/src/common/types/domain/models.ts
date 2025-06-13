export type ConnectionStatus = "PENDING" | "ACCEPTED" | "REJECTED"

export interface IConnectionModel {
  id: string,
  clientId: string,
  trainerId: string,
  status: ConnectionStatus,
  createdAt: Date,
}

export interface IUserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
