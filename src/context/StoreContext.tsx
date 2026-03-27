"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type MenuItem = {
  id: string;
  title: string;
  ingredients: string;
  price: number;
  category: string;
  imageUrl: string;
};

export type CartItem = MenuItem & { quantity: number };

type StoreContextType = {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  customerEmail: string | null;
  setCustomerEmail: (email: string | null) => void;
  totalTables: number;
  setTotalTables: React.Dispatch<React.SetStateAction<number>>;
  bookedTables: number;
  setBookedTables: React.Dispatch<React.SetStateAction<number>>;
  // --- NEW: Categories State ---
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

// ... (Keep your long initialMenu array here as we set it up previously) ...
const initialMenu: MenuItem[] = [
  { id: "app-1", title: "Oysters Rockefeller", ingredients: "Blue Point oysters, creamed spinach, pernod, hollandaise, toasted herb breadcrumbs", price: 26, category: "Appetizers", imageUrl: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=800&auto=format&fit=crop" },
  { id: "app-2", title: "Wagyu Beef Carpaccio", ingredients: "Thinly sliced A5 wagyu, crispy capers, white truffle oil, shaved 24-month parmigiano", price: 32, category: "Appetizers", imageUrl: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=800&auto=format&fit=crop" },
  { id: "str-1", title: "Truffle Arancini", ingredients: "Arborio rice, black truffle, wild mushrooms, parmesan crisp, garlic aioli", price: 24, category: "Starters", imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop" },
  { id: "str-2", title: "Maine Lobster Bisque", ingredients: "Butter-poached lobster, cognac cream, chive oil, micro cilantro", price: 28, category: "Starters", imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop" },
  { id: "mn-1", title: "Wagyu Ribeye", ingredients: "12oz Grade A5 Wagyu, smoked garlic butter, charred asparagus, pomme purée", price: 145, category: "Mains", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" },
  { id: "mn-2", title: "Pan-Seared Halibut", ingredients: "Alaskan halibut, saffron risotto, Meyer lemon beurre blanc, crispy leeks", price: 48, category: "Mains", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop" },
  { id: "mn-3", title: "Duck Confit", ingredients: "Crispy leg confit, beluga lentils, cherry gastrique, roasted root vegetables", price: 42, category: "Mains", imageUrl: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=800&auto=format&fit=crop" },
  { id: "spc-1", title: "Tomahawk for Two", ingredients: "32oz dry-aged bone-in ribeye, bone marrow butter, truffled mac & cheese", price: 185, category: "Specials", imageUrl: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800&auto=format&fit=crop" },
  { id: "spc-2", title: "White Truffle Tagliatelle", ingredients: "Hand-made ribbon pasta, shaved Alba white truffle, parmigiano reggiano foam", price: 85, category: "Specials", imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop" },
  { id: "sea-1", title: "Spring Lamb Rack", ingredients: "Herb-crusted lamb, sweet pea purée, mint infused lamb jus, fondant potatoes", price: 58, category: "Seasonal", imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=800&auto=format&fit=crop" },
  { id: "sea-2", title: "Heirloom Tomato Tartare", ingredients: "Whipped burrata, basil caviar, aged balsamic glaze, sourdough crisp", price: 24, category: "Seasonal", imageUrl: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=800&auto=format&fit=crop" },
  { id: "des-1", title: "Dark Chocolate Soufflé", ingredients: "Valrhona 70% dark chocolate, Grand Marnier crème anglaise, gold leaf", price: 18, category: "Dessert", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop" },
  { id: "des-2", title: "Madagascar Vanilla Crème Brûlée", ingredients: "Caramelized raw sugar crust, fresh seasonal berries, mint", price: 14, category: "Dessert", imageUrl: "https://images.unsplash.com/photo-1472555794301-8a3590022e86?q=80&w=800&auto=format&fit=crop" },
  { id: "bev-1", title: "Smoked Old Fashioned", ingredients: "Woodford Reserve bourbon, maple syrup, Angostura bitters, applewood smoke", price: 22, category: "Beverages", imageUrl: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop" },
  { id: "bev-2", title: "L'Étoile Signature Spritz", ingredients: "Prosecco, elderflower liqueur, club soda, dehydrated lemon, rosemary sprig", price: 18, category: "Beverages", imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop" }
];

// Default categories
const initialCategories = ["Appetizers", "Starters", "Mains", "Specials", "Seasonal", "Dessert", "Beverages"];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const [totalTables, setTotalTables] = useState(20);
  const [bookedTables, setBookedTables] = useState(8);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedMenu = localStorage.getItem("restaurant_menu");
    const savedCart = localStorage.getItem("restaurant_cart");
    const savedCustomer = localStorage.getItem("customer_email");
    const savedTotalTables = localStorage.getItem("total_tables");
    const savedBookedTables = localStorage.getItem("booked_tables");
    const savedCategories = localStorage.getItem("restaurant_categories"); // Load categories
    
    if (savedMenu) setMenuItems(JSON.parse(savedMenu));
    else setMenuItems(initialMenu);
    
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    else setCategories(initialCategories);

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedCustomer) setCustomerEmail(savedCustomer);
    if (savedTotalTables) setTotalTables(Number(savedTotalTables));
    if (savedBookedTables) setBookedTables(Number(savedBookedTables));
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("restaurant_menu", JSON.stringify(menuItems));
      localStorage.setItem("restaurant_cart", JSON.stringify(cart));
      localStorage.setItem("restaurant_categories", JSON.stringify(categories)); // Save categories
      localStorage.setItem("total_tables", totalTables.toString());
      localStorage.setItem("booked_tables", bookedTables.toString());
      if (customerEmail) localStorage.setItem("customer_email", customerEmail);
      else localStorage.removeItem("customer_email");
    }
  }, [menuItems, cart, customerEmail, totalTables, bookedTables, categories, isLoaded]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]); 

  if (!isLoaded) return null; 

  return (
    <StoreContext.Provider value={{ 
      menuItems, setMenuItems, cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      isAdmin, setIsAdmin, customerEmail, setCustomerEmail,
      totalTables, setTotalTables, bookedTables, setBookedTables,
      categories, setCategories // Export the new state
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
};