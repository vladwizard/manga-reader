import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    defaultLanguage: string,
    // chapterLanguage: string,

}

const initialState: CounterState = {
    defaultLanguage: 'en',
    // chapterLanguage: 'en',
}

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeDefaultLanguage: (state, action: PayloadAction<string>) => {
            state.defaultLanguage = action.payload
        },
        // changeChapterLanguage: (state, action: PayloadAction<string>) => {
        //     state.chapterLanguage = action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { changeDefaultLanguage } = languageSlice.actions

export default languageSlice.reducer