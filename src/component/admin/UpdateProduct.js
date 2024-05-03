import React, { Fragment ,useEffect,useState} from 'react'
import "./newPrdouct.css"
import { useDispatch,useSelector } from 'react-redux'
import {updateProduct,productDetails } from '../../reducers/productReducer'
import { Button } from '@mui/material'
import MetaData from '../layout/metaData'
import { MdAccountTree,MdDescription,MdStorage,MdSpellcheck,MdAttachMoney } from 'react-icons/md'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstant'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom' 
import { useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id}=useParams();

    // const {loading,error,success}=useSelector((state)=>state.newProduct)
   const isUpdated=useSelector((state)=>state.productDetails.product)
   const product=useSelector((state)=>state.productDetails?.data?.Product)
    // const products=useSelector((state)=>state.product?.data?.Product)   
    // console.log(product._id);
    const [name,setName]=useState("");
    const [price,setPrice]=useState(0);
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [Stock,setStock]=useState(0);
    const [images,setImages]=useState([])
    const [oldImages,setOldImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])
    const categories=[
        "T-Shirt",
        "human",
        "Clothing",
        "Laptop",
        "FootWare",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhone"
      ];
      
      
      useEffect(()=>{
        if(!product){
            dispatch(productDetails(id));
        }
       else{
            setName(product?.name );
            setDescription(product?.description)
            setPrice(product?.price);
            setCategory( product?.categories);
            setStock(product?.stock);
            setOldImages(product?.oldImages);
        }
         if(isUpdated){
            console.log("Product Updated Successfully")
            navigate(`/products`)

            dispatch({type:UPDATE_PRODUCT_RESET})
}
      },[dispatch,navigate,id,product,isUpdated])
      const createSubmitHandler =(e)=>{
        e.preventDefault();
        const formDataToObj = (formData) => {
            return Array.from(formData.entries()).reduce((acc, [key, value]) => {
              if (acc[key]) {
                if (!Array.isArray(acc[key])) {
                  acc[key] = [acc[key]];
                }
                acc[key].push(value);
              } else {
                acc[key] = value;
              }
              return acc;
            }, {});
          };
        
        let myForm=new FormData();
        myForm.set("name",name);  
        myForm.set("Price",price);
        myForm.set("description",description);
        myForm.set("category",category);
        myForm.set("stock",Stock);
        images.forEach((image)=>{
            myForm.append("images",image)
        })
        // const formDataArray = Array.from(myForm.entries());
         const dataObj = formDataToObj(myForm);

        console.log(dataObj);
        dispatch(updateProduct(id,dataObj))
      }
      const createProductImage=(e)=>{
        const files=Array.from(e.target.files)
        setImages([])
        setImagesPreview([])
        files.forEach((file)=>{
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState ===2){
                    setImagesPreview((old)=>[...old,reader.result]);
                    setImages((old)=>[...old,reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
      }

  return (
    <Fragment>
        <MetaData title="Create Product"/>
        <div className='dashboard'>
            <Sidebar/>
            <div className='newProductContainer'>
                <form className='createProductForm' encType='multipart/form-data' onSubmit={createSubmitHandler}>
                    <h2>Update Product</h2>
                    <div>
                        <MdSpellcheck/>
                        <input type='text' placeholder='Product Name' required value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div>
                        <MdAttachMoney/>
                    <input type='Number' placeholder='Price' required value={price} onChange={(e)=>setPrice(e.target.value)}/>

                    </div>
                    <div>
                    <MdDescription/>
                    <textarea placeholder='Product Description' value={description} onChange={(e)=>setDescription(e.target.value)} cols="30" rows="1"/>
                    </div>
                    <div>
                        <MdAccountTree/>
                        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {
                                categories.map((cate)=>(
                                    <option key={cate} value={cate}>{cate}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <MdStorage/>
                        <input type='number' placeholder='Stock' required value={Stock} onChange={(e)=>setStock(e.target.value)}/>
                    </div>
                    <div id='createProductFormFile'>
                        <input type='file' name='avatar' accept='image/*' onChange={createProductImage} multiple/>
                    </div>
                    <div id='createProductFormImage'>
                        {oldImages && oldImages.map((image,index)=>{
                            <img key={index} src={image.url} alt='avatar preview'/>
                        })}
                    </div>
                    <div id='createProductFormImage'>
                        {imagesPreview.map((image,index)=>{
                            <img key={index} src={image} alt='avatar preview'/>
                        })}
                    </div>
                    <Button id='createProductBtn' type='submit'>Update</Button>
                </form>
            </div>
        </div>

    </Fragment>
  )
}

export default UpdateProduct