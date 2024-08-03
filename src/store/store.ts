import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '../api/userApi'
import systemReducer from './systemSlice'
import { eventApi } from '../api/eventApi'
import errorLoggerMiddleware from '../middleware/errorLoggerMiddleware'
import eventReducer from './eventSlice'

const store = configureStore({
  reducer: {
    system: systemReducer,
    event: eventReducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer
  },
  middleware: (gDM) =>
    gDM()
      .concat(userApi.middleware)
      .concat(eventApi.middleware)
      .concat(errorLoggerMiddleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
