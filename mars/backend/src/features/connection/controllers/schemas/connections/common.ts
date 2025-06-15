import z from "zod";

export const connectionStatusSchema = z.enum(["PENDING", "ACCEPTED", "REJECTED"]);

export const connectionSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  trainerId: z.string(),
  status: connectionStatusSchema,
  createdAt: z.date(),
})
