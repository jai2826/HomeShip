import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visible: false,
}

export const UtilSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    utilToggle: (state )=>{
        state.visible=!state.visible
    },
  },
})

// Action creators are generated for each case reducer function
export const { utilToggle } = UtilSlice.actions

export default UtilSlice.reducer