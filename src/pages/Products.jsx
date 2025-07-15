import React, { useContext, useEffect, useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { use } from 'react';
import { motion } from 'motion/react'
import { authContext } from '../context/AuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [storeProduct, setStoredProduct] = useState([])
  //  console.log(cartProducts)
  const [toggleDes, setToggleDes] = useState([]);
  const { addtocart, cartProducts, setCartProducts, loggedIn, search, setSearch } = useContext(authContext)
  console.log(cartProducts)
  // console.log(typeof cartProducts)
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=0');
        const data = await res.json();
        //   console.log(data)
        setProducts(data.products);
        //   console.log(products);
        setStoredProduct(data.products);
        console.log(storeProduct);

      }
      catch (error) {
        console.log("Error in fetching data " + error);
      }
    }
    fetchdata();
  }, [])


  useEffect(() => {
    console.log("Updated cart:", cartProducts);

  }, [cartProducts]);


  // console.log(event.target.value)

  useEffect(() => {
    if (!search) {
      setProducts(storeProduct);
      return;
    }

    const searchedProduct = storeProduct.filter((ele) =>
      ele.title?.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(searchedProduct);
  }, [search, storeProduct]);






  const toggleExpand = (proId) => {
    if (toggleDes.includes(proId)) {
      const removeDes = toggleDes.filter((ele) => (ele !== proId));
      setToggleDes(removeDes)
    }
    else {
      setToggleDes([...toggleDes, proId])
    }

  }
  const navigate = useNavigate();
  const doSignIn = () => {
    navigate('/login');
    toast.error('Login first to add Items to cart!')
  }
  if (!products) {
    return null;
  }
  return (

    <div className='bg-[#f3f4f6] p-2 relative'>



      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className='grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 md:gap-5'>

        {products.map((element, i) => (

          <div className='p-5 flex sm:flex-row flex-col-reverse gap-1 md:gap-4 bg-white rounded-lg shadow ' key={i}>
            {/* Image Section */}


            {/* Info Section */}
            <div className='w-[65%] flex flex-col gap-1 md:gap-2'>
              <h1 className='font-semibold text-sm md:text-xl'>{element.title}</h1>
              <p onClick={() => toggleExpand(element.id)} className={`cursor-pointer text-sm text-gray-800 ${toggleDes.includes(element.id) ? '' : 'line-clamp-2'}`}>{element.description}</p>

              {/* ⭐ Dynamic Star Rating */}
              <ul className='flex text-yellow-400 gap-1'>
                {[...Array(5)].map((_, index) => (
                  <li key={index}>
                    <i
                      className={`bi ${index < Math.round(element.rating)
                        ? 'bi-star-fill'
                        : 'bi-star'
                        }`}
                    ></i>
                  </li>
                ))}
              </ul>

              <h1 className='text-sm text-gray-500'>Category: {element.category}</h1>
              <h1 className='text-lg font-semibold text-green-600'>${element.price}</h1>
              <div className='md:block  flex gap-1'>
                <button style={{ textWrap: 'balance', marginBottom: '8px' }} onClick={() => localStorage.getItem('loggedInUser') ? addtocart(element) : doSignIn()} className={cartProducts.includes(element) ? 'cursor-pointer w-max px-2 md:px-6 py-2 mt-2 font-semibold bg-white border text-sm border-blue-500 text-[#1E2939] rounded' : 'py-2 text-sm cursor-pointer w-max px-2 md:px-7 md:py-2 mt-2 font-semibold bg-[#526e98] text-white rounded'}>

                  {cartProducts.includes(element) ? 'Remove Cart' : 'Add To Cart'}
                </button>
                <Link to={`/details/${element.id}`} className='underline text-sm font-semibold cursor-pointer p-2 md:px-6 '>View Details</Link>
              </div>
            </div>
            <div className="w-full sm:w-[40%] md:h-50 h-40 flex items-center justify-center">
              <img
                src={element.thumbnail}
                alt={element.title}
                className="h-full w-full object-cover rounded-md"
              />
            </div>

          </div>
        ))}
      </motion.div>
    </div >

  )
}

export default Products
