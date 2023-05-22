import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  data: [],
  customer: {
    name: null,
    email: null,
  },
  cartId: null,
  checkoutData: {
    totalCost: 0,
    totalQuantity: 0,
  },
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartToggle: (state) => {
      state.visible = !state.visible;
    },
    setCartItems: (state, action) => {
      const { id, orderItems, totalCost, totalQuantity } = action.payload;
      if (action.payload !== null) {
        state.cartId = id;
        state.data = orderItems;
        state.checkoutData.totalCost = totalCost;
        state.checkoutData.totalQuantity = totalQuantity;
      }
    },
    emptyCart: (state) => {
      state.data = [];
      state.cartId = null;
      state.checkoutData.totalCost = 0;
      state.checkoutData.totalQuantity = 0;
    },
    clearCustomer: (state, action) => {
      state.customer.name = null;
      state.customer.email = null;
    },
    setCustomer: (state, action) => {
      state.customer.name = null;
      state.customer.email = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  cartToggle,
  setCartItems,
  emptyCart,
  clearCustomer,
  setCustomer,
} = CartSlice.actions;

export default CartSlice.reducer;
