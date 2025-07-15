import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const authContext = createContext();
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [cartProducts, setCartProducts] = useState([]);
  const [search, setSearch] = useState();
  useEffect(() => {
    // On mount, try to load user from localStorage
    const cartItem = JSON.parse(localStorage.getItem('CartProducts'))||[];
    setCartProducts(cartItem)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem('CartProducts');
    setCartProducts([]);
  }
  const addtocart = (ele) => {
    let updatedCart;

    if (cartProducts.some(item => item.id === ele.id)) {
      updatedCart = cartProducts.filter(item => item.id !== ele.id);
      toast.error(`${ele.title} removed from cart!`);
    } else {
      updatedCart = [...cartProducts, ele];
      toast.success(`${ele.title} added to cart!`);
    }

    setCartProducts(updatedCart);
    localStorage.setItem('CartProducts', JSON.stringify(updatedCart));
  };

  const login = (email, password) => {

    const retData = JSON.parse(localStorage.getItem("user"));
    if (retData.email === email && retData.password === password) {
      toast.success('Login Succesfull');
      localStorage.setItem('loggedInUser', JSON.stringify(retData));
      setUser(retData)
      setLoggedIn(true)
    }
    else {
      toast.error('Invalid Credentials');
    }

  }
  return (
    <authContext.Provider value={{ login, user, cartProducts, setCartProducts, logout, loggedIn, search, setSearch, addtocart }}>
      {children}
    </authContext.Provider>
  )
}