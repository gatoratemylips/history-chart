import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '#121090',
}

export const colorSlice = createSlice({
  name: 'change',
  initialState,
  reducers: {
    colorPick: (state, action) => {
        state.value = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { colorPick } = colorSlice.actions

export default colorSlice.reducer