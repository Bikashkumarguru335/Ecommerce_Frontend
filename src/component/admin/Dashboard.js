import React,{useEffect} from 'react'
import Sidebar from "./Sidebar.js"
import "./dashboard.css"
import { Typography } from '@mui/material'
import {Link} from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import {getAdminProduct} from "../../reducers/productReducer.js"
import {Line,Doughnut} from "react-chartjs-2"
import {Chart as ChartJs,LineElement,PointElement, CategoryScale,LinearScale,Tooltip,Legend,ArcElement} from 'chart.js'
import { getAllOrders } from '../../reducers/orderAction.js'
import { getAllUsers } from '../../reducers/userAction.js'
ChartJs.register(CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Legend,ArcElement)
const Dashboard = () => {
  const products=useSelector((state)=>state.product?.data?.Product)
  const order=useSelector((state)=>state.allOrder?.order);
  const users=useSelector((state)=>state.allUsers?.users); 
  console.log(order)
  const dispatch=useDispatch();
let outOfStock=0;
products && products.forEach((item) => {
  if(item.stock===0){
    outOfStock+=1;
}
});  

useEffect(()=>{
       dispatch(getAdminProduct());
       dispatch(getAllOrders())
       dispatch(getAllUsers())
},[dispatch])
let totalAmount=0;
order && order.forEach(item=>{
  totalAmount+=item.totalPrice;
})
  const lineState={
    labels:["Initial Amount","Amount Earned"],
    datasets:[
      {
        label:"Total Amount",
         backgroundColor:"tomato",
         hoverBackgroundColor:"rgb(197,72,49)",
         borderColor:"aqua",
         data:[0,totalAmount],

      },
    ],

  }
  const options={
    scales:{
      x:{
        ticks:{
          font:{
            size:35,
            
          }
        },
        grid: {
          display: true, // Show x-axis grid lines
          lineWidth: 3, // Set the width of x-axis grid lines
        },
  
      },
      y:{
        ticks:{
          font:{
            size:35,
          }
        },
        grid: {
          display: true, // Show x-axis grid lines
          lineWidth: 3, // Set the width of x-axis grid lines
        },
  
        }
    },
     }
  const doughnutState={
    labels:["Out of Stock","In Stock"],
    datasets:[
      {
        backgroundColor:["#00A684","#6800B4"],
        hoverBackgroundColor:["#4B5000","#35014F"],
        data:[outOfStock !== undefined ? outOfStock : 0,
          products !== undefined && Array.isArray(products) ? products.length - outOfStock : 0,]
      }
    ]
  }
  return (
    <div className='dashboard'>
        <Sidebar/>
        <div className='dashboardContainer'>
          <Typography component="h1">Dashboard</Typography>
          <div className='dashboardSummary'>
            <div>
              <p>
                Total Amount <br/>₹{totalAmount} 
                </p>
            </div>
            <div className='dashboardSummaryBox2'>
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{order && order.length}</p>
              </Link>
              <Link to="/admin/user">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
       <div className='lineChart'>
        <Line data={lineState} options={options}/>
      </div> 
      <div className='doughnutChart'>
        <Doughnut data={doughnutState}/>
      </div>
        </div>
    </div>
  )
}

export default Dashboard