import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visible: false,
  data:[],
  cartId: null,
  checkoutData:{
    totalCost : 0,
    totalQuantity : 0,
  }
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartToggle: (state , action)=>{
        if(state.visible == false)
        state.visible=true
        else 
        state.visible=false
    },
    setCartItems:(state,action)=>{

      const {id, orderItems ,totalCost , totalQuantity}= action.payload
      let total = 0;
      let qty = 0
      if(action.payload !== null)
      {
        state.cartId = id
        state.data = orderItems
        state.checkoutData.totalCost = totalCost
        state.checkoutData.totalQuantity = totalQuantity
      }
    },
    emptyCart:(state)=>{
      state.data = []
      state.cartId=null;
    },


  },
})

// Action creators are generated for each case reducer function
export const { cartToggle,setCartItems,emptyCart } = CartSlice.actions

export default CartSlice.reducer