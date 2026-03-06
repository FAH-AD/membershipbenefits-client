import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';
import Navbar from '../components/Navbar';
import login from '../assets/login-img.png';
import { Eye, EyeOff } from "lucide-react";
import webSocketSingleton from '../socket';

export default function Login() {
  const user = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200) {
        console.log(response.data, "response data");

        const { token, user, message } = response.data;
        webSocketSingleton.init(token)
        console.log(response.data, "response data");

        localStorage.setItem("authToken", token);
        dispatch(SetUser(user));
        console.log(user, "user on login")
        toast.success(message);

        if (user.role === "admin") {
          navigate("/admin");
        } else if (response.data.data.user.role === "client") {
          navigate("/jobs");
        } else if (response.data.data.user.role === "freelancer") {
          navigate("/jobs");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Invalid Credentials.");
    }
  };
  return (
    <>
      <Navbar showFullNav={false} />
      <div className="bg-slate-50 min-h-screen pt-4 pb-4 px-4 overflow-hidden">
        <div className='max-w-6xl w-full m-auto mt-12'>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Login to your Account</h1>
          <p className="text-slate-500 mb-8">
            Welcome back! Select the below login methods.
          </p>
        </div>

        <div className="bg-white max-w-6xl  w-full m-auto rounded-xl shadow-lg border border-slate-200 flex flex-col md:flex-row overflow-hidden">
          <div className="flex-1 p-8 md:p-12">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-slate-700 font-medium mb-2">Email ID / Username</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email id / username"
                  className="w-full border border-slate-200 rounded-md px-4 text-slate-900 py-3 focus:outline-none focus:ring-2 focus:ring-[#12a1e2] focus:border-transparent bg-slate-50"
                />
              </div>

              <div className="mb-6">
                <label className="block text-slate-700 font-medium mb-2">Password</label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full border border-slate-200 rounded-md text-slate-900 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#12a1e2] focus:border-transparent bg-slate-50"
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between mb-6">

                <Link to="/forgot-password" size="sm" className="text-[#12a1e2] hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="bg-[#12a1e2] hover:bg-[#0e8cd4] text-white font-bold w-full py-3 rounded-md transition-all shadow-md active:scale-[0.98]"
              >
                Login
              </button>
            </form>

            {/* <p className="mt-10 text-center text-slate-600">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-[#12a1e2] font-semibold hover:underline">
                Register
              </Link>
            </p> */}
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center rounded-r-lg bg-slate-50">
            <img src="/hero.png" alt="Illustration" className="w-full h-auto opacity-90" />

          </div>
        </div>
      </div>
    </>
  );
}