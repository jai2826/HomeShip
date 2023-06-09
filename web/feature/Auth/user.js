import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn:false,
    data:{
        id:null,
        name:null,
        email:null,
        phone:null,
        password:null,
        address:null,
    }
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login:(state,action)=>{
      const {id, name , email , phoneNumber , password , address} = action.payload
      // console.log(action)
      state.isLoggedIn  = true;
      state.data.id     = id;
      state.data.name   = name;
      state.data.email  = email;
      state.data.phone  = phoneNumber;
      state.data.password  = password;
      state.data.address  = address;
    },
    logout:(state)=>{
      state.isLoggedIn  = false;
      state.data.id     = null;
      state.data.name   = null;
      state.data.email  = null;
      state.data.phone  = null;
      state.data.password  = null;
      state.data.address  = null;
    }

  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = UserSlice.actions

export default UserSlice.reducer