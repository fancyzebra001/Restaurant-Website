"use client";

import { useStore } from "../context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ArrowRight, MapPin, Trash2 } from "lucide-react"; // <-- Added Trash2
import { useState, useEffect } from "react";

type CartSliderProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartSlider({ isOpen, onClose }: CartSliderProps) {
  // --- NEW: Destructured clearCart and removeFromCart ---
  const { cart, updateQuantity, removeFromCart, clearCart, customerEmail } = useStore();
  
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (customerEmail) {
      const savedAddress = localStorage.getItem("saved_address");
      const savedPhone = localStorage.getItem("saved_phone");
      if (savedAddress) setAddress(savedAddress);
      if (savedPhone) setPhone(savedPhone);
    } else {
      setAddress("");
      setPhone("");
    }
  }, [customerEmail, isOpen]); 

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; 
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!address || !phone) {
      alert("Please provide an address and phone number for delivery.");
      return;
    }

    if (customerEmail) {
      localStorage.setItem("saved_address", address);
      localStorage.setItem("saved_phone", phone);
    }

    alert(`Order placed successfully for ${customerEmail ? customerEmail : 'Guest'}! Total: $${total.toFixed(2)}`);
    
    // --- NEW LOGIC: Empty the cart after successful order ---
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="font-serif text-2xl text-amber-500 tracking-widest uppercase">Your Order</h2>
              <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                  <p className="font-serif text-xl italic">Your plate is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-zinc-900/50 p-3 rounded-sm border border-zinc-800/50">
                    <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded-sm" />
                    
                    <div className="flex-1">
                      <h4 className="text-zinc-200 font-medium line-clamp-1">{item.title}</h4>
                      <p className="text-amber-500">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-3 border border-zinc-700 px-3 py-1 bg-zinc-950">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-zinc-400 hover:text-amber-500 transition"><Minus size={14} /></button>
                        <span className="text-sm w-4 text-center text-zinc-200">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-zinc-400 hover:text-amber-500 transition"><Plus size={14} /></button>
                      </div>
                      
                      {/* --- NEW: Dedicated Trash Button --- */}
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-zinc-900 border-t border-zinc-800 space-y-6">
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-zinc-400 tracking-wider uppercase mb-2">
                    <MapPin size={16} className="text-amber-500" />
                    {customerEmail ? "Saved Delivery Details" : "Guest Delivery Details"}
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="Delivery Address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-3 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-3 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="space-y-2 text-sm text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg text-white font-serif pt-2 border-t border-zinc-800 mt-2">
                    <span>Total</span>
                    <span className="text-amber-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 text-zinc-950 py-4 font-bold tracking-widest uppercase hover:bg-amber-400 transition-colors"
                >
                  Confirm Order <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}