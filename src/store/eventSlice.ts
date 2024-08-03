import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { Event } from '../types/event'

type SliceState = {
  events: Event[]
  targetedEvent: Event | null
}

const initialState: SliceState = {
  events: [],
  targetedEvent: null
}

const eventSlice = createSlice({
  name: 'system',
  initialState: initialState,
  reducers: {
    targetEvent: (state, action: PayloadAction<Event | null>) => {
      state.targetedEvent = action.payload
    },
    saveEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload
    }
  }
})

export const { targetEvent, saveEvents } = eventSlice.actions
export const selectEvent = (state: RootState) => state.event
export default eventSlice.reducer
