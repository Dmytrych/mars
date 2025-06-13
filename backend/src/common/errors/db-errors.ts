import {Prisma} from "../../../generated/prisma";

export const UNIQUE_VIOLATION_ERROR = 'UniqueViolation';
const UNKNOWN_DB_ERROR = 'UnknownDatabaseError';

const POSTGRES_ERROR_CODES_MAP: Record<string, string> = {
  'P2002': UNIQUE_VIOLATION_ERROR,
}

export function toGeneralDbError(error: Prisma.PrismaClientKnownRequestError) {
  const errorCode = error.code;

  if (errorCode && errorCode in POSTGRES_ERROR_CODES_MAP) {
    return new DbError(POSTGRES_ERROR_CODES_MAP[errorCode], error.message);
  }

  return new DbError(UNKNOWN_DB_ERROR, error.message);
}

export class DbError extends Error {
  public readonly constraint: string

  constructor(constraint: string, message: string) {
    super(message);
    this.constraint = constraint;
  }
}
