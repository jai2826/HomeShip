import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fetchedData:[],
  displayData:[],
  
}

export const productSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
    setProducts: (state, action)=>{
        state.fetchedData = action.payload
    },
    setDisplayProducts: (state, action)=>{
        state.displayData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProducts,setDisplayProducts } = productSlice.actions

export default productSlice.reducer