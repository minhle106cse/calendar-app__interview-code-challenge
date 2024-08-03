import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './customAxios/axiosBaseQuery'
import meEndpoints from '../endpoints/me'
import Me from '../types/me'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getMe: build.query<Me, void>({
      query: () => ({
        url: meEndpoints.me,
        method: 'GET'
      })
    })
  })
})

export const { useGetMeQuery } = userApi
