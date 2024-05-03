import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";

import productSlice from "./actions/productAction";
import productDetailsSlice from "./component/Home/productDetails";
//  import userSlice from "./actions/userReducer";
import registerSlice from "./actions/registerUser";
import loaduserSlice from "./actions/LoadReducer";
// import logoutSlice from "./actions/logoutReducer";
import profileSlice from "./actions/profileReducer";
import passwordSlice from "./actions/passwordReducer";
import forgotSlice from "./actions/forgotPassword";
import resetPasswordSlice from "./actions/resetPassword";
import cartSlice from "./actions/cartReducer";
import shippingSlice from "./actions/shippinginfoReducer";
import newOrderSlice from "./actions/orderReducer";
import myOrderSlice from "./actions/orderSlice";
import newProduct from "./actions/newProductReducer";
import productsSlice from "./actions/productsReducer";
import orderModifySlice from "./actions/orderModifySlice";
import orderDetailsSlice from "./actions/orderDetailReducer";
import allOrderSlice from "./actions/allOrderReducer";
import allUserSlice from "./actions/allUserReducer";
import userDetailsSlice from "./actions/userDetailsReducer";
// import reviewsSlice from "./actions/deleteReviews";
import allReviewsSlice from "./actions/reviewDetials";



const store=configureStore({
    reducer:{
    product:productSlice.reducer,
    productDetails:productDetailsSlice.reducer,
    // loginDetails:userSlice.reducer,
    registerUser:registerSlice.reducer,
    userDetails:loaduserSlice.reducer,
    // logoutUser:logoutSlice.reducer,
    profileUpdate:profileSlice.reducer,
    passwordUpdate:passwordSlice.reducer,
    forgotPassword:forgotSlice.reducer,
    resetPassword:resetPasswordSlice.reducer,
    cart:cartSlice.reducer,
    shipping:shippingSlice.reducer,
    newOrders:newOrderSlice.reducer,
    myOrder:myOrderSlice.reducer,
    orderDetails:orderDetailsSlice.reducer,
    newProduct:newProduct.reducer,
    allOrder:allOrderSlice.reducer,
    productsReducer:productsSlice.reducer,
    orderModify:orderModifySlice.reducer,
    allUsers:allUserSlice.reducer,
    userDetailsReducer:userDetailsSlice.reducer,
    reviewDetails:allReviewsSlice.reducer,
    // deleteReviews:reviewsSlice.reducer,
    },
  middleware: [...getDefaultMiddleware({ serializableCheck: false })], // Disable serializable check

 
})

export default store;