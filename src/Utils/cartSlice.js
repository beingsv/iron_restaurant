import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    restaurantDetails: [],
  },
  reducers: {
    restaurantDetails: (state, action) => {
      if (state.restaurantDetails.id != action.payload.id) {
        state.items = [];
      }
      state.restaurantDetails = action.payload;
    },

    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.items.push(newItem);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.card.info.id == action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.card.info.id == action.payload
      );
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }

      if (item.quantity === 0) {
        state.items = state.items.filter(
          (item) => item.card.info.id !== action.payload
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

  },
});

export default cartSlice.reducer;

export const {
  restaurantDetails,
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
