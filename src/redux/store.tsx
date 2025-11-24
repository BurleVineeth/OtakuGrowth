import { configureStore } from '@reduxjs/toolkit'
import ToastReducer from './features/ToastSlice'

export const store = configureStore({
  reducer: {
    toast: ToastReducer
  },
})

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;