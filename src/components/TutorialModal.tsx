"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, ShoppingBag, Calendar, ShieldAlert, ListTree, Database } from "lucide-react";

export default function TutorialModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("has_seen_tutorial");
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("has_seen_tutorial", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-zinc-950 border border-amber-500/30 max-w-2xl w-full shadow-2xl relative flex flex-col max-h-[90vh]"
          >
            {/* Top Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shrink-0" />

            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="p-8 pb-4 shrink-0 text-center space-y-2 border-b border-zinc-900">
              <h2 className="font-serif text-3xl text-amber-500 tracking-widest uppercase">Welcome</h2>
              <p className="text-zinc-400 text-sm">Interactive Full-Stack Portfolio Demonstration</p>
            </div>

            {/* Scrollable Content Area */}
            <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
              
              {/* Architecture Note */}
              <div className="flex gap-4 items-start bg-amber-500/10 p-4 border border-amber-500/30 rounded-sm">
                <Database className="text-amber-500 shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="text-amber-500 font-medium mb-1">Local Storage Architecture</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    This project uses your browser's local storage to simulate a database. Any changes you make in the Admin panel or Cart will persist even if you refresh the page.
                  </p>
                </div>
              </div>

              {/* Customer Features */}
              <div className="space-y-4">
                <h3 className="text-white font-serif text-xl tracking-widest uppercase border-b border-zinc-800 pb-2">1. The Guest Experience</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3 items-start bg-zinc-900/50 p-4 border border-zinc-800/50">
                    <User className="text-amber-500 shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="text-zinc-200 text-sm font-medium mb-1">Dummy Authentication</h4>
                      <p className="text-zinc-500 text-xs">Test the "Sign In" button in the navbar. It features a complete UI flow for Google and OTP email logins.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start bg-zinc-900/50 p-4 border border-zinc-800/50">
                    <ShoppingBag className="text-amber-500 shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="text-zinc-200 text-sm font-medium mb-1">Smart Cart System</h4>
                      <p className="text-zinc-500 text-xs">Add items to order. If logged in, the cart auto-saves your delivery details for future checkouts.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start bg-zinc-900/50 p-4 border border-zinc-800/50 md:col-span-2">
                    <Calendar className="text-amber-500 shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="text-zinc-200 text-sm font-medium mb-1">Live Reservations</h4>
                      <p className="text-zinc-500 text-xs">The reservation form dynamically reads table availability. It will also bypass asking for contact info if you are currently logged in.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Features */}
              <div className="space-y-4">
                <h3 className="text-white font-serif text-xl tracking-widest uppercase border-b border-zinc-800 pb-2">2. The Admin Experience</h3>
                <p className="text-zinc-400 text-sm mb-4">Click "Admin" in the navbar and log in with <strong className="text-amber-500 font-mono">admin</strong> / <strong className="text-amber-500 font-mono">demo123</strong>.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3 items-start bg-zinc-900/50 p-4 border border-zinc-800/50">
                    <ShieldAlert className="text-amber-500 shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="text-zinc-200 text-sm font-medium mb-1">Menu Management</h4>
                      <p className="text-zinc-500 text-xs">Add, edit, or delete dishes. Changes instantly update the live public menu.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start bg-zinc-900/50 p-4 border border-zinc-800/50">
                    <ListTree className="text-amber-500 shrink-0 mt-1" size={18} />
                    <div>
                      <h4 className="text-zinc-200 text-sm font-medium mb-1">Drag-and-Drop Order</h4>
                      <p className="text-zinc-500 text-xs">Manage your Table of Contents. Drag categories to change the exact order they appear on the main site.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer / Button */}
            <div className="p-8 pt-4 shrink-0 border-t border-zinc-900">
              <button 
                onClick={handleClose}
                className="w-full bg-amber-500 text-zinc-950 py-4 font-bold tracking-widest uppercase hover:bg-amber-400 transition-colors"
              >
                Start Exploring
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}