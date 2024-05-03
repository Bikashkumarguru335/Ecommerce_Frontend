import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { createBrowserHistory } from '@remix-run/router';
import "./Search.css"
const Search = () => {
  const navigate=useNavigate();
    const [keyword,setKeyword]=useState("");

const searchSubmitHandler=(e)=>{
e.preventDefault();
if(keyword.trim()){
  console.log(keyword.trim())
navigate(`/products/${keyword}`)
}
else{
  console.log("in else part")
    // navigate(`/products`)
}
    }
  return (
<Fragment>
    <form className="searchBox" onSubmit={searchSubmitHandler} >
        <input type="text" placeholder='Search a Product.....' 
        onChange={(e)=>setKeyword(e.target.value)}/>
        <input type="submit" value="Search"/>
    </form>
</Fragment>
  )
}

export default Search;