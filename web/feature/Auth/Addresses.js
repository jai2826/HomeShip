import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data:null
}

export const AddressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    setAddresses:(state,action)=>{
        state.data = action.payload
    },
    removeAddresses:(state,action)=>{
        state.data = null;
    }

  },
})

// Action creators are generated for each case reducer function
export const { setAddresses, removeAddresses } = AddressesSlice.actions

export default AddressesSlice.reducer