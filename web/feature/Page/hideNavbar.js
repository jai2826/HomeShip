import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    value:false
}
export const NavbarSlice = createSlice({
  name: 'hideNavbar',
  initialState,
  reducers: {
    hideNav:(state)=>{
        state.value = true
    },
    showNav:(state)=>{
        state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { hideNav, showNav } = NavbarSlice.actions

export default NavbarSlice.reducer