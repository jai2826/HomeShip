import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    categories: [],
    price: {
      start: 0,
      end: 50000,
    },
    rating:0,
  },
};

export const filterSlice = createSlice({
  name: "Filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.data = action.payload;
      // console.log("Redux Filters Set",state.data)
    },
    clearFilters: (state) => {
      state.data = {
        categories: [],
        price: {
          start: 0,
          end: 50000,
        },
        rating: 0,
        
      };
      
    },
    clearRatingFilters: (state) => {
      state.data.rating = 0      
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilters, clearFilters,clearRatingFilters } = filterSlice.actions;

export default filterSlice.reducer;
