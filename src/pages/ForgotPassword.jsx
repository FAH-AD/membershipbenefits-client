import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { post } from '../services/ApiEndpoint';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await post('/api/auth/forgot-password', { email });
      toast.success(res.data.message || 'Password reset code sent to email');
      navigate('/verify-code', { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send code");
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: 'spring', stiffness: 300 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <Navbar showFullNav={false} />
      <motion.div
        className="bg-slate-50 min-h-screen pt-4 px-4 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 w-full max-w-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <h2 className="text-2xl text-center font-bold mb-4 text-slate-900">Forgot Password</h2>
          <p className="text-slate-500 mb-6 font-medium">Enter your email address and we'll send you a verification code to reset your password.</p>
          <form onSubmit={handleSendCode}>
            <motion.input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 bg-white text-slate-900 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#00d26a] focus:border-transparent transition-all"
              variants={inputVariants}
              whileFocus="focus"
            />
            <motion.button
              type="submit"
              className="w-full bg-[#00d26a] hover:bg-[#1adb7a] text-white font-bold py-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : 'Send Code'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}
