import {DatabaseError} from "pg";

export const UNIQUE_VIOLATION_ERROR = 'UniqueViolation';
const UNKNOWN_DB_ERROR = 'UnknownDatabaseError';

const POSTGRES_ERROR_CODES_MAP: Record<string, string> = {
  '23505': UNIQUE_VIOLATION_ERROR,
}

export function toGeneralDbError(postgresError: DatabaseError) {
  const errorCode = postgresError.code;

  if (errorCode && errorCode in POSTGRES_ERROR_CODES_MAP) {
    return new DbError(POSTGRES_ERROR_CODES_MAP[errorCode], postgresError.message);
  }

  return new DbError(UNKNOWN_DB_ERROR, postgresError.message);
}

export class DbError extends Error {
  public readonly constraint: string

  constructor(constraint: string, message: string) {
    super(message);
    this.constraint = constraint;
  }
}
