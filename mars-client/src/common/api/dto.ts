export type ApiError = {
  message?: string,
  details?: any
}

export type ApiResponse<TData> = {
  success: boolean,
  error?: ApiError,
  data?: TData
}
