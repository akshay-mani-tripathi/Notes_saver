import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice.js'


export const store = configureStore({
  reducer: {
    paste : pasteReducer,
  },
})