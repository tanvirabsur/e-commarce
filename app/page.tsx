"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  ArrowUpRight, 
  ArrowRight, 
  Store, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  User, 
  CheckCircle2, 
  X,
  Mail,
  ChevronRight
} from "lucide-react";
import { MOCK_PRODUCTS, MOCK_STORES } from "@/lib/mock-data";
import { generateOrganizationSchema } from "@/lib/seo-config";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [genderFilter, setGenderFilter] = useState<"men" | "woman">("woman");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [wishlist, setWishlist] = useState<string[]>(["prd_08"]); // prd_08 pre-favorited like in reference
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; qty: number; img: string }[]>([
    { 
      id: "prd_07", 
      name: "Casual Retro Runner Sneakers", 
      price: 2450, 
      qty: 1, 
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" 
    }
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const orgSchema = generateOrganizationSchema();
  const approvedProducts = MOCK_PRODUCTS.filter(p => p.approvalStatus === "approved");

  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: { id: string; name: string; price: number; img?: string }) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        qty: 1,
        img: product.img || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
      }];
    });
    setToastMessage(`Added "${product.name.slice(0, 24)}..." to your bag!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setToastMessage("Thank you for subscribing to Elyqor Studio!");
    setNewsletterEmail("");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Category filter mapping for New Collection
  const categoryFilters = [
    { id: "all", label: "ALL" },
    { id: "apparel", label: "APPAREL" },
    { id: "footwear", label: "SHOES" },
    { id: "bags", label: "BAGS" },
    { id: "audio", label: "AUDIO" },
    { id: "traditional-fashion", label: "SILKS" },
  ];

  // Specific items for Row 1 of New Collection (Staggered Bento)
  const row1CasualShoe = approvedProducts.find(p => p.id === "prd_07") || approvedProducts[0];
  const row1KnitPolo = approvedProducts.find(p => p.id === "prd_08") || approvedProducts[1];
  const row1CyanTote = approvedProducts.find(p => p.id === "prd_09") || approvedProducts[2];

  // Specific items for Row 2 of New Collection (4 balanced cards)
  const row2Tee = approvedProducts.find(p => p.id === "prd_10") || approvedProducts[3];
  const row2Top = approvedProducts.find(p => p.id === "prd_11") || approvedProducts[4];
  const row2Headphone = approvedProducts.find(p => p.id === "prd_12") || approvedProducts[1];
  const row2Backpack = approvedProducts.find(p => p.id === "prd_13") || approvedProducts[0];

  return (
    <div className="min-h-screen bg-white text-[#0F2F2A] flex flex-col font-sans selection:bg-[#2F6F4E] selection:text-white antialiased">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* 1. Top Utility Strip */}
      <div className="bg-[#0F2F2A] text-slate-300 text-[11px] py-2 px-4 border-b border-[#2F6F4E]/30">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[#88B04B] font-bold flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              <span>Free Delivery across Bangladesh on orders over ৳ 3,000</span>
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:inline text-slate-300">
              Cash on Delivery nationwide with 100% inspection guarantee
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/seller" 
              className="text-slate-300 hover:text-[#D9A441] transition flex items-center gap-1"
            >
              <Store className="w-3 h-3 text-[#D9A441]" />
              <span>Merchant Hub</span>
            </Link>
            <span className="text-slate-700">|</span>
            <Link 
              href="/admin" 
              className="text-slate-300 hover:text-white transition"
            >
              Platform Console
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Clean Family Studio Aesthetic) */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 transition-all">
        {/* Upper Row: Brand Logo, Centered Pill Search, Profile & Cart */}
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
          {/* Brand Logo */}
          <Link href="/" className="group shrink-0 flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-[#0F2F2A] font-serif sm:font-sans group-hover:text-[#2F6F4E] transition">
              Elyqor Studio
            </span>
          </Link>

          {/* Centered Pill Search Bar */}
          <div className="flex-1 max-w-xl mx-auto relative hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search product, style, category..."
              className="w-full bg-[#F4F5F7] border border-transparent hover:border-slate-300 focus:border-[#0F2F2A] focus:bg-white rounded-full pl-11 pr-10 py-2.5 text-xs text-[#0F2F2A] placeholder:text-slate-400 focus:outline-none transition shadow-2xs"
            />
            {searchKeyword && (
              <button 
                type="button" 
                onClick={() => setSearchKeyword("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Action Icons: Wishlist, Cart Drawer, Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Wishlist Pill */}
            <div className="relative hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-[#F4F5F7] hover:bg-[#EAEAEA] text-[#0F2F2A] transition cursor-pointer">
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? "fill-rose-500 text-rose-500" : "text-[#0F2F2A]"}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* Shopping Bag Trigger */}
            <button 
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 bg-[#F4F5F7] hover:bg-[#EAEAEA] text-[#0F2F2A] px-3.5 py-2 rounded-full transition btn-press-effect"
              aria-label="View Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#0F2F2A]" />
                <span className="absolute -top-1.5 -right-2 bg-[#0F2F2A] text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.reduce((a, b) => a + b.qty, 0)}
                </span>
              </div>
              <span className="text-xs font-bold text-[#0F2F2A] hidden sm:inline ml-0.5">
                ৳ {cartTotal.toLocaleString()}
              </span>
            </button>

            {/* User Profile Avatar */}
            <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 border border-slate-300 cursor-pointer shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="Account" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Lower Row: Clean Horizontal Nav Links */}
        <div className="border-t border-slate-100">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-center gap-6 sm:gap-9 overflow-x-auto py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap scrollbar-none">
            <Link href="/" className="text-[#0F2F2A] hover:text-[#2F6F4E] transition font-bold border-b-2 border-[#0F2F2A] pb-0.5">
              NEW ARRIVAL
            </Link>
            <a href="#new-collection" className="text-slate-600 hover:text-[#0F2F2A] transition">
              MOST PICK
            </a>
            <a href="#promo-sale" className="text-rose-600 font-bold hover:text-rose-700 transition flex items-center gap-1">
              <span>SALE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            </a>
            <button 
              onClick={() => { setSelectedCategory("apparel"); setGenderFilter("woman"); }}
              className={`hover:text-[#0F2F2A] transition ${selectedCategory === "apparel" && genderFilter === "woman" ? "text-[#0F2F2A] font-bold" : "text-slate-600"}`}
            >
              WOMEN
            </button>
            <button 
              onClick={() => { setSelectedCategory("apparel"); setGenderFilter("men"); }}
              className={`hover:text-[#0F2F2A] transition ${selectedCategory === "apparel" && genderFilter === "men" ? "text-[#0F2F2A] font-bold" : "text-slate-600"}`}
            >
              MEN
            </button>
            <button 
              onClick={() => setSelectedCategory("footwear")}
              className={`hover:text-[#0F2F2A] transition ${selectedCategory === "footwear" ? "text-[#0F2F2A] font-bold" : "text-slate-600"}`}
            >
              SNEAKERS
            </button>
            <Link href="/stores/apex-gadgets-lab" className="text-slate-600 hover:text-[#0F2F2A] transition">
              STORE LOCATION
            </Link>
            <a href="#footer" className="text-slate-600 hover:text-[#0F2F2A] transition">
              CONTACT US
            </a>
          </div>
        </div>
      </header>

      {/* Floating Added Notice Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F2F2A] text-white border border-[#88B04B] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#88B04B] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cart Drawer Slide-out */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="font-bold text-base text-[#0F2F2A] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#2F6F4E]" />
                  <span>Your Shopping Bag ({cartItems.reduce((a, b) => a + b.qty, 0)})</span>
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-[#0F2F2A] hover:bg-slate-100 transition"
                  aria-label="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto py-3">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0" />
                      <div>
                        <p className="font-bold text-[#0F2F2A] line-clamp-1">{item.name}</p>
                        <p className="text-slate-500 mt-0.5">৳ {item.price.toLocaleString()} × {item.qty}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#0F2F2A] shrink-0">৳ {(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span>Subtotal:</span>
                <span className="font-black text-[#0F2F2A] text-lg">৳ {cartTotal.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-slate-500">Free delivery included on this order. Cash on Delivery active nationwide.</p>
              <button
                onClick={() => {
                  alert("Order initiated! Our team will contact you to confirm Cash on Delivery.");
                  setCartOpen(false);
                }}
                className="w-full py-3.5 rounded-full bg-[#0F2F2A] hover:bg-[#2F6F4E] text-white font-bold text-xs shadow-md transition btn-press-effect uppercase tracking-wider"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. HERO SECTION (High-End Bento Grid Layout) */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 pb-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Top-Left Hero Card (8 Cols / 2-Row Height) */}
          <div className="lg:col-span-8 bg-[#C6D8D5] rounded-2xl p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between min-h-[460px] sm:min-h-[500px] shadow-2xs group">
            {/* Top Bar inside Card */}
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="max-w-md">
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-normal text-[#0F2F2A] tracking-tight leading-[1.1] font-serif sm:font-sans">
                  Summer<br />Arrival of<br />Outfit
                </h1>
                <p className="mt-4 text-xs sm:text-sm text-slate-700 font-normal leading-relaxed max-w-xs">
                  Discover quality fashion that reflects your personality. Made with fine fabrics and timeless craft.
                </p>
                
                <div className="mt-6">
                  <a
                    href="#new-collection"
                    className="inline-flex items-center gap-2 bg-[#0F2F2A] hover:bg-[#1B4332] text-white text-xs font-bold px-6 py-3 rounded-full transition shadow-sm btn-press-effect tracking-wider"
                  >
                    <span>EXPLORE PRODUCT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 50% OFF Callout */}
              <div className="text-right shrink-0">
                <div className="text-3xl sm:text-5xl font-normal tracking-tight text-[#0F2F2A]/90 font-sans">
                  50% <span className="text-xs sm:text-sm uppercase tracking-widest font-bold block text-slate-700">OFF</span>
                </div>
              </div>
            </div>

            {/* Models Photography Cutout / Frame */}
            <div className="absolute right-0 bottom-0 w-3/5 sm:w-1/2 h-4/5 pointer-events-none select-none flex items-end justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
                alt="Summer Arrival of Outfit Models"
                className="w-full h-full object-cover object-top opacity-95 group-hover:scale-[1.02] transition-transform duration-500 rounded-tl-3xl"
              />
            </div>
          </div>

          {/* Top-Right Tall Card (4 Cols) */}
          <div className="lg:col-span-4 bg-[#E8E3DC] rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[460px] sm:min-h-[500px] shadow-2xs group">
            <div className="flex items-start justify-between z-10">
              <h2 className="text-2xl font-normal tracking-tight text-[#0F2F2A] font-serif sm:font-sans">
                Fashion &<br />Style
              </h2>
              <Link 
                href="/products/pure-silk-organza-tiered-camisole-top"
                className="w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-[#0F2F2A] transition shadow-xs"
                aria-label="View Fashion & Style"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Model Seated on Cushions */}
            <div className="w-full h-72 sm:h-80 relative mt-4 overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
                alt="Fashion & Style Model"
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Bottom-Left Card: Trendy Sunglass (6 Cols) */}
          <div className="lg:col-span-6 bg-[#D7DED9] rounded-2xl p-6 sm:p-7 relative overflow-hidden flex items-center justify-between min-h-[160px] shadow-2xs group">
            <div className="z-10 max-w-[200px]">
              <h3 className="text-lg sm:text-xl font-normal tracking-tight text-[#0F2F2A] font-serif sm:font-sans">
                Trendy<br />Sunglass
              </h3>
              <Link
                href="/products/polarized-classic-tortoise-sunglasses-uv400"
                className="mt-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/70 hover:bg-white text-[#0F2F2A] transition shadow-xs"
                aria-label="View Trendy Sunglasses"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Sunglasses Image Cutout */}
            <div className="w-56 h-36 relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
                alt="Trendy Sunglasses"
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Bottom-Right Card: Popular Shoes (6 Cols) */}
          <div className="lg:col-span-6 bg-[#EFE3D5] rounded-2xl p-6 sm:p-7 relative overflow-hidden flex items-center justify-between min-h-[160px] shadow-2xs group">
            <div className="z-10 max-w-[200px]">
              <h3 className="text-lg sm:text-xl font-normal tracking-tight text-[#0F2F2A] font-serif sm:font-sans">
                Popular<br />Shoes
              </h3>
              <Link
                href="/products/casual-retro-runner-sneakers"
                className="mt-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/70 hover:bg-white text-[#0F2F2A] transition shadow-xs"
                aria-label="View Popular Shoes"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Sneaker Image Cutout */}
            <div className="w-56 h-36 relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
                alt="Popular Retro Shoes"
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. BROWSE CATEGORIES SECTION */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 w-full">
        {/* Section Heading & Gender Toggle */}
        <div className="flex items-center justify-between mb-6 pb-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F2F2A] uppercase">
            BROWSE CATEGORIES
          </h2>

          <div className="flex items-center border border-slate-300 rounded-full p-0.5 text-xs">
            <button
              onClick={() => setGenderFilter("men")}
              className={`px-3 py-1 rounded-full font-semibold transition ${genderFilter === "men" ? "bg-[#0F2F2A] text-white" : "text-slate-600 hover:text-black"}`}
            >
              MEN
            </button>
            <button
              onClick={() => setGenderFilter("woman")}
              className={`px-3 py-1 rounded-full font-semibold transition ${genderFilter === "woman" ? "bg-[#0F2F2A] text-white" : "text-slate-600 hover:text-black"}`}
            >
              WOMAN
            </button>
          </div>
        </div>

        {/* 4 Category Cards in Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Category 1: Shoes */}
          <Link
            href="/products/casual-retro-runner-sneakers"
            className="bg-[#F2F3F5] hover:bg-[#EBEEF0] rounded-xl p-5 flex flex-col justify-between items-center h-64 relative group transition shadow-2xs"
          >
            <div className="w-full h-44 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80" 
                alt="Shoes Category" 
                className="w-40 h-40 object-contain group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="w-full flex justify-start">
              <span className="bg-white/90 backdrop-blur-xs text-[#0F2F2A] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs border border-slate-200/60">
                SHOES
              </span>
            </div>
          </Link>

          {/* Category 2: Bags */}
          <Link
            href="/products/urban-waterproof-commuter-travel-backpack"
            className="bg-[#F2F3F5] hover:bg-[#EBEEF0] rounded-xl p-5 flex flex-col justify-between items-center h-64 relative group transition shadow-2xs"
          >
            <div className="w-full h-44 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80" 
                alt="Bags Category" 
                className="w-40 h-40 object-contain group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="w-full flex justify-start">
              <span className="bg-white/90 backdrop-blur-xs text-[#0F2F2A] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs border border-slate-200/60">
                BAGS
              </span>
            </div>
          </Link>

          {/* Category 3: Tote Bags */}
          <Link
            href="/products/artisan-cyan-canvas-shopper-tote"
            className="bg-[#F2F3F5] hover:bg-[#EBEEF0] rounded-xl p-5 flex flex-col justify-between items-center h-64 relative group transition shadow-2xs"
          >
            <div className="w-full h-44 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80" 
                alt="Tote Bags Category" 
                className="w-40 h-40 object-contain group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="w-full flex justify-start">
              <span className="bg-white/90 backdrop-blur-xs text-[#0F2F2A] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs border border-slate-200/60">
                BAGS
              </span>
            </div>
          </Link>

          {/* Category 4: T-Shirt */}
          <Link
            href="/products/minimalist-matte-black-crewneck-tee"
            className="bg-[#F2F3F5] hover:bg-[#EBEEF0] rounded-xl p-5 flex flex-col justify-between items-center h-64 relative group transition shadow-2xs"
          >
            <div className="w-full h-44 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80" 
                alt="T-Shirt Category" 
                className="w-40 h-40 object-cover rounded-lg group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="w-full flex justify-start">
              <span className="bg-white/90 backdrop-blur-xs text-[#0F2F2A] text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs border border-slate-200/60">
                T-SHIRT
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 5. NEW COLLECTION (Staggered Bento Grid Matching Reference) */}
      <section id="new-collection" className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 w-full">
        {/* Header & Category Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F2F2A]">
            New Collection
          </h2>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-bold uppercase tracking-wider">
            {categoryFilters.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full transition ${
                  selectedCategory === cat.id 
                    ? "bg-[#0F2F2A] text-white shadow-xs" 
                    : "bg-[#F4F5F7] text-slate-600 hover:text-black hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 1: Staggered Bento (1 Col + 2 Cols Center Feature + 1 Col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 mb-8 items-stretch">
          {/* Card 1: Casual Shoe (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between group">
            <div className="bg-[#F4F5F7] rounded-xl p-5 relative overflow-hidden h-[340px] flex items-center justify-center shadow-2xs">
              <button
                onClick={() => toggleWishlist(row1CasualShoe.id)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs transition hover:scale-110 z-10"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(row1CasualShoe.id) ? "fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-500"}`} />
              </button>
              
              <Link href={`/products/${row1CasualShoe.slug}`} className="w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row1CasualShoe.media[0]?.url}
                  alt={row1CasualShoe.name}
                  className="max-h-52 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            <div className="mt-3 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#0F2F2A]">
                  <Link href={`/products/${row1CasualShoe.slug}`} className="hover:text-[#2F6F4E]">
                    Casual Shoe
                  </Link>
                </h3>
                <p className="text-xs font-bold text-slate-600 mt-0.5">৳ {row1CasualShoe.price.toLocaleString()}</p>
              </div>

              <button
                onClick={() => handleAddToCart({ id: row1CasualShoe.id, name: row1CasualShoe.name, price: row1CasualShoe.price, img: row1CasualShoe.media[0]?.url })}
                className="text-[11px] font-bold text-[#0F2F2A] hover:text-[#2F6F4E] underline uppercase tracking-wider"
              >
                + Bag
              </button>
            </div>
          </div>

          {/* Card 2: Center Featured - Gray-Shirt Knit Polo (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between group">
            <div className="bg-[#F4F5F7] rounded-xl relative overflow-hidden h-[340px] flex items-center justify-center shadow-2xs">
              <button
                onClick={() => toggleWishlist(row1KnitPolo.id)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs transition hover:scale-110 z-10"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(row1KnitPolo.id) ? "fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-500"}`} />
              </button>

              <Link href={`/products/${row1KnitPolo.slug}`} className="w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row1KnitPolo.media[0]?.url}
                  alt={row1KnitPolo.name}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
                />
              </Link>
            </div>

            <div className="mt-3 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#0F2F2A]">
                  <Link href={`/products/${row1KnitPolo.slug}`} className="hover:text-[#2F6F4E]">
                    Gray-Shirt
                  </Link>
                </h3>
                <p className="text-xs font-bold text-slate-600 mt-0.5">৳ {row1KnitPolo.price.toLocaleString()}</p>
              </div>

              <button
                onClick={() => handleAddToCart({ id: row1KnitPolo.id, name: row1KnitPolo.name, price: row1KnitPolo.price, img: row1KnitPolo.media[0]?.url })}
                className="text-[11px] font-bold text-[#0F2F2A] hover:text-[#2F6F4E] underline uppercase tracking-wider"
              >
                + Bag
              </button>
            </div>
          </div>

          {/* Card 3: Woman Bage (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between group">
            <div className="bg-[#F4F5F7] rounded-xl p-5 relative overflow-hidden h-[340px] flex items-center justify-center shadow-2xs">
              <button
                onClick={() => toggleWishlist(row1CyanTote.id)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs transition hover:scale-110 z-10"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(row1CyanTote.id) ? "fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-500"}`} />
              </button>

              <Link href={`/products/${row1CyanTote.slug}`} className="w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row1CyanTote.media[0]?.url}
                  alt={row1CyanTote.name}
                  className="max-h-56 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            <div className="mt-3 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#0F2F2A]">
                  <Link href={`/products/${row1CyanTote.slug}`} className="hover:text-[#2F6F4E]">
                    Woman Bage
                  </Link>
                </h3>
                <p className="text-xs font-bold text-slate-600 mt-0.5">৳ {row1CyanTote.price.toLocaleString()}</p>
              </div>

              <button
                onClick={() => handleAddToCart({ id: row1CyanTote.id, name: row1CyanTote.name, price: row1CyanTote.price, img: row1CyanTote.media[0]?.url })}
                className="text-[11px] font-bold text-[#0F2F2A] hover:text-[#2F6F4E] underline uppercase tracking-wider"
              >
                + Bag
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: 4 Balanced Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 4: Fashion T-Shirt */}
          <div className="flex flex-col justify-between group">
            <div className="bg-[#F4F5F7] rounded-xl relative overflow-hidden h-[300px] flex items-center justify-center shadow-2xs">
              <button
                onClick={() => toggleWishlist(row2Tee.id)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs transition hover:scale-110 z-10"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(row2Tee.id) ? "fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-500"}`} />
              </button>

              <Link href={`/products/${row2Tee.slug}`} className="w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row2Tee.media[0]?.url}
                  alt={row2Tee.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            <div className="mt-3 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#0F2F2A]">
                  <Link href={`/products/${row2Tee.slug}`} className="hover:text-[#2F6F4E]">
                    Fashion T-Shirt
                  </Link>
                </h3>
                <p className="text-xs font-bold text-slate-600 mt-0.5">৳ {row2Tee.price.toLocaleString()}</p>
              </div>

              <button
                onClick={() => handleAddToCart({ id: row2Tee.id, name: row2Tee.name, price: row2Tee.price, img: row2Tee.media[0]?.url })}
                className="text-[11px] font-bold text-[#0F2F2A] hover:text-[#2F6F4E] underline uppercase tracking-wider"
              >
                + Bag
              </button>
            </div>
          </div>

          {/* Card 5: Kids Top / Camisole */}
          <div className="flex flex-col justify-between group">
            <div className="bg-[#F4F5F7] rounded-xl p-5 relative overflow-hidden h-[300px] flex items-center justify-center shadow-2xs">
              <button
                onClick={() => toggleWishlist(row2Top.id)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs transition hover:scale-110 z-10"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(row2Top.id) ? "fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-500"}`} />
              </button>

              <Link href={`/products/${row2Top.slug}`} className="w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row2Top.media[0]?.url}
                  alt={row2Top.name}
                  className="max-h-52 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            <div className="mt-3 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#0F2F2A]">
                  <Link href={`/products/${row2Top.slug}`} className="hover:text-[#2F6F4E]">
                    Kids Top
                  </Link>
                </h3>
                <p className="text-xs font-bold text-slate-600 mt-0.5">৳ {row2Top.price.toLocaleString()}</p>
              </div>

              <button
                onClick={() => handleAddToCart({ id: row2Top.id, name: row2Top.name, price: row2Top.price, img: row2Top.media[0]?.url })}
                className="text-[11px] font-bold text-[#0F2F2A] hover:text-[#2F6F4E] underline uppercase tracking-wider"
              >
                + Bag
              </button>
            </div>
          </div>

          {/* Card 6: Smart Headphone */}
          <div className="flex flex-col justify-between group">
            <div className="bg-[#F4F5F7] rounded-xl p-5 relative overflow-hidden h-[300px] flex items-center justify-center shadow-2xs">
              <button
                onClick={() => toggleWishlist(row2Headphone.id)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs transition hover:scale-110 z-10"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(row2Headphone.id) ? "fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-500"}`} />
              </button>

              <Link href={`/products/${row2Headphone.slug}`} className="w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row2Headphone.media[0]?.url}
                  alt={row2Headphone.name}
                  className="max-h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            <div className="mt-3 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#0F2F2A]">
                  <Link href={`/products/${row2Headphone.slug}`} className="hover:text-[#2F6F4E]">
                    Smart Headpone
                  </Link>
                </h3>
                <p className="text-xs font-bold text-slate-600 mt-0.5">৳ {row2Headphone.price.toLocaleString()}</p>
              </div>

              <button
                onClick={() => handleAddToCart({ id: row2Headphone.id, name: row2Headphone.name, price: row2Headphone.price, img: row2Headphone.media[0]?.url })}
                className="text-[11px] font-bold text-[#0F2F2A] hover:text-[#2F6F4E] underline uppercase tracking-wider"
              >
                + Bag
              </button>
            </div>
          </div>

          {/* Card 7: Nike Bage / Urban Backpack */}
          <div className="flex flex-col justify-between group">
            <div className="bg-[#F4F5F7] rounded-xl p-5 relative overflow-hidden h-[300px] flex items-center justify-center shadow-2xs">
              <button
                onClick={() => toggleWishlist(row2Backpack.id)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs transition hover:scale-110 z-10"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(row2Backpack.id) ? "fill-rose-500 text-rose-500" : "text-slate-400 hover:text-rose-500"}`} />
              </button>

              <Link href={`/products/${row2Backpack.slug}`} className="w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row2Backpack.media[0]?.url}
                  alt={row2Backpack.name}
                  className="max-h-52 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            <div className="mt-3 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-xs text-[#0F2F2A]">
                  <Link href={`/products/${row2Backpack.slug}`} className="hover:text-[#2F6F4E]">
                    Nike Bage
                  </Link>
                </h3>
                <p className="text-xs font-bold text-slate-600 mt-0.5">৳ {row2Backpack.price.toLocaleString()}</p>
              </div>

              <button
                onClick={() => handleAddToCart({ id: row2Backpack.id, name: row2Backpack.name, price: row2Backpack.price, img: row2Backpack.media[0]?.url })}
                className="text-[11px] font-bold text-[#0F2F2A] hover:text-[#2F6F4E] underline uppercase tracking-wider"
              >
                + Bag
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTRAST PROMO BANNER (END OF SEASON SALE UP TO 50% OFF) */}
      <section id="promo-sale" className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 w-full">
        <div className="bg-[#0F2F2A] rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-white shadow-xl min-h-[220px]">
          {/* Left Model Photo */}
          <div className="w-full md:w-1/4 h-48 md:h-64 relative overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
              alt="End of Season Sale"
              className="w-full h-full object-cover object-top opacity-90"
            />
          </div>

          {/* Center Callout */}
          <div className="py-8 px-6 text-center z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
              LAST CHANCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase">
              END OF SEASON SALE<br className="hidden sm:inline" /> UP TO 50% OFF
            </h2>
            <div className="mt-5">
              <a
                href="#new-collection"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-[#0F2F2A] text-xs font-bold px-7 py-3 rounded-full transition shadow-md btn-press-effect tracking-wider uppercase"
              >
                <span>SHOP IT&apos;S NOW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Model Photo */}
          <div className="w-full md:w-1/4 h-48 md:h-64 relative overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
              alt="Backpack Style"
              className="w-full h-full object-cover object-center opacity-90"
            />
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIAL SECTION */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Quote & Author */}
          <div className="lg:col-span-6 space-y-4 pr-0 lg:pr-8">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">
              What people said
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#0F2F2A] leading-tight font-serif sm:font-sans">
              I like to order on<br />this way.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-2">
              Very professional and friendly at the same time. They packed the order on schedule and the detail of their wrapping is top notch... one of my best experience for buying online items. Surely will come back for another purchase.
            </p>

            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-bold text-sm text-[#0F2F2A]">Janeiba William</h4>
              <p className="text-xs text-slate-500">Fashion Enthusiast • Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Right Column: Customer Portrait in Rounded Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg bg-[#EAE4DC] rounded-2xl overflow-hidden p-6 sm:p-8 flex items-center justify-center shadow-xs">
              <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Janeiba William"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FROM THE BLOG (Editorial Story Section) */}
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 w-full border-t border-slate-100">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F2F2A] mb-8">
          From The Blog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Photo 1: Clothes Rack */}
          <div className="md:col-span-4 rounded-xl overflow-hidden h-[340px] shadow-2xs group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80"
              alt="Clothes collection styling"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Photo 2: Woman in Trench Coat */}
          <div className="md:col-span-3 rounded-xl overflow-hidden h-[340px] shadow-2xs group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80"
              alt="Street style combination"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Article Text Card */}
          <div className="md:col-span-5 bg-white border border-slate-200/80 rounded-xl p-8 flex flex-col justify-between shadow-2xs">
            <div>
              <h3 className="text-2xl sm:text-3xl font-normal text-[#0F2F2A] tracking-tight leading-snug font-serif sm:font-sans">
                How to combine your daily outfit to looks fredh and cool
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Maybe you don&apos;t need to buy new clothes to look nice, fresh-looking outfit everyday. Maybe what you need is to combine your clothes collections. Mix and match is the key.
              </p>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => alert("Blog article opened: 'Mastering Capsule Wardrobes & Bangladesh Handlooms'")}
                className="border border-[#0F2F2A] hover:bg-[#0F2F2A] hover:text-white text-[#0F2F2A] text-xs font-bold px-6 py-2.5 rounded-full transition uppercase tracking-wider"
              >
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TOP VERIFIED MERCHANTS BAR */}
      <section className="bg-[#FAFCF9] border-t border-slate-200 py-10">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#2F6F4E] uppercase tracking-wider">
                Direct Merchant Hub
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F2F2A] mt-0.5">
                Verified Artisan & Tech Stores
              </h2>
            </div>

            <Link
              href="/seller"
              className="text-xs font-bold text-[#2F6F4E] hover:underline flex items-center gap-1"
            >
              <span>Become a Merchant</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOCK_STORES.map((store) => (
              <div 
                key={store.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between hover:border-[#2F6F4E]/40 transition"
              >
                <div>
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={store.logo}
                      alt={store.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 bg-slate-50"
                    />
                    <div>
                      <h3 className="font-bold text-[#0F2F2A] text-sm flex items-center gap-1.5">
                        <Link href={`/stores/${store.slug}`} className="hover:text-[#2F6F4E]">
                          {store.name}
                        </Link>
                        <ShieldCheck className="w-4 h-4 text-[#2F6F4E]" />
                      </h3>
                      <p className="text-[11px] text-slate-500">{store.district}, Bangladesh</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {store.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{store.totalSales}+ Delivered</span>
                  <Link
                    href={`/stores/${store.slug}`}
                    className="text-xs font-bold text-[#0F2F2A] hover:text-[#2F6F4E] flex items-center gap-1"
                  >
                    <span>Visit Store</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. HIGH-END DARK FOOTER (Matching Family Studio Reference) */}
      <footer id="footer" className="bg-[#0B1E1B] text-slate-300 pt-16 pb-10 border-t border-[#2F6F4E]/30 text-xs">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Brand & Newsletter (4 cols) */}
          <div className="md:col-span-5 space-y-4 pr-0 sm:pr-8">
            <span className="font-extrabold text-2xl text-white tracking-tight font-serif sm:font-sans">
              Elyqor Studio
            </span>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Experience a new standard of social commerce in Bangladesh. Verified authentic merchants with nationwide delivery and quality guarantee.
            </p>

            {/* Newsletter Pill Input */}
            <form onSubmit={handleSubscribe} className="pt-2 max-w-sm">
              <div className="bg-white/10 border border-white/20 rounded-full p-1 flex items-center justify-between">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="bg-transparent text-xs text-white placeholder:text-slate-400 px-4 py-1.5 focus:outline-none flex-1"
                  required
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-slate-200 text-[#0F2F2A] font-bold text-xs px-5 py-2 rounded-full transition shrink-0"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* POPULAR Columns (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">POPULAR</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li><button onClick={() => setSelectedCategory("footwear")} className="hover:text-white transition">Shoes</button></li>
              <li><button onClick={() => setSelectedCategory("apparel")} className="hover:text-white transition">T-Shirt</button></li>
              <li><button onClick={() => setSelectedCategory("traditional-fashion")} className="hover:text-white transition">Artisan Silk</button></li>
              <li><button onClick={() => setSelectedCategory("bags")} className="hover:text-white transition">Canvas Bags</button></li>
              <li><button onClick={() => setSelectedCategory("audio")} className="hover:text-white transition">Audio & Gadgets</button></li>
            </ul>
          </div>

          {/* PAGES Column (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">PAGES</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li><a href="#new-collection" className="hover:text-white transition">All Category</a></li>
              <li><a href="#new-collection" className="hover:text-white transition">All Products</a></li>
              <li><a href="#promo-sale" className="hover:text-white transition">Special Events</a></li>
              <li><a href="#footer" className="hover:text-white transition">Testimonial</a></li>
              <li><Link href="/seller" className="hover:text-white transition">Merchant Hub</Link></li>
            </ul>
          </div>

          {/* STUDY / HELP Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">STUDY & SUPPORT</h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li><a href="#new-collection" className="hover:text-white transition">Tracking Package</a></li>
              <li><span className="text-slate-400">FAQ & Customer Helpline</span></li>
              <li><Link href="/admin" className="hover:text-white transition">Platform Console</Link></li>
              <li><Link href="/stores/apex-gadgets-lab" className="hover:text-white transition">Merchant Directory</Link></li>
              <li><span className="text-slate-400">Terms and Conditions</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© 2026 Elyqor Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" target="_blank" className="hover:underline">XML Sitemap</Link>
            <Link href="/robots.txt" target="_blank" className="hover:underline">Robots.txt</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}