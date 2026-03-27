"use client";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { useStore, MenuItem } from "../../context/StoreContext";
import { Lock, LogOut, Plus, Trash2, Edit3, LayoutDashboard, UtensilsCrossed, ListTree, GripVertical } from "lucide-react";

export default function AdminPage() {
  const { 
    isAdmin, setIsAdmin, 
    menuItems, setMenuItems, 
    totalTables, setTotalTables, 
    bookedTables,
    categories, setCategories 
  } = useStore();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Added "categories" to the tab types
  const [activeTab, setActiveTab] = useState<"menu" | "categories" | "tables">("menu");
  
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "demo123") {
      setIsAdmin(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setUsername("");
    setPassword("");
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem?.price || !editingItem?.category) return;

    if (editingItem.id) {
      setMenuItems((prev) => prev.map((item) => item.id === editingItem.id ? (editingItem as MenuItem) : item));
    } else {
      const newItem: MenuItem = {
        ...(editingItem as MenuItem),
        id: Math.random().toString(36).substr(2, 9),
      };
      setMenuItems((prev) => [...prev, newItem]);
    }
    setEditingItem(null); 
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Category Logic
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()]);
      setNewCategoryName("");
    }
  };

  const handleDeleteCategory = (catToDelete: string) => {
    setCategories(categories.filter((cat) => cat !== catToDelete));
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
        <div className="max-w-md w-full bg-zinc-900 p-8 border border-zinc-800 shadow-2xl">
          <div className="flex justify-center mb-6 text-amber-500"><Lock size={48} strokeWidth={1} /></div>
          <h1 className="text-2xl font-serif text-white text-center mb-2 tracking-widest uppercase">Admin Portal</h1>
          <p className="text-zinc-500 text-center mb-8 text-sm">Use credentials below to test functionality.</p>
          <div className="bg-zinc-950/50 border border-zinc-800 p-4 mb-6 rounded-sm text-sm text-zinc-400">
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-amber-500 transition-colors" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-amber-500 transition-colors" />
            {loginError && <p className="text-red-500 text-sm">Invalid credentials.</p>}
            <button type="submit" className="w-full bg-amber-500 text-zinc-950 py-3 font-bold uppercase tracking-widest hover:bg-amber-400 transition-colors">Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-zinc-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white tracking-widest uppercase mb-2">Management</h1>
          <p className="text-zinc-400">Any changes made here will update the live site via local storage.</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-zinc-400 hover:text-amber-500 transition-colors">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <aside className="w-full md:w-64 space-y-2">
          <button onClick={() => setActiveTab("menu")} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${activeTab === "menu" ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500" : "text-zinc-400 hover:text-white"}`}>
            <UtensilsCrossed size={18} /> Menu Editor
          </button>
          <button onClick={() => setActiveTab("categories")} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${activeTab === "categories" ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500" : "text-zinc-400 hover:text-white"}`}>
            <ListTree size={18} /> Table of Contents
          </button>
          <button onClick={() => setActiveTab("tables")} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${activeTab === "tables" ? "bg-amber-500/10 text-amber-500 border-l-2 border-amber-500" : "text-zinc-400 hover:text-white"}`}>
            <LayoutDashboard size={18} /> Table Management
          </button>
        </aside>

        <div className="flex-1">
          
          {/* --- CATEGORIES TAB --- */}
          {activeTab === "categories" && (
            <div className="space-y-8">
              <h2 className="text-xl font-serif text-amber-500 uppercase tracking-widest">Manage Chapters</h2>
              <p className="text-zinc-400 text-sm">Add new categories, or drag and drop to reorder how they appear on the menu.</p>
              
              <form onSubmit={handleAddCategory} className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="New Category Name (e.g. Vegan)" 
                  value={newCategoryName} 
                  onChange={(e) => setNewCategoryName(e.target.value)} 
                  className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-amber-500" 
                />
                <button type="submit" className="bg-amber-500 text-zinc-950 px-6 py-2 font-bold uppercase tracking-wider hover:bg-amber-400 transition">
                  Add
                </button>
              </form>

              {/* --- NEW: Framer Motion Drag and Drop List --- */}
              <Reorder.Group 
                axis="y" 
                values={categories} 
                onReorder={setCategories} 
                className="grid grid-cols-1 gap-4 mt-8"
              >
                {categories.map((cat) => (
                  <Reorder.Item 
                    key={cat} 
                    value={cat} 
                    className="flex justify-between items-center bg-zinc-950 border border-zinc-800 p-4 cursor-grab active:cursor-grabbing relative z-10 hover:border-amber-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <GripVertical size={20} className="text-zinc-600" />
                      <span className="text-white font-serif text-lg">{cat}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleDeleteCategory(cat)} 
                      className="text-zinc-500 hover:text-red-500 transition p-2"
                      title="Delete Category"
                    >
                      <Trash2 size={18} />
                    </button>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          )}

          {/* --- TABLE MANAGEMENT TAB --- */}
          {activeTab === "tables" && (
            <div className="bg-zinc-900 border border-zinc-800 p-8">
              <h2 className="text-xl font-serif text-amber-500 mb-6 uppercase tracking-widest">Floor Plan Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-zinc-950 p-6 border border-zinc-800 text-center">
                  <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">Total Tables</p>
                  <input type="number" value={totalTables} onChange={(e) => setTotalTables(Number(e.target.value))} className="bg-transparent text-3xl text-white text-center w-full focus:outline-none" />
                </div>
                <div className="bg-zinc-950 p-6 border border-zinc-800 text-center">
                  <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">Booked</p>
                  <p className="text-3xl text-red-400">{bookedTables}</p>
                </div>
                <div className="bg-zinc-950 p-6 border border-zinc-800 text-center">
                  <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">Available</p>
                  <p className="text-3xl text-green-400">{totalTables - bookedTables}</p>
                </div>
              </div>
            </div>
          )}

          {/* --- MENU EDITOR TAB --- */}
          {activeTab === "menu" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-serif text-amber-500 uppercase tracking-widest">Menu Items</h2>
                <button onClick={() => setEditingItem({ title: "", ingredients: "", price: 0, category: categories[0] || "", imageUrl: "" })} className="flex items-center gap-2 bg-amber-500 text-zinc-950 px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition">
                  <Plus size={16} /> Add Dish
                </button>
              </div>

              {editingItem && (
                <form onSubmit={handleSaveItem} className="bg-zinc-900 p-6 border border-zinc-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Dish Name" required value={editingItem.title} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} className="bg-zinc-950 border border-zinc-800 p-3 text-white focus:border-amber-500 outline-none" />
                    <input type="number" placeholder="Price" required value={editingItem.price || ""} onChange={(e) => setEditingItem({...editingItem, price: Number(e.target.value)})} className="bg-zinc-950 border border-zinc-800 p-3 text-white focus:border-amber-500 outline-none" />
                    
                    {/* The NEW Select Dropdown for Categories */}
                    <select required value={editingItem.category} onChange={(e) => setEditingItem({...editingItem, category: e.target.value})} className="bg-zinc-950 border border-zinc-800 p-3 text-zinc-300 focus:border-amber-500 outline-none appearance-none">
                      <option value="" disabled>Select a Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    <input type="text" placeholder="Image URL (Unsplash link)" required value={editingItem.imageUrl} onChange={(e) => setEditingItem({...editingItem, imageUrl: e.target.value})} className="bg-zinc-950 border border-zinc-800 p-3 text-white focus:border-amber-500 outline-none" />
                  </div>
                  <textarea placeholder="Ingredients / Description" required value={editingItem.ingredients} onChange={(e) => setEditingItem({...editingItem, ingredients: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:border-amber-500 outline-none h-24" />
                  <div className="flex gap-4">
                    <button type="submit" className="bg-amber-500 text-zinc-950 px-6 py-2 font-bold uppercase tracking-wider">Save Dish</button>
                    <button type="button" onClick={() => setEditingItem(null)} className="text-zinc-400 hover:text-white">Cancel</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 gap-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-zinc-950 border border-zinc-800 p-4 hover:border-zinc-700 transition">
                    <div>
                      <h4 className="text-white font-serif">{item.title} <span className="text-amber-500 text-sm ml-2">${item.price}</span></h4>
                      <p className="text-zinc-500 text-sm">{item.category}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setEditingItem(item)} className="text-zinc-400 hover:text-blue-400 transition"><Edit3 size={18} /></button>
                      <button onClick={() => handleDeleteItem(item.id)} className="text-zinc-400 hover:text-red-400 transition"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}