import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './customAxios/axiosBaseQuery'
import eventEndpoints from '../endpoints/event'
import { EventFormData, Event } from '../types/event'
import LOCAL_STORAGE from '../constants/localStorage'

export const eventApi = createApi({
  reducerPath: 'eventApi',
  tagTypes: ['Event'],
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getEvents: build.query<{ events: Event[] }, void>({
      query: () => ({
        url: eventEndpoints.event(
          localStorage.getItem(LOCAL_STORAGE.ORGANIZATION) ?? ''
        ),
        method: 'GET',
        params: {
          page_size: 100
        }
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.events.map(({ id }) => ({
                type: 'Event' as const,
                id
              })),
              'Event'
            ]
          : ['Event']
    }),
    postEvent: build.mutation<{ id: string }, { event: EventFormData }>({
      query: (data) => ({
        url: eventEndpoints.event(
          localStorage.getItem(LOCAL_STORAGE.ORGANIZATION) ?? ''
        ),
        method: 'POST',
        data: data
      }),
      invalidatesTags: ['Event']
    }),
    editEvent: build.mutation<unknown, { event: EventFormData; id: string }>({
      query: ({ event, id }) => ({
        url: eventEndpoints.targetEvent(id),
        method: 'POST',
        data: {
          event: event
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Event', id: arg.id }]
    }),
    deleteEvent: build.mutation<unknown, { id: string }>({
      query: ({ id }) => ({
        url: eventEndpoints.targetEvent(id),
        method: 'DELETE'
      }),
      invalidatesTags: ['Event']
    })
  })
})

export const {
  usePostEventMutation,
  useGetEventsQuery,
  useDeleteEventMutation,
  useEditEventMutation
} = eventApi
