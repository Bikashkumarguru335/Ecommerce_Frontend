    import React ,{Fragment,useEffect} from 'react'
    import { DataGrid } from '@mui/x-data-grid'
    import "./productList.css"
    import  {useDispatch} from "react-redux"
    import { useSelector } from 'react-redux'
    import { Link, useNavigate } from 'react-router-dom'
    import { Button } from '@mui/material'
    import MetaData from '../layout/metaData'
    import { MdEdit,MdDelete } from 'react-icons/md'
    import Sidebar from './Sidebar'
    import { deleteUser, getAllUsers } from '../../reducers/userAction'
import { DELETE_USER_RESET } from '../../constants/productConstant'
    
const UserList = () => {
    
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {error,users}=useSelector((state)=>state.allUsers)
    const {isDeleted,message}=useSelector((state)=>state.profileUpdate)
    
    const deleteUserHandler=(id)=>{
     dispatch(deleteUser(id));
    }
    useEffect(()=>{
         if(error){
             console.log(error.message)
         }
        if(isDeleted){
            console.log(message)
             navigate("/admin/users")
             dispatch({type:DELETE_USER_RESET})
        }
    
            dispatch(getAllUsers());
        
    },[dispatch,error,navigate,isDeleted,message])
    const columns=[
        {field:"id",headerName:"User Id",minWidth:280,flex:0.9},
    {
        field:"email",headerName:"email",minWidth:350,flex:0.8 
    },{
        field:"name",headerName:"name",minWidth:250,flex:0.3
    },
    {
        field:"role",headerName:"role",type:"number",minWidth:150,flex:0.3,cellClassName: (params) => {
            return params.row.role === "admin" ? "greenColor" : "redColor";
        }
    },
    {
        field:"actions",headerName:"Actions",minWidth:270,type:"number",flex:0.5,sortable:false,
        renderCell:(params)=>{
            const userId = params.row?.id;
        
            if(userId){
            return(
            <Fragment>
                <Link to={`/admin/user/${userId}`}><MdEdit style={{ fontSize: '50px' }}/></Link>
                <Button onClick={()=>deleteUserHandler(userId)}><MdDelete style={{ fontSize: '50px' }}/></Button> 
                </Fragment>
            )
            }
        else{
            return null;
            }
        }
    }
    ]
    const rows=[];
    users && users.forEach((item) => {
        rows.push({id:item._id,
            role:item.role,
            email:item.email,
            name:item.name
        
        })
    });
    return (
        <Fragment>
            <MetaData title="All Users-Admin"/>
            <div className='dashboard'>
            <Sidebar/>
            <div className='productListContainer'>
    
                <h1 id='productListHeading'>All Users</h1>
                <DataGrid rows={rows} columns={columns} pageSize={10} rowHeight={45} columnHeaderHeight={80} 
                disableSelectionClick className='productListTable' autoHeight />
            </div>
            </div>
        </Fragment>
      )
    }
    


export default UserList