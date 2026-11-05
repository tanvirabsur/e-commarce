"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Search, 
  ShieldCheck, 
  Users, 
  Wallet, 
  Sparkles, 
  Bell, 
  Download, 
  HelpCircle, 
  Settings, 
  ChevronsUpDown, 
  ShoppingBag, 
  TrendingUp, 
  ArrowUpRight, 
  SlidersHorizontal, 
  Layers, 
  Store, 
  PanelLeftClose, 
  CreditCard, 
  LineChart, 
  Bot, 
  Lock, 
  Gift, 
  Plus,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isNavActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="p-4 space-y-5 flex-1 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E6EFE2]/80">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2F6F4E] flex items-center justify-center text-white font-black text-sm shadow-xs">
              E
            </div>
            <span className="font-extrabold text-base tracking-tight text-[#0F2F2A]">Elyqor</span>
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

        {/* Section 1: GENERAL */}
        <div className="space-y-0.5">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            General
          </div>
          
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              isNavActive("/admin")
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0 text-[#2F6F4E]" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/finance"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              isNavActive("/admin/finance")
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span>Payment & Ledger</span>
          </Link>

          <Link
            href="/admin/sellers"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              isNavActive("/admin/sellers")
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Merchants</span>
          </Link>

          <Link
            href="/admin/moderation"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              isNavActive("/admin/moderation")
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Moderation</span>
            </div>
            <span className="bg-[#D9A441] text-[#0F2F2A] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              2
            </span>
          </Link>
        </div>

        {/* Section 2: TOOLS */}
        <div className="space-y-0.5 pt-1">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Tools
          </div>

          <Link
            href="/seller/products"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A] transition"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Catalog Products</span>
          </Link>

          <Link
            href="/admin/seo"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
              isNavActive("/admin/seo")
                ? "bg-[#F1F7ED] text-[#2F6F4E] font-bold shadow-xs"
                : "text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A]"
            }`}
          >
            <LineChart className="w-4 h-4 shrink-0" />
            <span>SEO Analytics</span>
          </Link>

          <div className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A] transition cursor-pointer">
            <div className="flex items-center gap-2.5">
              <Bot className="w-4 h-4 shrink-0" />
              <span>AI Moderation</span>
            </div>
            <span className="bg-[#F1F7ED] text-[#2F6F4E] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#2F6F4E]/20">
              BETA
            </span>
          </div>
        </div>

        {/* Section 3: SUPPORT */}
        <div className="space-y-0.5 pt-1">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Support
          </div>

          <button 
            type="button" 
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A] transition w-full text-left"
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </button>

          <button 
            type="button" 
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A] transition w-full text-left"
          >
            <Lock className="w-4 h-4 shrink-0" />
            <span>Security</span>
          </button>

          <button 
            type="button" 
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-[#FAFCF9] hover:text-[#0F2F2A] transition w-full text-left"
          >
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>Help Center</span>
          </button>
        </div>
      </div>

      {/* Sidebar Footer Team Box */}
      <div className="p-3 border-t border-[#E6EFE2] space-y-2 bg-[#FAFCF9] rounded-lg">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E6EFE2] shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-md bg-[#2F6F4E] text-white flex items-center justify-center font-bold text-xs shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-[#0F2F2A] truncate">Admin Console</p>
              <p className="text-[10px] text-slate-400 truncate">Super Admin</p>
            </div>
          </div>
          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-1">
          <span>© 2026 Elyqor Inc.</span>
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
                placeholder="Search console..."
                className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-lg pl-8 pr-10 py-1.5 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E] transition"
              />
              <span className="hidden sm:inline absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white border border-[#E6EFE2] px-1.5 py-0.5 rounded">
                ⌘ + F
              </span>
            </div>
          </div>

          {/* Top Right Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button 
              type="button" 
              className="p-1.5 rounded-lg border border-[#E6EFE2] text-slate-500 hover:text-[#0F2F2A] hover:bg-[#FAFCF9] transition hidden sm:flex"
              title="Rewards"
            >
              <Gift className="w-4 h-4" />
            </button>

            <button 
              type="button" 
              className="p-1.5 rounded-lg border border-[#E6EFE2] text-slate-500 hover:text-[#0F2F2A] hover:bg-[#FAFCF9] transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-1.5 h-1.5 bg-[#D9A441] rounded-full absolute top-1.5 right-1.5"></span>
            </button>

            <div className="h-5 w-px bg-[#E6EFE2] mx-0.5 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#2F6F4E] text-white flex items-center justify-center font-bold text-xs">
                EA
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-[#0F2F2A] leading-tight">Young Alaska</p>
                <p className="text-[10px] text-slate-400 leading-tight">Business Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace (Increased width up to 1600px with generous padding) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-10 max-w-[1600px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
