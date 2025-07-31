import React, { useState, useContext } from 'react';
import { authContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useContext(authContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
    if (JSON.parse(localStorage.getItem('loggedInUser'))) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-md bg-gray-800/50 backdrop-blur-md border border-gray-700 shadow-lg rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome Back 👋</h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Login to your Grabbly account
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-indigo-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 rounded-lg font-semibold text-white"
          >
            Login
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-400 hover:underline"
          >
            Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
