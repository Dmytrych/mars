export type ConnectionStatus = "pending" | "accepted" | "rejected";

export interface IConnectionModel {
  id: string,
  clientId: string,
  trainerId: string,
  status: ConnectionStatus,
  createdAt: Date,
}

export const CONNECTION_TABLE_NAME = "connections";
