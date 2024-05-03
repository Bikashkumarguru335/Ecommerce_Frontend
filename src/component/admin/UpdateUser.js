    import React, { Fragment ,useEffect,useState} from 'react'
    import { useDispatch,useSelector } from 'react-redux'
    import { Button } from '@mui/material'
    import MetaData from '../layout/metaData'
    import "./EditOrder.css"
    import { MdMailOutline,MdPerson,MdVerifiedUser } from 'react-icons/md'
    import { UPDATE_USER_RESET } from '../../constants/productConstant'
    import Sidebar from './Sidebar'
    import { useNavigate,useParams } from 'react-router-dom' 
    import { getUsersDetails, updateUser } from '../../reducers/userAction'
    import Loader from '../layout/Loader/loader'

const UpdateUser = () => {
    
    
        const dispatch=useDispatch();
        const navigate=useNavigate();
        const {id}=useParams();
        const {loading,error}=useSelector((state)=>state.userDetailsReducer)
        const user=useSelector((state)=>state.userDetailsReducer.user)
        const {loading:updateLoading,error:updateError,isUpdated}=useSelector((state)=>state.profileUpdate)
        // console.log(user);
       const [name,setName]=useState("");
        const [email,setEmail]=useState("");
        const [role,setRole]=useState("");
          useEffect(()=>{
            if(user && user.id!==id){
                console.log(id)
                dispatch(getUsersDetails(id));
            }
            else{
                setName(user && user.name || '');
                setEmail(user && user.email ||'');
                setRole(user &&  user.role ||'');
                
            }
            if(isUpdated){
                console.log("User Updated Successfully")
                navigate("/admin/users")
                dispatch({type:UPDATE_USER_RESET})
            }
            if(updateError){
                console.log(updateError)
            }
          },[dispatch,isUpdated,updateError,id,user,error])
          const updateUserSubmitHandler =(e)=>{
            e.preventDefault();
           
            let myForm=new FormData();
            myForm.set("name",name);
            myForm.set("email",email);
            myForm.set("role",role);
           console.log(myForm)
               dispatch(updateUser(id,myForm))
          }
          
    
      return (
        <Fragment>
            <MetaData title="Update User"/>
            <div className='dashboard'>
                <Sidebar/>
                <div className='newProductContainer'>
                    {loading ? <Loader/>:
                    <form className='createProductForm' encType='multipart/form-data' onSubmit={updateUserSubmitHandler}>
                        <h2>Update User</h2>
                        <div>
                            <MdPerson/>
                            <input type='text' placeholder='Name' required value={name} onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div>
                            <MdMailOutline/>
                        <input type='email' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
    
                        </div>
                        
                        <div>
                            <MdVerifiedUser/>
                            <select value={role} onChange={(e)=>setRole(e.target.value)}>
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                 <option value="user">User</option>

                             </select>
                        </div>
                        
                        <Button id='createProductBtn' type='submit' disabled={updateLoading ? true :false || (role === "" ? true :false )}>Update</Button>
                    </form>}
                </div>
            </div>
    
        </Fragment>
      )
    }


export default UpdateUser