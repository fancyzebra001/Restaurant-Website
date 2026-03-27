"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "../context/StoreContext";
import { ShoppingBag, Menu, X, ShieldAlert, User, LogOut } from "lucide-react";
import CartSlider from "./CartSlider";
import CustomerLoginModal from "./CustomerLoginModal"; // <-- Import the new modal
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { cart, isAdmin, customerEmail, setCustomerEmail } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // <-- Modal state

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu", href: "/#menu" },
    { name: "About", href: "/#about" },
    { name: "Reservations", href: "/#reservations" },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-500 border-b ${isScrolled ? "bg-zinc-950/95 backdrop-blur-md border-zinc-800 py-4 shadow-xl" : "bg-transparent border-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          <Link href="/" className="font-serif text-2xl tracking-widest text-white uppercase hover:text-amber-500 transition-colors">
            L'Étoile
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-medium tracking-widest text-zinc-300 uppercase hover:text-amber-500 transition-colors">
                {link.name}
              </Link>
            ))}

            <Link href="/admin" className={`text-sm font-medium tracking-widest uppercase transition-colors flex items-center gap-2 ${isAdmin ? "text-amber-500" : "text-zinc-500 hover:text-zinc-300"}`}>
              {isAdmin && <ShieldAlert size={14} />} Admin
            </Link>

            {/* --- NEW: Customer Login Logic --- */}
            {customerEmail ? (
              <button 
                onClick={() => setCustomerEmail(null)} // Logout
                className="flex items-center gap-2 text-sm font-medium tracking-widest text-amber-500 uppercase hover:text-white transition-colors"
                title="Sign out"
              >
                <LogOut size={16} /> {customerEmail.split('@')[0]}
              </button>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 text-sm font-medium tracking-widest text-zinc-300 uppercase hover:text-amber-500 transition-colors"
              >
                <User size={16} /> Sign In
              </button>
            )}

            <AnimatePresence>
              {cartItemCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsCartOpen(true)}
                  className="relative text-amber-500 hover:text-white transition-colors"
                >
                  <ShoppingBag size={24} />
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-zinc-950 text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </nav>

          <div className="md:hidden flex items-center gap-4">
             {/* Mobile User Icon */}
             {!customerEmail && (
              <button onClick={() => setIsLoginModalOpen(true)} className="text-zinc-300 hover:text-amber-500">
                <User size={24} />
              </button>
            )}
            {cartItemCount > 0 && (
              <button onClick={() => setIsCartOpen(true)} className="relative text-amber-500">
                <ShoppingBag size={24} />
                <span className="absolute -top-2 -right-2 bg-amber-500 text-zinc-950 text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              </button>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-zinc-300 hover:text-white">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Render the Modals */}
      <CartSlider isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <CustomerLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}