"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Eye, 
  FileText, 
  Activity, 
  HelpCircle, 
  Calendar, 
  Filter, 
  Download, 
  ArrowUpDown, 
  MoreHorizontal, 
  ArrowUpRight, 
  BarChart2, 
  Users, 
  PieChart, 
  Sliders, 
  ChevronDown,
  Truck,
  Plus
} from "lucide-react";

export default function SellerDashboardPage() {
  const [selectedCourierIds, setSelectedCourierIds] = useState<string[]>(["c-1", "c-2"]);

  const toggleSelectCourier = (id: string) => {
    setSelectedCourierIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const courierBatches = [
    {
      id: "c-1",
      carrier: "Steadfast Courier Ltd.",
      logo: "SF",
      suborders: "18 Orders Dispatched",
      successRate: 94,
      collected: "৳ 34,200.00"
    },
    {
      id: "c-2",
      carrier: "Pathao Express Fleet",
      logo: "PT",
      suborders: "12 Orders in Transit",
      successRate: 88,
      collected: "৳ 22,800.00"
    },
    {
      id: "c-3",
      carrier: "RedX Logistics BD",
      logo: "RX",
      suborders: "6 Orders Out for Delivery",
      successRate: 75,
      collected: "৳ 11,400.00"
    },
    {
      id: "c-4",
      carrier: "Paperfly Hub",
      logo: "PF",
      suborders: "4 Orders Delivered",
      successRate: 98,
      collected: "৳ 7,600.00"
    }
  ];

  return (
    <div className="space-y-5">
      {/* 1. Header with Title & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2F2A] tracking-tight">
            Store Dashboard
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E6EFE2] text-xs font-medium text-[#0F2F2A] hover:bg-[#FAFCF9] transition shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Oct 18 - Nov 18</span>
          </button>

          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E6EFE2] text-xs font-medium text-[#0F2F2A] hover:bg-[#FAFCF9] transition shadow-xs"
          >
            <span>Monthly</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E6EFE2] text-xs font-medium text-[#0F2F2A] hover:bg-[#FAFCF9] transition shadow-xs"
          >
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter</span>
          </button>

          <button 
            type="button"
            onClick={() => alert("Merchant statement exported.")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E6EFE2] text-xs font-medium text-[#0F2F2A] hover:bg-[#FAFCF9] transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. Top Row: 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Store Impressions */}
        <div className="bg-white border border-[#E6EFE2] rounded-md p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Store Views & Impressions</span>
            </div>
            <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-pointer" />
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#0F2F2A]">18,920</span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#2F6F4E] bg-[#F1F7ED] px-1.5 py-0.5 rounded border border-[#2F6F4E]/20">
              <span>12.4%</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 2: Net Merchant Sales */}
        <div className="bg-white border border-[#E6EFE2] rounded-md p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Net Store Sales</span>
            </div>
            <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-pointer" />
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#0F2F2A]">৳ 184,200</span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#2F6F4E] bg-[#F1F7ED] px-1.5 py-0.5 rounded border border-[#2F6F4E]/20">
              <span>18.5%</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 3: Delivery Rate */}
        <div className="bg-white border border-[#E6EFE2] rounded-md p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <Activity className="w-4 h-4 text-slate-400" />
              <span>Delivery Success Rate</span>
            </div>
            <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-pointer" />
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#0F2F2A]">96.8%</span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#2F6F4E] bg-[#F1F7ED] px-1.5 py-0.5 rounded border border-[#2F6F4E]/20">
              <span>4.2%</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* 3. Middle Row: Sales Overview Stacks + Weekly Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Sales Overview Flow Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E6EFE2] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#2F6F4E]" />
                <span className="text-sm font-bold text-[#0F2F2A]">Sales Overview</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button 
                  type="button"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E6EFE2] text-xs font-medium text-slate-600 hover:bg-[#FAFCF9]"
                >
                  <Filter className="w-3 h-3" />
                  <span>Filter</span>
                </button>
                <button 
                  type="button"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E6EFE2] text-xs font-medium text-slate-600 hover:bg-[#FAFCF9]"
                >
                  <ArrowUpDown className="w-3 h-3" />
                  <span>Sort</span>
                </button>
                <button 
                  type="button"
                  className="p-1 rounded-md border border-[#E6EFE2] text-slate-400 hover:text-[#0F2F2A]"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="text-2xl font-black text-[#0F2F2A]">৳ 64,820.00</div>
              <div className="text-[11px] text-[#2F6F4E] font-medium mt-0.5 flex items-center gap-1">
                <span>21.4% ↗</span>
                <span className="text-slate-400">+৳ 8,450.00 increased</span>
              </div>
            </div>
          </div>

          {/* Connected Flow Diagram */}
          <div className="relative pt-6 pb-2">
            <div className="grid grid-cols-3 gap-6 items-end h-48 relative">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 300 150">
                <path d="M 65 35 C 105 35, 115 55, 150 55 L 150 140 C 115 140, 105 140, 65 140 Z" fill="#2F6F4E" fillOpacity="0.04" />
                <path d="M 65 65 C 105 65, 115 80, 150 80" fill="none" stroke="#2F6F4E" strokeOpacity="0.15" strokeDasharray="2 2" />
                <path d="M 65 100 C 105 100, 115 110, 150 110" fill="none" stroke="#2F6F4E" strokeOpacity="0.15" strokeDasharray="2 2" />
                
                <path d="M 150 55 C 185 55, 195 25, 235 25 L 235 140 C 195 140, 185 140, 150 140 Z" fill="#2F6F4E" fillOpacity="0.04" />
                <path d="M 150 80 C 185 80, 195 50, 235 50" fill="none" stroke="#2F6F4E" strokeOpacity="0.15" strokeDasharray="2 2" />
                <path d="M 150 110 C 185 110, 195 80, 235 80" fill="none" stroke="#2F6F4E" strokeOpacity="0.15" strokeDasharray="2 2" />
              </svg>

              {/* Oct */}
              <div className="flex flex-col items-center gap-1 z-10">
                <span className="text-[11px] font-bold text-slate-600 mb-1">৳ 18,200</span>
                <div className="w-16 space-y-1">
                  <div className="h-4 bg-[#88B04B]/70 rounded-sm"></div>
                  <div className="h-6 bg-[#2F6F4E]/60 rounded-sm"></div>
                  <div className="h-7 bg-[#0F2F2A]/90 rounded-sm"></div>
                </div>
                <span className="text-xs font-semibold text-slate-400 mt-2">Oct</span>
              </div>

              {/* Nov */}
              <div className="flex flex-col items-center gap-1 z-10">
                <span className="text-[11px] font-bold text-slate-600 mb-1">৳ 14,500</span>
                <div className="w-16 space-y-1">
                  <div className="h-3 bg-[#88B04B]/70 rounded-sm"></div>
                  <div className="h-4 bg-[#2F6F4E]/60 rounded-sm"></div>
                  <div className="h-6 bg-[#0F2F2A]/90 rounded-sm"></div>
                </div>
                <span className="text-xs font-semibold text-slate-400 mt-2">Nov</span>
              </div>

              {/* Dec */}
              <div className="flex flex-col items-center gap-1 z-10">
                <span className="text-[11px] font-bold text-slate-600 mb-1">৳ 32,120</span>
                <div className="w-16 space-y-1">
                  <div className="h-4 bg-[#D9A441]/80 rounded-sm"></div>
                  <div className="h-5 bg-[#88B04B]/80 rounded-sm"></div>
                  <div className="h-7 bg-[#2F6F4E]/80 rounded-sm"></div>
                  <div className="h-10 bg-[#0F2F2A] rounded-sm"></div>
                </div>
                <span className="text-xs font-semibold text-slate-400 mt-2">Dec</span>
              </div>
            </div>

            {/* Bottom Legend */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-4 border-t border-[#E6EFE2] mt-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-[#0F2F2A]"></span>
                <span>Smartwatches</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-[#2F6F4E]"></span>
                <span>ANC Earbuds</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-[#88B04B]"></span>
                <span>Accessories</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Weekly Order Count (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E6EFE2] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#0F2F2A]">
                <Users className="w-4 h-4 text-slate-400" />
                <span>Weekly Orders</span>
              </div>
              <button 
                type="button"
                className="flex items-center gap-1 px-2 py-1 rounded-md border border-[#E6EFE2] text-[11px] font-medium text-slate-600 hover:bg-[#FAFCF9]"
              >
                <span>Weekly</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            <div className="mt-1">
              <div className="text-2xl font-bold text-[#0F2F2A]">482</div>
              <div className="text-[11px] text-[#2F6F4E] font-medium mt-0.5">
                14.2% ↗ +32 from last week
              </div>
            </div>
          </div>

          {/* 7-Day Vertical Bar Chart with Tuesday Peak */}
          <div className="pt-6">
            <div className="h-40 flex items-end justify-between gap-2 px-1">
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-12 transition"></div>
                <span className="text-[10px] text-slate-400">Sun</span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-18 transition"></div>
                <span className="text-[10px] text-slate-400">Mon</span>
              </div>

              {/* Peak Tuesday */}
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#0F2F2A]">84</span>
                <div className="w-full bg-[#2F6F4E] rounded-md h-28 shadow-xs"></div>
                <span className="text-[10px] font-bold text-[#0F2F2A]">Tue</span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-22 transition"></div>
                <span className="text-[10px] text-slate-400">Wed</span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-16 transition"></div>
                <span className="text-[10px] text-slate-400">Thu</span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-14 transition"></div>
                <span className="text-[10px] text-slate-400">Fri</span>
              </div>

              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-24 transition"></div>
                <span className="text-[10px] text-slate-400">Sat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Channel Arc Gauge + Courier Dispatch Batches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Semi-Donut (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E6EFE2] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#0F2F2A]">
                <PieChart className="w-4 h-4 text-slate-400" />
                <span>Channel Breakdown</span>
              </div>
              <button 
                type="button"
                className="flex items-center gap-1 px-2 py-1 rounded-md border border-[#E6EFE2] text-[11px] font-medium text-slate-600 hover:bg-[#FAFCF9]"
              >
                <span>Monthly</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-2">
              <div className="border-l-2 border-[#2F6F4E] pl-2">
                <span className="text-[10px] text-slate-400 block">Elyqor Web</span>
                <span className="font-bold text-[#0F2F2A]">৳ 38,400</span>
              </div>
              <div className="border-l-2 border-[#88B04B] pl-2">
                <span className="text-[10px] text-slate-400 block">Facebook</span>
                <span className="font-bold text-[#0F2F2A]">৳ 18,220</span>
              </div>
              <div className="border-l-2 border-[#D9A441] pl-2">
                <span className="text-[10px] text-slate-400 block">Direct COD</span>
                <span className="font-bold text-[#0F2F2A]">৳ 8,200</span>
              </div>
            </div>
          </div>

          {/* Radial Semi-Donut */}
          <div className="relative flex flex-col items-center justify-center pt-4">
            <svg viewBox="0 0 200 110" className="w-56 h-32 overflow-visible">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#F1F7ED"
                strokeWidth="22"
                strokeLinecap="round"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 150 40"
                fill="none"
                stroke="#88B04B"
                strokeWidth="22"
                strokeLinecap="round"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 100 20"
                fill="none"
                stroke="#2F6F4E"
                strokeWidth="22"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center -mt-6">
              <div className="text-xl font-bold text-[#0F2F2A]">৳ 64,820</div>
              <span className="text-[10px] text-slate-400">Total Store Volume</span>
            </div>
          </div>
        </div>

        {/* Right Column: Courier Handover Batches (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E6EFE2] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#0F2F2A]">
                <Truck className="w-4 h-4 text-slate-400" />
                <span>Courier Dispatch & COD Batches</span>
              </div>
              <Link 
                href="/seller/orders"
                className="text-xs font-semibold text-[#2F6F4E] hover:underline"
              >
                Manage Queue
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E6EFE2] text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 px-2 w-8">
                      <input 
                        type="checkbox"
                        checked={selectedCourierIds.length === courierBatches.length}
                        onChange={() => {
                          if (selectedCourierIds.length === courierBatches.length) {
                            setSelectedCourierIds([]);
                          } else {
                            setSelectedCourierIds(courierBatches.map(c => c.id));
                          }
                        }}
                        className="rounded border-[#E6EFE2] text-[#2F6F4E] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 px-2">Carrier</th>
                    <th className="py-2.5 px-2">Dispatched Batch</th>
                    <th className="py-2.5 px-2">Delivery Rate</th>
                    <th className="py-2.5 px-2 text-right">Collected COD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6EFE2]">
                  {courierBatches.map((item) => {
                    const isSelected = selectedCourierIds.includes(item.id);

                    return (
                      <tr key={item.id} className="hover:bg-[#FAFCF9] transition">
                        <td className="py-3 px-2">
                          <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectCourier(item.id)}
                            className="rounded border-[#E6EFE2] text-[#2F6F4E] focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-[#F1F7ED] border border-[#2F6F4E]/20 text-[#2F6F4E] font-bold text-[10px] flex items-center justify-center shrink-0">
                              {item.logo}
                            </div>
                            <span className="font-semibold text-[#0F2F2A]">{item.carrier}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-slate-500 text-[11px]">
                          {item.suborders}
                        </td>
                        <td className="py-3 px-2 w-28">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-[#F1F7ED] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#2F6F4E] rounded-full" 
                                style={{ width: `${item.successRate}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{item.successRate}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right font-semibold text-[#0F2F2A]">
                          {item.collected}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
