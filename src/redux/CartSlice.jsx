import { createSlice } from "@reduxjs/toolkit";

// Safely parse localStorage
let initialCart = [];
try {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) initialCart = JSON.parse(savedCart);
} catch (error) {
  initialCart = [];
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart, // array of cart items
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    deleteFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      else if (item && item.quantity === 1) {
        return state.filter((i) => i.id !== item.id);
      }
    },
    clearCart: () => [],
  },
});

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
