import { createSlice } from '@reduxjs/toolkit';
// import {UPDATE_ORDER_REQUEST,UPDATE_ORDER_FAIL,UPDATE_ORDER_SUCCESS,DELETE_ORDER_REQUEST,DELETE_ORDER_FAIL
// ,DELETE_ORDER_SUCCESS,UPDATE_ORDER_RESET,DELETE_ORDER_RESET} from "../constants/orderConstant"
const initialState = {
  loading: false,
  isUpdated: false,
  deletedData:{},
  isDeleted: false,
  error: null,
};

const orderModifySlice = createSlice({
  name: 'orderModify',
  initialState,
  reducers: {
    UPDATE_ORDER_REQUEST: (state) => {
      state.loading = true;
    },
    UPDATE_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_ORDER_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      UPDATE_ORDER_RESET: (state) => {
        state.isUpdated = false;
      },
    DELETE_ORDER_REQUEST:(state)=>{
        state.loading=true;
    },
    DELETE_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted=true;
      state.deletedData=action.payload;
    },
    
    DELETE_ORDER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    DELETE_ORDER_RESET: (state) => {
      state.isDeleted = false;
    },
  },
});

//  export {DELETE_ORDER_RESET
//   updateOrderRequest,
//   updateOrderSuccess,
//   deleteOrderSuccess,
//   updateOrderFail,
//   deleteOrderFail,
//   updateOrderReset,
//   deleteOrderReset,
//  } = orderModifySlice.actions;

export default orderModifySlice;