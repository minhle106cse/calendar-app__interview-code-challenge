import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit'
import { isAxiosErrorMessage, isErrorMessage } from '../types/errorMessage'
import { notification } from 'antd'
import { userApi } from '../api/userApi'
import LOCAL_STORAGE from '../constants/localStorage'

/* eslint-disable @typescript-eslint/no-unused-vars */
const errorLoggerMiddleware: Middleware = (_) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (userApi.endpoints.getMe.matchRejected(action)) {
      localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN)

      notification.error({
        description: 'Your session has expired. Please log in again!',
        message: 'Error'
      })

      return next(action)
    }

    const payload = action.payload

    if (isErrorMessage(payload)) {
      notification.error({
        description: payload.data.error_description,
        message: 'Error'
      })
    } else if (isAxiosErrorMessage(payload)) {
      notification.error({
        description: payload.data,
        message: 'Error'
      })
    }
  }

  return next(action)
}

export default errorLoggerMiddleware
