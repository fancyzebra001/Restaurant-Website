"use client";
import ReservationForm from "@/components/ReservationForm";
import BookMenu from "@/components/BookMenu";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="font-serif text-6xl md:text-8xl text-white mb-6 tracking-widest uppercase">
            L'Étoile
          </h1>
          <p className="text-amber-500 tracking-[0.3em] uppercase text-sm md:text-base mb-12">
            A Culinary Symphony
          </p>
          <a 
            href="#menu"
            className="inline-block border border-amber-500 text-amber-500 px-8 py-4 tracking-widest uppercase hover:bg-amber-500 hover:text-zinc-950 transition-all duration-500"
          >
            Explore the Menu
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
        >
          <ChevronDown size={32} strokeWidth={1} />
        </motion.div>
      </section>

      {/* --- 2. ABOUT SECTION --- */}
      <section id="about" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2"
          >
            <h2 className="font-serif text-4xl text-white mb-8">The Art of Fine Dining</h2>
            <div className="w-12 h-0.5 bg-amber-500 mb-8" />
            <p className="text-zinc-400 leading-relaxed mb-6">
              Founded in the heart of the culinary district, L'Étoile brings an uncompromising 
              commitment to sourcing the finest ingredients. Our philosophy is rooted in 
              tradition but driven by modern technique.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Every dish tells a story, curated meticulously by our executive chef to ensure 
              an unforgettable journey for your palate.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2 aspect-[4/5] md:aspect-square overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop" 
              alt="Chef plating food" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* --- 3. THE MENU (Using the BookMenu Component) --- */}
      <section id="menu" className="py-32 bg-zinc-900 border-y border-zinc-800">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-amber-500 tracking-widest uppercase mb-4">Our Menu</h2>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto" />
        </div>
        
        {/* This injects the interactive menu we built earlier */}
        <BookMenu />
      </section>

      {/* --- 4. RESERVATIONS & MAP SECTION --- */}
      <section id="reservations" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Reservations Interactive Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ReservationForm />
          </motion.div>

          {/* Contact & Map (Dummy Visual) */}
          <motion.div 
            id="map"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2 className="font-serif text-3xl text-white mb-6">Location & Hours</h2>
              
              <div className="flex items-start gap-4 text-zinc-400">
                <MapPin className="text-amber-500 shrink-0" />
                <p>123 Culinary Boulevard<br />Metropolis, NY 10001</p>
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <Phone className="text-amber-500 shrink-0" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-start gap-4 text-zinc-400">
                <Clock className="text-amber-500 shrink-0" />
                <p>Tue - Sun: 5:00 PM - 11:00 PM<br />Monday: Closed</p>
              </div>
            </div>

            {/* Dummy Map Area */}
            <div className="w-full h-64 bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
                alt="Map representation"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500" 
              />
              <div className="relative z-10 flex flex-col items-center">
                <MapPin size={32} className="text-amber-500 mb-2" />
                <span className="text-white font-serif tracking-widest uppercase">View on Google Maps</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-zinc-900 py-12 text-center text-zinc-600 text-sm">
        <p>&copy; {new Date().getFullYear()} L'Étoile. Portfolio Project.</p>
      </footer>
    </div>
  );
}