import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: []
}

export const productSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    setProducts: (state, action)=>{
        state.data = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProducts } = productSlice.actions

export default productSlice.reducer