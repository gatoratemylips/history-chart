import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from './toggleSlice'
import colorReducer from './colorSlice'


export const store = configureStore({
    reducer: {
        toggle: toggleReducer,
        change: colorReducer
    },
})