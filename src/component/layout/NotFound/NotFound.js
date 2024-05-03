import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import "./NotFound.css"
const NotFound = () => {
const navigate=useNavigate();
  const handelPage=()=>{
navigate("/")
  }

  return (
    <Fragment className="not-found-container">
      <div className="not-found-content">
        <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={handelPage} className="back-button">Go Back</button>
      </div>
  </Fragment>
  )
}

export default NotFound;