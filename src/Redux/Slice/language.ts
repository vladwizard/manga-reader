import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    language: string
}

const initialState: CounterState = {
    language: 'en',
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeLanguage } = languageSlice.actions

export default languageSlice.reducer