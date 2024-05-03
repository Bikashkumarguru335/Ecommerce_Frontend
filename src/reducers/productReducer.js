import  axios from "axios";
import productSlice from "../actions/productAction";
import productDetailsSlice from "../component/Home/productDetails";
import newProduct from "../actions/newProductReducer";
import productsSlice from "../actions/productsReducer";
import allReviewsSlice from "../actions/reviewDetials";
import reviewsSlice from "../actions/deleteReviews";
const {ALL_REVIEWS_REQUEST,ALL_REVIEWS_SUCCESS,ALL_REVIEWS_FAIL,DELETE_REVIEW_REQUEST,DELETE_REVIEW_SUCCESS,DELETE_REVIEW_FAIL}=allReviewsSlice.actions;
const { DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS }=productsSlice.actions;
const  { NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS }=newProduct.actions;
const{ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCESS,ALL_PRODUCT_FAIL,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_SUCESS,NEW_REVIEW_REQUEST,NEW_REVIEW_FAIL,NEW_REVIEW_SUCCESS}=productSlice.actions;
const { PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_SUCCESS,
UPDATE_PRODUCT_REQUEST,UPDATE_PRODUCT_SUCCESS,UPDATE_PRODUCT_FAIL}=productDetailsSlice.actions;
  
//these are the action of redux toolkit

export const fetchAllProducts=(keyword="",currentPage=1,price=[50,20000],category,ratings=0)=>async(dispatch)=>{

    try{
        
      dispatch(ALL_PRODUCT_REQUEST()); 

let result=await axios.get(`/api/v1/products?keyword=${keyword}&&page=${currentPage}&price[gte]=${price[0]}
&price[lte]=${price[1]}&ratings[gte]=${ratings}
`)

if(category){
result=await axios.get(`/api/v1/products?keyword=${keyword}&&page=${currentPage}&price[gte]=${price[0]}
&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`)
}
console.log(result);
dispatch(ALL_PRODUCT_SUCESS(result));
        
    }
    catch(error){
        dispatch(ALL_PRODUCT_FAIL(error.message))
        
    }
}
//get all products for admin

export const getAdminProduct=()=>async(dispatch)=>{
try{
dispatch(ADMIN_PRODUCT_REQUEST())
const data=await axios.get("/api/v1/admin/products")
dispatch(ADMIN_PRODUCT_SUCESS(data))
console.log(data)
}
catch(error){
    dispatch(ADMIN_PRODUCT_FAIL(error.message))
    
}
}
//create product
export const createNewProduct=(productData,token)=>async(dispatch)=>{
    try{
        dispatch(NEW_PRODUCT_REQUEST())
        console.log(productData,token)

    const data=await axios.post("/api/v1/admin/products/new",productData,token)
    console.log(data)
dispatch(NEW_PRODUCT_SUCCESS(data))
    }
    catch(error){
        dispatch(NEW_PRODUCT_FAIL(error.response.data.message || error.message));

    }
}
// get product details 
export const productDetails=(id)=>async(dispatch)=>{
    try{
        console.log(id);
        dispatch(PRODUCT_DETAILS_REQUEST())
        const data=await axios.get(`/api/v1/products/${id}`)
        console.log(data);
        dispatch(PRODUCT_DETAILS_SUCCESS(data));
    }
    catch(error){
        
        dispatch(PRODUCT_DETAILS_FAIL(error.message))
    }
    }
//delete product-dashboard 
export const deleteProduct=(id)=>async(dispatch)=>{
   
    try{    
        dispatch(DELETE_PRODUCT_REQUEST())
         const data=await axios.delete(`/api/v1/admin/products/${id}`)
         console.log(data)
        dispatch(DELETE_PRODUCT_SUCCESS(data))
    }
    catch(error){
        dispatch(DELETE_PRODUCT_FAIL(error.message))
        console.log(error)
    }
} 
 //update product
export const updateProduct=(id,productData)=>async(dispatch)=>{
    try{
        dispatch(UPDATE_PRODUCT_REQUEST())
        const config={
           headers:{
            "Content-Type":"application/json"
           } 
        }
        
const data=await axios.put(`/api/v1/admin/products/${id}`,productData,config)
        // console.log(productData);
        console.log(data.data);

    dispatch(UPDATE_PRODUCT_SUCCESS(productData))
    }
    catch(error){
        dispatch(UPDATE_PRODUCT_FAIL(error.message))
    }
}
//new review
export const newReview=(reviewData)=>async(dispatch)=>{
    try{
        dispatch(NEW_REVIEW_REQUEST())
        const config={
            headers:{"Content-Type":"application/json"}
        }
        const retrive=await axios.put(`/api/v1/review`,reviewData,config)
        
        dispatch(NEW_REVIEW_SUCCESS(retrive.success))
    }
    catch(error){
        
        dispatch(NEW_REVIEW_FAIL(error.message))
    }
    } 
 
//get all review of a product
export const getAllReviews=(id)=>async(dispatch)=>{
    try{
        dispatch(ALL_REVIEWS_REQUEST())
        
        const data=await axios.get(`/api/v1/reviews?id=${id}`)
        console.log(data)
        dispatch(ALL_REVIEWS_SUCCESS(data))
    }
    catch(error){
        
        dispatch(ALL_REVIEWS_FAIL(error.message))
    }
    } 

    //delete reviews of product
    export const deleteReview=(reviewId,productId)=>async(dispatch)=>{
        try{
            dispatch(DELETE_REVIEW_REQUEST())
            
            const data=await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`)
            console.log(data)
            dispatch(DELETE_REVIEW_SUCCESS(data.success))
        }
        catch(error){
            
            dispatch(DELETE_REVIEW_FAIL(error.message))
        }
        } 