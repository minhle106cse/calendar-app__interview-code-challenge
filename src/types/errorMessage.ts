interface ErrorResponse {
  error_description: string
}

interface BaseErrorMessage {
  status: number
  data: ErrorResponse | string
}

export interface ErrorMessage extends BaseErrorMessage {
  data: ErrorResponse
}

export interface AxiosErrorMessage extends BaseErrorMessage {
  data: string
}

export const isErrorMessage = (payload: unknown): payload is ErrorMessage => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'status' in payload &&
    'data' in payload &&
    typeof payload.data === 'object' &&
    payload.data !== null &&
    'error_description' in payload.data
  )
}

export const isAxiosErrorMessage = (
  payload: unknown
): payload is AxiosErrorMessage => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'status' in payload &&
    'data' in payload &&
    typeof payload.data === 'string'
  )
}
