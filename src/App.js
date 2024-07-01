import './App.css';
import { useEffect,useState } from 'react';
import Header from "./component/layout/Header/Header"
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import webfontloader from "webfontloader";
import axios from 'axios';
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home.js"
import ProductData from "./component/Product/productData.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import SignUp from './component/User/SignUp';
import store from './store';
import { loadUser } from './reducers/userAction';
import { useSelector } from 'react-redux';
import UserOption from "./component/layout/Header/UserOption.js"
import Profile from "./component/User/Profile.js"
import UpdateProfile from "./component/User/UpdateProfile.js";
import Contact from './component/User/Contact';
import About from './component/User/About.js';
import UpdatePassword from "./component/User/UpdatePassword"
import  ForgotPasword  from './component/User/ForgotPassword' 
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./component/Cart/Cart"
import ShippingInfo from "./component/Cart/ShippingInfo.js"
import ConfirmOrder from "./component/Cart/confirmOrder.js"
import MyOrders from "./component/Order/myOrder.js"
import Payment from "./component/Cart/payment.js"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import Dashboard from "./component/admin/Dashboard.js"
import ProductList from "./component/admin/ProductList.js"
import NewProduct from "./component/admin/Newproducts.js"
import UpdateProduct from "./component/admin/UpdateProduct.js"
import  OrderList  from './component/admin/OrderList';
import EditOrder from "./component/admin/EditOrder.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import UserList from "./component/admin/UserList.js"
import UpdateUser from "./component/admin/UpdateUser.js"
import Reviews from "./component/admin/Reviews.js"
import NotFound from './component/layout/NotFound/NotFound.js';

function App() {
  const user=useSelector((state)=>state.userDetails?.user?.user);
  const isAuthenticate=useSelector((state)=>state.userDetails?.isAuthenticated)
  
  const [stripeApiKey,setStripeApiKey]=useState("")
  async function getStripeApiKey(){
    try{
      const userData = localStorage.getItem('userLogin');
            const user = JSON.parse(userData);
            const token=user.token;

    const response=await axios.get("https://ecommerce-backend-mvqm.onrender.com/api/v1/stripeapikey",{headers:{'Authorization': `Bearer ${token}`}});
    if (response.data && response.data.stripeApiKey) {
      setStripeApiKey(response.data.stripeApiKey);
    }
    
    }
    catch(error){
      console.log(error.message)

    }
  }

  useEffect(()=>{
     webfontloader.load({
       google:{
         families:["Roboto","Droid Sans"]
       }
     })
     store.dispatch(loadUser())
     getStripeApiKey();
   },[])
  //  window.addEventListener("contextmenu",(e)=>e.preventDefault())
  return (
   <Router>
    <Header/>
    {isAuthenticate && <UserOption user={user}/>}

    
     <Routes>
    <Route  path='/' element={<Home/>}/>
      <Route  path='/product/:id' element={<ProductData/>}/> 
     <Route  path='/products' element={<Products/>}/>
     <Route  path='/products/:keyword' element={<Products/>}/>
     <Route path='/products/product/:id' element={<ProductData/>}/>
      <Route   path='/Search' element={<Search/>}/>
     <Route   path='/login' element={<SignUp/>}/>
     <Route   path='/contact' element={<Contact/>}/>
     <Route path='/about' element={<About/>}/>
     <Route   path='/account' element={<Profile/>}/>
     <Route   path='/account/me/update' element={<UpdateProfile/>}/>
     <Route   path='/password/update' element={<UpdatePassword/>}/>
      <Route  path='/password/forgot' element={<ForgotPasword/>}/>
      <Route  path='/password/reset/:token' element={<ResetPassword/>}/>
      <Route  path='/cart' element={<Cart/>}/>
      <Route  path='/login/shipping' element={<ShippingInfo/>}/>
       <Route path="/process/payment" element={<Elements stripe={stripeApiKey ? 
        loadStripe(stripeApiKey) : null}><Payment/></Elements>} />
      <Route path='/success' element={<OrderSuccess/>}/>
      <Route path='/order' element={<MyOrders/>}/>
      <Route  path='/order/confirm' element={<ConfirmOrder/>}/>
      <Route path='/order/:id' element={<OrderDetails/>}/>
      <Route path='/admin/dashboard' element={<Dashboard/>} />
      <Route path='/admin/products' element={<ProductList/>}/>
      <Route path='/admin/product/new' element={<NewProduct/>}/>
      <Route path='/admin/products/:id' element={<UpdateProduct/>}/>
      <Route path='/admin/orders' element={<OrderList/>}/>
        <Route path='/admin/order/:id' element={<EditOrder/>}/>
        <Route path='/admin/users' element={<UserList/>}/>
        <Route path='/admin/user/:id' element={<UpdateUser/>}/>
        <Route path='/admin/reviews' element={<Reviews/>}/>
         <Route path='/*' element={<NotFound/>}/> 



     </Routes>
     
     <Footer/>  
   </Router>
  )
  }

export default App;
