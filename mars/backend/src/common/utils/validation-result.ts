import {ApiResponse} from "./response-helpers";
import {ValidationResult} from "../types/utils/validation-result";

export const toApiResponse = <TData>(result: ValidationResult<TData>): ApiResponse<TData> => {
  if (!result.success) {
    return {
      success: result.success,
      error: {
        ...result.error
      }
    }
  }

  return {
    success: result.success,
    data: result?.data
  }
}
