import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { post } from '../services/ApiEndpoint';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await post('/api/auth/verify-reset-code', { 
        email, 
        code, 
        newPassword 
      });
      toast.success(res.data.message || 'Password reset successful');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
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
          <h2 className="text-2xl text-center font-bold mb-4 text-slate-900">Verify Code and Reset Password</h2>
          <p className="text-slate-500 mb-6 font-medium">Enter the code sent to your email and your new password.</p>
          <form onSubmit={handleVerify}>
            <motion.input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-slate-200 bg-white text-slate-900 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#00d26a] focus:border-transparent transition-all"
              variants={inputVariants}
              whileFocus="focus"
            />
            <div className="relative">
              <motion.input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-slate-200 bg-white text-slate-900 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#00d26a] focus:border-transparent transition-all"
                variants={inputVariants}
                whileFocus="focus"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-[25px] transform -translate-y-1/2 text-gray-400"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative">
              <motion.input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-slate-200 bg-white text-slate-900 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#00d26a] focus:border-transparent transition-all"
                variants={inputVariants}
                whileFocus="focus"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[25px] transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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
                  <span>Verifying...</span>
                </>
              ) : 'Verify and Reset Password'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}
