import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { animate, motion } from 'framer-motion';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('All Fields Required..');
      return;
    }
    localStorage.setItem('user', JSON.stringify(form));
    toast.success('User SignedUp Successfully..');
    navigate('/login');
  };

  return (
    <div className="bg-[#161616]">
      <section className="min-h-screen flex items-stretch text-white font-[Inter]">
        <motion.div
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)',
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0" />
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
            className="w-full px-24 z-10"
          >
            <h1 className="text-5xl font-bold text-left tracking-wide leading-tight">
              Keep it special
            </h1>
            <p className="text-2xl my-4 text-gray-200">
              Capture your personal memory in a unique way, anywhere.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-6 z-0 bg-[#161616] relative"
        >
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover" style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)',
          }}>
            <div className="absolute bg-black opacity-60 inset-0 z-0" />
          </div>

          <div className="w-full py-6 z-20">
            <h1 className="my-2 text-4xl font-extrabold text-white">SignUp Here</h1>

            <div className="py-4 flex justify-center space-x-4">
              <span className="w-10 h-10 flex items-center justify-center rounded-full text-lg border-2 border-white hover:bg-white hover:text-black transition">f</span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full text-lg border-2 border-white hover:bg-white hover:text-black transition">G+</span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full text-lg border-2 border-white hover:bg-white hover:text-black transition">in</span>
            </div>

            <p className="text-gray-300 text-md mb-4">
              Already have an Account?
              <button
                onClick={() => navigate('login')}
                className="ml-1 text-blue-400 underline hover:text-blue-600"
              >
                Login
              </button>
            </p>

            <form
              onSubmit={handleSubmit}
              className="sm:w-2/3 w-full px-4 mx-auto space-y-4"
            >
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Name"
                className="block w-full px-4 py-2 text-lg rounded bg-black placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className="block w-full px-4 py-2 text-lg rounded bg-black placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="block w-full px-4 py-2 text-lg rounded bg-black placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="text-right text-gray-400 hover:underline hover:text-gray-100 text-sm">
                <a href="#">Forgot your password?</a>
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded shadow-md"
              >
                Sign Up
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SignUp;
