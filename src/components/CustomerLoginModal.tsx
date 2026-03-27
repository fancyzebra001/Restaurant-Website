"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { useStore } from "../context/StoreContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CustomerLoginModal({ isOpen, onClose }: Props) {
  const { setCustomerEmail } = useStore();
  const [step, setStep] = useState<"options" | "otp" | "success">("options");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleGoogleLogin = () => {
    setCustomerEmail("guest@gmail.com");
    setStep("success");
    setTimeout(onClose, 1500);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) {
      setCustomerEmail(email);
      setStep("success");
      setTimeout(onClose, 1500);
    }
  };

  // Reset state when closed
  const handleClose = () => {
    setTimeout(() => {
      setStep("options");
      setEmail("");
      setOtp("");
    }, 300);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 p-8 shadow-2xl"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition">
              <X size={20} />
            </button>

            {/* Step 1: Login Options */}
            {step === "options" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="font-serif text-3xl text-white mb-2 tracking-widest uppercase">Welcome</h2>
                  <p className="text-zinc-400 text-sm">Sign in to manage your reservations and orders.</p>
                </div>

                <button 
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 border border-zinc-700 bg-zinc-900 py-3 text-white hover:bg-zinc-800 transition"
                >
                  <Globe size={18} className="text-amber-500" /> Continue with Google
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-zinc-800"></div>
                  <span className="flex-shrink-0 mx-4 text-zinc-600 text-xs uppercase tracking-widest">Or</span>
                  <div className="flex-grow border-t border-zinc-800"></div>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 p-3 pl-10 text-white focus:outline-none focus:border-amber-500 transition"
                    />
                  </div>
                  <button type="submit" className="w-full bg-amber-500 text-zinc-950 py-3 font-bold uppercase tracking-widest hover:bg-amber-400 transition">
                    Send OTP
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === "otp" && (
              <div className="space-y-8 text-center">
                <div>
                  <h2 className="font-serif text-2xl text-white mb-2 tracking-widest uppercase">Enter OTP</h2>
                  <p className="text-zinc-400 text-sm">We sent a dummy code to <br/><span className="text-amber-500">{email}</span></p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <input 
                    type="text" 
                    required
                    maxLength={4}
                    placeholder="1234" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-1/2 mx-auto text-center tracking-[1em] text-2xl bg-zinc-950 border-b-2 border-zinc-800 p-2 text-white focus:outline-none focus:border-amber-500 transition"
                  />
                  <button type="submit" className="w-full bg-amber-500 text-zinc-950 py-3 font-bold uppercase tracking-widest hover:bg-amber-400 transition">
                    Verify & Login
                  </button>
                  <button type="button" onClick={() => setStep("options")} className="text-zinc-500 text-sm hover:text-white transition">
                    Back to email
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: Success Animation */}
            {step === "success" && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
                <CheckCircle2 size={64} className="text-amber-500" />
                <h2 className="font-serif text-2xl text-white tracking-widest uppercase">Welcome Back</h2>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}