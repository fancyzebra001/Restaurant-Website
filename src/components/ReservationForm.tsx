"use client";

import { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function ReservationForm() {
  const { customerEmail, totalTables, bookedTables, setBookedTables } = useStore();
  
  // Calculate available tables
  const availableTables = totalTables - bookedTables;

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (availableTables <= 0) {
      alert("We are deeply sorry, but we are fully booked for the selected time. Please try another date.");
      return;
    }

    if (!customerEmail && (!guestEmail || !guestPhone)) {
      alert("Please provide an email and phone number so we can confirm your reservation.");
      return;
    }

    // Simulate booking process
    setBookedTables((prev) => prev + 1);
    
    const targetEmail = customerEmail ? customerEmail : guestEmail;
    alert(`Booking confirmed for ${firstName}! \n\nA confirmation email has been sent to: ${targetEmail}.`);

    // Reset form
    setFirstName("");
    setLastName("");
    setDate("");
    setTime("");
    setGuestEmail("");
    setGuestPhone("");
  };

  return (
    <div className="bg-zinc-900 p-10 border border-zinc-800 relative overflow-hidden">
      
      {/* Top Header & Availability Badge */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="font-serif text-3xl text-white">Reserve a Table</h2>
        <div className={`px-3 py-1 text-xs font-bold tracking-widest uppercase border ${availableTables > 0 ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}`}>
          {availableTables > 0 ? `${availableTables} Tables Available` : 'Fully Booked'}
        </div>
      </div>
      <p className="text-zinc-500 mb-8 italic">Experience the culinary symphony.</p>
      
      <form onSubmit={handleBooking} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" required placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-zinc-950 border border-zinc-800 p-4 text-white focus:outline-none focus:border-amber-500" />
          <input type="text" required placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-zinc-950 border border-zinc-800 p-4 text-white focus:outline-none focus:border-amber-500" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="bg-zinc-950 border border-zinc-800 p-4 text-zinc-400 focus:outline-none focus:border-amber-500" />
          <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className="bg-zinc-950 border border-zinc-800 p-4 text-zinc-400 focus:outline-none focus:border-amber-500" />
        </div>

        {/* If NOT logged in, demand Email and Phone */}
        {!customerEmail && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-zinc-800 bg-zinc-950/50">
            <div className="sm:col-span-2 text-xs text-amber-500 uppercase tracking-widest">Guest Contact Details</div>
            <input type="email" required placeholder="Email Address" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} className="bg-zinc-950 border border-zinc-800 p-4 text-white focus:outline-none focus:border-amber-500" />
            <input type="tel" required placeholder="Phone Number" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="bg-zinc-950 border border-zinc-800 p-4 text-white focus:outline-none focus:border-amber-500" />
          </div>
        )}

        {/* If Logged in, show a soft confirmation */}
        {customerEmail && (
          <div className="text-sm text-zinc-400 p-4 border border-zinc-800 bg-zinc-950/50">
            Reserving under account: <span className="text-amber-500">{customerEmail}</span>
          </div>
        )}

        <select className="w-full bg-zinc-950 border border-zinc-800 p-4 text-zinc-400 focus:outline-none focus:border-amber-500">
          <option>2 Guests</option>
          <option>3 Guests</option>
          <option>4 Guests</option>
          <option>5+ Guests (Call Us)</option>
        </select>
        
        <button 
          type="submit" 
          disabled={availableTables <= 0}
          className={`w-full py-4 font-bold tracking-widest uppercase transition-colors ${availableTables > 0 ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}
        >
          {availableTables > 0 ? 'Request Booking' : 'No Tables Available'}
        </button>
      </form>
    </div>
  );
}