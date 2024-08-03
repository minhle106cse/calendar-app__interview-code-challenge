import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './customAxios/axiosBaseQuery'
import meEndpoints from '../endpoints/me'
import Me from '../types/me'
import { OrganizationData } from '../types/organization'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getMe: build.query<Me, void>({
      query: () => ({
        url: meEndpoints.me,
        method: 'GET'
      })
    }),
    getOrganization: build.query<OrganizationData, void>({
      query: () => ({
        url: meEndpoints.organization,
        method: 'GET'
      })
    })
  })
})

export const { useGetMeQuery, useGetOrganizationQuery } = userApi
