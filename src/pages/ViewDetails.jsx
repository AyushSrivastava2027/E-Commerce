import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Products from './Products';
import { authContext } from '../context/AuthContext';

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
 const {addtocart}=useContext(authContext);

  useEffect(() => {
    const fetchData = async () => {
      const toastId = toast.loading("Loading product...");
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        toast.success("Product loaded!", { id: toastId });
      } catch (error) {
        toast.error("Failed to load product", { id: toastId });
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) return null; // Prevent render until product is available

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Breadcrumb */}
      <p onClick={() => navigate(-1)} className="text-sm text-gray-900 underline mb-4 cursor-pointer hover:underline">← Back</p>

      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl p-6 shadow-lg">
        {/* Image & Gallery */}
        <div className="space-y-4">
          <img src={product.thumbnail} alt={product.title} className="rounded-xl w-full h-72 object-cover" />
          <div className="flex gap-2">
            {product.images.slice(0, 3).map((img, i) => (
              <img key={i} src={img} alt="gallery" className="w-20 h-20 object-cover rounded-md" />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-sm text-gray-600">Brand: {product.brand}</p>

          <div className="flex items-center gap-2 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`bi ${i < Math.round(product.rating) ? 'bi-star-fill' : 'bi-star'}`} />
            ))}
            <span className="text-sm text-gray-600 ml-2">({product.reviews?.length || 0} reviews)</span>
          </div>

          <h2 className="text-xl font-semibold text-green-600">${product.price}</h2>
          <p className="text-sm text-gray-500">Discount: {product.discountPercentage}%</p>
          <p className="text-sm text-red-500">{product.availabilityStatus}</p>

          <div className="flex gap-3 mt-4 flex-wrap">
            <button onClick={()=>addtocart(product)} className="bg-gray-700 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-gray-900">Add to Cart</button>
            
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-sm text-gray-700">{product.description}</p>
      </div>

      {/* Specifications */}
      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
        <div><strong>SKU:</strong> {product.sku}</div>
        <div><strong>Weight:</strong> {product.weight}g</div>
        <div><strong>Warranty:</strong> {product.warrantyInformation}</div>
        <div><strong>Shipping:</strong> {product.shippingInformation}</div>
        <div><strong>Min Order:</strong> {product.minimumOrderQuantity}</div>
        <div><strong>Return:</strong> {product.returnPolicy}</div>
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {product.reviews.map((r, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`bi ${i < r.rating ? 'bi-star-fill' : 'bi-star'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-800 mt-2">"{r.comment}"</p>
                <p className="text-xs text-gray-500 mt-1">— {r.reviewerName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <h1 className='m-7 text-2xl font-bold text-center'>Some Other Products you may like:</h1>
      <Products/>
    </div>
  );
};

export default ViewDetails;
