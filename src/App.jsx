import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { authContext } from './context/AuthContext'
import MyCart from './pages/MyCart'
import ViewDetails from './pages/ViewDetails'
import AddressModal from './pages/AddressModal'
import OrderConfirm from './pages/OrderConfirm';
import MyOrders from './pages/MyOrders'



const App = () => {
  const { user } = useContext(authContext);

  return (

    <div>
      <BrowserRouter>
        {/* {user?<Navbar/>:''} */}
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/mycart' element={<MyCart />} />
          <Route path='/ordersummary' element={<OrderConfirm/>} />
          <Route path='/details/:id' element={<ViewDetails/>} />
          <Route path='/address' element={<AddressModal/>}/>
          <Route path='/allorders' element={<MyOrders/>} />
        </Routes>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1E293B', // dark blue-gray
              color: '#fff',         // white text
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </div>
  )
}

export default App;