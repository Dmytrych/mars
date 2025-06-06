export type ValidationResult<TData> = SuccessResult<TData> | FailureResult

type SuccessResult<TData = undefined> = {
  success: true
  data?: TData
}

type FailureResult = {
  success: false,
  error?: {
    message?: string,
    details?: any
  }
}
