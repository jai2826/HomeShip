import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  id:null,
};

export const FavouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    setFavourite: (state, action) => {
      state.products = action.payload.data;
      state.id = action.payload.id;
    },
    clearFavourite: (state) => {
      state.products = [];
      state.id = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFavourite, clearFavourite } = FavouriteSlice.actions;

export default FavouriteSlice.reducer;
