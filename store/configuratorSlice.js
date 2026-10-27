import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null,
  selections: {},
  totalPrice: 0,
  savedId: null,
};

const slice = createSlice({
  name: 'configurator',
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
      state.selections = {};
      state.totalPrice = action.payload?.basePrice || 0;
    },
    setSelection(state, action) {
      const { part, material, color } = action.payload;
      state.selections[part] = { material, color };
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    setSavedId(state, action) {
      state.savedId = action.payload;
    },
    reset(state) {
      return initialState;
    },
  },
});

export const { setProduct, setSelection, setTotalPrice, setSavedId, reset } = slice.actions;
export default slice.reducer;