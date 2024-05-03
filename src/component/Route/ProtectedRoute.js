import React, { element, Fragment } from 'react'
import { Route } from 'react-router-dom';
 import {Navigate} from "react-router-dom";
 import { useSelector } from 'react-redux';


 const ProtectedRoute = ({element:Element,...rest}) => {
    //  const loading=useSelector((state)=>state.loginDetails)
     const isAuthenticated=useSelector((state)=>state.loginDetails)
      const user= useSelector((state)=>state.loginDetails?.user?.data?.user);
      console.log(user,isAuthenticated)
      return (
     <Fragment>
        <Route
        {...rest}
        element={isAuthenticated === false ? <Element /> : <Navigate to="/login" replace />}
      />
      
      </Fragment>
    );
  };







//   {loading &&(<Route  
//         {...rest}
//         render={(props)=>{
//             if(!isAuthenticated){
//                 return <Navigate to="/login"/>
//             }
//             return <Element {...props}/>
//         }}
//         />
//         )}
    //  </Fragment>
//    )
//  }

 export default ProtectedRoute