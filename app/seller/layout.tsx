"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Truck, 
  Wallet, 
  Share2, 
  Bell, 
  Download, 
  HelpCircle, 
  Settings, 
  ChevronsUpDown, 
  Search, 
  ArrowUpRight, 
  Store,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNavActive = (href: string) => {
    if (href === "/seller") return pathname === "/seller";
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="p-4 space-y-5 flex-1 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Brand / Store Name */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E6EFE2]/80">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2F6F4E] flex items-center justify-center text-white shadow-xs">
              <Store className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-[#0F2F2A]">Apex Store</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </Link>
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-[#0F2F2A] hover:bg-[#F1F7ED] transition lg:hidden"
            title="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Group 1: Main Navigation */}
        <div className="space-y-0.5">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Main Navigation
          </div>
          
          <Link
            href="/seller"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              isNavActive("/seller")
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/seller/products"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              isNavActive("/seller/products") && pathname !== "/seller/products/new"
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>Products</span>
          </Link>

          <Link
            href="/seller/orders"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              isNavActive("/seller/orders")
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Orders</span>
            </div>
            <span className="bg-[#2F6F4E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              3
            </span>
          </Link>

          <Link
            href="/seller/earnings"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              isNavActive("/seller/earnings")
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <Wallet className="w-4 h-4 shrink-0" />
            <span>Transactions</span>
          </Link>
        </div>

        {/* Group 2: Growth Tools */}
        <div className="space-y-0.5 pt-1">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Growth Tools
          </div>

          <Link
            href="/seller/products/new"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              pathname === "/seller/products/new"
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span>Add New Product</span>
          </Link>

          <Link
            href="/seller/import-facebook"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              isNavActive("/seller/import-facebook")
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <Share2 className="w-4 h-4 shrink-0" />
            <span>Meta Catalog Sync</span>
          </Link>

          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A] transition"
          >
            <ArrowUpRight className="w-4 h-4 shrink-0" />
            <span>Platform Console</span>
          </Link>

          <Link
            href="/stores/apex-gadgets-lab"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A] transition"
          >
            <ArrowUpRight className="w-4 h-4 shrink-0" />
            <span>View Public Store</span>
          </Link>
        </div>

        {/* Group 3: Support */}
        <div className="space-y-0.5 pt-1">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Support
          </div>

          <button 
            type="button" 
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A] transition w-full text-left"
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>Merchant Support</span>
          </button>

          <button 
            type="button" 
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A] transition w-full text-left"
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Store Settings</span>
          </button>
        </div>
      </div>

      {/* Sidebar Footer User Card */}
      <div className="p-3 border-t border-[#E6EFE2] space-y-2 bg-[#FAFCF9] rounded-lg">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E6EFE2] shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-md bg-[#2F6F4E] text-white flex items-center justify-center font-bold text-xs shrink-0">
              AG
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-[#0F2F2A] truncate">Apex Gadgets Lab</p>
              <p className="text-[10px] text-slate-400 truncate">apex@elyqor.seller</p>
            </div>
          </div>
          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-1">
          <span>© 2026 Elyqor Merchant</span>
          <Link href="/" className="hover:text-[#2F6F4E]">Storefront</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#0F2F2A] flex font-sans antialiased">
      {/* 1. Desktop Left Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E6EFE2] flex flex-col justify-between shrink-0 hidden lg:flex sticky top-0 h-screen overflow-y-auto z-30">
        {navContent}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-[#0F2F2A]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl z-10 flex flex-col">
            {navContent}
          </div>
        </div>
      )}

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-14 bg-white border-b border-[#E6EFE2] px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between sticky top-0 z-40 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg border border-[#E6EFE2] text-slate-600 hover:text-[#0F2F2A] hover:bg-[#FAFCF9] lg:hidden transition"
              title="Open Navigation"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Search Bar */}
            <div className="relative w-48 sm:w-72 md:w-80">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search store data..."
                className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-lg pl-8 pr-10 py-1.5 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E] transition"
              />
              <span className="hidden sm:inline absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white border border-[#E6EFE2] px-1.5 py-0.5 rounded">
                ⌘ + F
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button 
              type="button" 
              className="p-1.5 rounded-lg border border-[#E6EFE2] text-slate-500 hover:text-[#0F2F2A] hover:bg-[#FAFCF9] transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-1.5 h-1.5 bg-[#D9A441] rounded-full absolute top-1.5 right-1.5"></span>
            </button>

            <button
              type="button"
              onClick={() => alert("Report exported.")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white text-xs font-bold transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <div className="h-5 w-px bg-[#E6EFE2] mx-0.5 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#2F6F4E] text-white flex items-center justify-center font-bold text-xs">
                AG
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-[#0F2F2A] leading-tight">Apex Gadgets</p>
                <p className="text-[10px] text-slate-400 leading-tight">Verified Seller</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content (Max-width 1600px with generous padding) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1600px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
