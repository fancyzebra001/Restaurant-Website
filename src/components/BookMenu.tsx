"use client";

import { useStore, MenuItem } from "../context/StoreContext";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingBag } from "lucide-react";

export default function BookMenu() {
  // --- NEW: We pull 'categories' from the global store now ---
  const { menuItems, cart, addToCart, updateQuantity, categories } = useStore();

  // Smart filtering: Only show categories that actually have dishes in them, 
  // but keep them in the exact order the Admin set.
  const activeCategories = categories.filter(cat => 
    menuItems.some(item => item.category === cat)
  );

  const getCartQuantity = (id: string) => {
    const item = cart.find((c) => c.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-16 px-4 gap-12 bg-zinc-950 text-zinc-300">
      
      {/* Table of Contents Sidebar */}
      <aside className="w-full md:w-1/4 h-fit sticky top-24 border-l border-amber-500/30 pl-6">
        <h3 className="font-serif text-2xl text-amber-500 mb-6 tracking-widest uppercase">Chapters</h3>
        <ul className="space-y-4">
          {/* Use activeCategories here */}
          {activeCategories.map((cat) => (
            <li key={cat}>
              <a href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-amber-400 transition-colors cursor-pointer text-lg tracking-wide">
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* The Menu "Pages" */}
      <div className="w-full md:w-3/4 space-y-32">
        {/* Use activeCategories here too */}
        {activeCategories.map((category) => (
          <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
            <h2 className="font-serif text-4xl text-white border-b border-zinc-800 pb-4 mb-12">
              {category}
            </h2>

            <div className="space-y-24">
              {menuItems
                .filter((item) => item.category === category)
                .map((item, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                    >
                      <div className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-sm shadow-2xl">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                      </div>

                      <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                        <h4 className="font-serif text-3xl text-amber-500 mb-2">{item.title}</h4>
                        <p className="text-zinc-400 italic mb-6">({item.ingredients})</p>
                        <p className="text-2xl text-white mb-8">${item.price}</p>

                        {getCartQuantity(item.id) === 0 ? (
                          <button onClick={() => addToCart(item)} className="flex items-center gap-2 border border-amber-500 text-amber-500 px-6 py-3 hover:bg-amber-500 hover:text-zinc-950 transition-all duration-300 tracking-widest uppercase text-sm">
                            <ShoppingBag size={18} /> Add to Order
                          </button>
                        ) : (
                          <div className="flex items-center gap-4 border border-zinc-700 px-4 py-2">
                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-amber-500 transition"><Minus size={18} /></button>
                            <span className="text-lg w-8 text-center">{getCartQuantity(item.id)}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-amber-500 transition"><Plus size={18} /></button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}