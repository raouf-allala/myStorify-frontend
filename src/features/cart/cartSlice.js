import { createSlice } from '@reduxjs/toolkit';
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cartItems: [],
      cartCount: 0,
      totale: 0,
    };
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state, action) {
      state.cartItems = [];
      state.cartCount = 0;
      state.totale = 0;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    addToCart(state, action) {
      if (
        state.cartItems.some((item) => item.id === action.payload.id)
      ) {
        const index = state.cartItems.findIndex((item) => {
          return item.id === action.payload.id;
        });
        const oldValue = state.cartItems[index];
        state.cartItems[index] = action.payload;
        state.totale =
          state.totale -
          oldValue.prix * oldValue.count +
          action.payload.prix * action.payload.count;
      } else {
        state.cartItems.push(action.payload);
        state.cartCount = state.cartCount + 1;
        state.totale =
          state.totale + action.payload.prix * action.payload.count;
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    removeFromCart(state, action) {
      state.cartItems.splice(
        state.cartItems
          .map((item) => item.id)
          .indexOf(action.payload.id),
        1
      );
      state.cartCount = state.cartCount - 1;
      state.totale =
        state.totale - action.payload.prix * action.payload.count;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});
export const { addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
