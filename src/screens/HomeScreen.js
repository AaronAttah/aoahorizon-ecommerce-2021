// import React from 'react'
import Product from "../components/Product"
// import axios from "axios";
import React, { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useSelector, useDispatch } from "react-redux"    // use selctor helps us to grab whatever is in the store.js
import { listProducts } from "../actions/productActions";

// useSelector grabs all in the stores while useDispatch dispatches whtas on the client side to the redux for evaluation

 

 function HomeScreen() {
  //  const productList= useSelector((state) => state.productList )
   
   const loading = useSelector((state) =>state.productList.loading)
   const error = useSelector((state) =>state.productList.error)
   const products = useSelector((state) =>state.productList.products)

  //  console.log(products)
  //  console.log()



  //  const  { loading, error, products } = productList

   const dispatch= useDispatch()
   

    useEffect(() => {
      dispatch(listProducts())
    }, [])

    return (
      <div>
          {loading ? (
            <LoadingBox></LoadingBox>
           ): error?  (
            <MessageBox variant="danger">{error}</MessageBox>
           ):(
            <div className="row center" href="/homescreen">
               {
                 products.map((product) => (
                   // from below after mapping through the prouct its the passsed in as a prop inside the productscreen
                 <Product key={product._id} product={product} />
                 ))
               }
            </div>
           )}
     
      </div>
    )
}

export default HomeScreen;






