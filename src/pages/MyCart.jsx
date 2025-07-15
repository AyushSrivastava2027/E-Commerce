import { useContext,useState } from "react";
import { authContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import AddressModal from "./AddressModal";

const MyCart = () => {
    const {setCartProducts } = useContext(authContext);
    const cartProducts=JSON.parse(localStorage.getItem("CartProducts"));
    const [open, setOpen] = useState(false); // ✅ boolean value

  const handleSave = (data) => {
    console.log("Saved address:", data);
  };

    const removeItem = (ele) => {
        const items = cartProducts.filter((it) => it !== ele);
        setCartProducts(items);
         localStorage.setItem('CartProducts',JSON.stringify(items));
         toast.error(`${ele.title} removed from Cart!`);
    };

    return (
        <>
            <div className="py-6 px-4 sm:px-10 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    {cartProducts.length === 0 ? "🛒 Your Cart is Empty" : "🛍️ Your Cart"}
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Cart Items */}
                    <div className="w-full lg:w-2/3 space-y-6">
                        {cartProducts.map((element, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col sm:flex-row items-center gap-6"
                            >
                                <img
                                    src={element.thumbnail}
                                    alt={element.title}
                                    className="w-full sm:w-40 h-40 object-cover rounded-md"
                                />

                                <div className="flex-1 flex flex-col gap-2">
                                    <h2 className="text-xl font-semibold text-gray-900">{element.title}</h2>
                                    <p className="text-sm text-gray-600 line-clamp-2">{element.description}</p>

                                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                        {[...Array(5)].map((_, index) => (
                                            <i
                                                key={index}
                                                className={`bi ${index < Math.round(element.rating)
                                                    ? "bi-star-fill"
                                                    : "bi-star"
                                                    }`}
                                            ></i>
                                        ))}
                                    </div>

                                    <p className="text-sm text-gray-500">Category: {element.category}</p>
                                    <p className="text-lg font-bold text-green-600">${element.price}</p>

                                    <button
                                        onClick={() => removeItem(element)}
                                        className="mt-2 self-start px-5 py-1.5 text-sm border border-blue-500 text-blue-500 font-semibold rounded hover:bg-blue-500 hover:text-white transition duration-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Cart Summary */}
                    {cartProducts.length > 0 && (
                        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow sticky top-24 h-max">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">🧾 Order Summary</h2>

                            <div className="flex flex-col gap-3 mb-6">
                                <div className="flex justify-between text-sm text-gray-600 font-medium">
                                    <span>Total Items:</span>
                                    <span className="text-blue-600 font-bold">{cartProducts.length}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 font-medium">
                                    <span>Total Price:</span>
                                    <span className="text-green-600 font-bold">
                                        ${cartProducts.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button onClick={() => setOpen(true)} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-md transition-all shadow-sm hover:shadow-lg">
                                Place Order
                            </button>
                              <AddressModal isOpen={open} onClose={() => setOpen(false)} onSave={handleSave} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyCart;
