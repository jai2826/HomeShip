import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value:false,
}
export const LoaderSlice = createSlice({
  name: 'ProductLoading',
  initialState,
  reducers: {
    load:(state)=>{
        state.value = true
    },
    notload:(state)=>{
        state.value = false
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { load, notload } = LoaderSlice.actions

export default LoaderSlice.reducer