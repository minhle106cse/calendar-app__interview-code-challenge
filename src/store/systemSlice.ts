import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

type SliceState = {
  isOpen: boolean
  targetedDate: string | null
}

const initialState: SliceState = {
  isOpen: false,
  targetedDate: null
}

const systemSlice = createSlice({
  name: 'system',
  initialState: initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    targetDate: (state, action: PayloadAction<string>) => {
      state.targetedDate = action.payload
    }
  }
})

export const { setOpen, targetDate } = systemSlice.actions
export const selectSystem = (state: RootState) => state.system
export default systemSlice.reducer
