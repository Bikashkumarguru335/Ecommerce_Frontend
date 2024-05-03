import React, { Fragment ,useEffect,useState} from 'react'
import "./newPrdouct.css"
import { useDispatch,useSelector } from 'react-redux'
import { createNewProduct } from '../../reducers/productReducer'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Button } from '@mui/material'
import MetaData from '../layout/metaData'
import { MdAccountTree,MdDescription,MdStorage,MdSpellcheck,MdAttachMoney } from 'react-icons/md'
import { NEW_PRODUCT_RESET } from '../../constants/productConstant'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom' 

const NewProduct = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const success=useSelector((state)=>state.newProduct?.products?.data?.success)
    const token= useSelector((state)=>state.userDetails?.user?.token)
    const [name,setName]=useState("");
    const [price,setPrice]=useState(0);
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [Stock,setStock]=useState(0);
    const [images,setImages]=useState([])
    const [imagesPreview,setImagesPreview]=useState([])
    const categories=[
        "T-Shirt",
        "Clothing",
        "watch",
        "Laptop",
        "FootWare",
        "Bottom",
        "Tops",
        "Attire",
        "Camera Lens",
        "SmartPhone"
      ];
      useEffect(()=>{
        if(success){
            navigate("/products")
            dispatch({type:NEW_PRODUCT_RESET})
        }
      },[dispatch,success,navigate])
      const createSubmitHandler =async(e)=>{
                 e.preventDefault();
        
        let myForm=new FormData();
        myForm.set("name",name);
        myForm.set("price",price);
        myForm.set("description",description);
        myForm.set("category",category);
        myForm.set("stock",Stock);
        if(imagesPreview) myForm.append("images",imagesPreview);
        else{
            return ;
          }
          
const extractedData = {};
myForm.forEach((value, key) => {
  extractedData[key] = value;
});
await dispatch(createNewProduct(extractedData,token))
    

       }
    const createProductImage=(e)=>{
        const file=e.target.files[0];

        const reader=new FileReader();
             reader.onloadend=()=>{
                console.log("result",reader.result);
                 setImagesPreview(reader.result);
                 setImages(file)
                 console.log("image",file)
             }
             reader.readAsDataURL(file)

        
        }

  return (
    <Fragment>
        <MetaData title="Create Product"/>
        <div className='dashboard'>
            <Sidebar/>
            <div className='newProductContainer'>
                <form className='createProductForm' encType='multipart/form-data' onSubmit={createSubmitHandler}>
                    <h2>Create Product</h2>
                    <div>
                        <MdSpellcheck/>
                        <input type='text' placeholder='Product Name' required value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div>
                    <CurrencyRupeeIcon/>
                    <input type='Number' placeholder='Price' required  onChange={(e)=>setPrice(e.target.value)}/>

                    </div>
                    <div>
                    <MdDescription/>
                    <textarea placeholder='Product Description' value={description} onChange={(e)=>setDescription(e.target.value)} cols="30" rows="1"/>
                    </div>
                    <div>
                        <MdAccountTree/>
                        <select onChange={(e)=>setCategory(e.target.value)}>
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
                        <input type='number' placeholder='Stock' required onChange={(e)=>setStock(e.target.value)}/>
                    </div>
                    <div id='createProductFormFile'>
                        <input type='file' name='avatar' accept='image/*' onChange={createProductImage} multiple/>
                    </div>
                     <div id='createProductFormImage'>
                        
            {/* {imagesPreview.map((image, index) => ( */}
        <img src={imagesPreview}/>
    {/* ))} */}

                
                    </div> 
                    <Button id='createProductBtn' type='submit'>Create</Button>
                </form>
            </div>
        </div>

    </Fragment>
  )
}

export default NewProduct