import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:false,
    progress: 0
}
export const LoaderSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    load:(state)=>{
        state.value = true
    },
    notload:(state)=>{
        state.value = false
    },
    setProgress:(state,action)=>{
      state.progress = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { load, notload, setProgress } = LoaderSlice.actions

export default LoaderSlice.reducer