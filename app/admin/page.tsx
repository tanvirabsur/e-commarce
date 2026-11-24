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
  ArrowDownRight, 
  BarChart2, 
  Users, 
  PieChart, 
  Sliders, 
  ExternalLink,
  ChevronDown
} from "lucide-react";

export default function AdminDashboardPage() {
  const [timeframe, setTimeframe] = useState<"Monthly" | "Weekly" | "Yearly">("Monthly");
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(["app-1", "app-2"]);

  const toggleSelect = (id: string) => {
    setSelectedIntegrations(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const integrations = [
    {
      id: "app-1",
      name: "bKash Merchant Rail",
      logo: "BK",
      type: "Finance / MFS",
      rate: 85,
      profit: "৳ 65,000.00"
    },
    {
      id: "app-2",
      name: "Steadfast Courier API",
      logo: "SF",
      type: "Nationwide Logistics",
      rate: 72,
      profit: "৳ 72,050.50"
    },
    {
      id: "app-3",
      name: "Pathao Parcel Fleet",
      logo: "PT",
      type: "Same-Day Dispatch",
      rate: 45,
      profit: "৳ 43,225.00"
    },
    {
      id: "app-4",
      name: "Meta Catalog Sync",
      logo: "MC",
      type: "Social Commerce",
      rate: 90,
      profit: "৳ 58,400.00"
    }
  ];

  return (
    <div className="space-y-5">
      {/* 1. Page Title & Action Controls (Exact Nexus.io Header) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2F2A] tracking-tight">
            Dashboard
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
            <span>{timeframe}</span>
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
            onClick={() => alert("Summary report downloaded.")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E6EFE2] text-xs font-medium text-[#0F2F2A] hover:bg-[#FAFCF9] transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. Top Row: 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Page Views */}
        <div className="bg-white border border-[#E6EFE2] rounded-md p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Page Views</span>
            </div>
            <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-pointer" />
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#0F2F2A]">12,450</span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#2F6F4E] bg-[#F1F7ED] px-1.5 py-0.5 rounded border border-[#2F6F4E]/20">
              <span>15.8%</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 2: Total Revenue */}
        <div className="bg-white border border-[#E6EFE2] rounded-md p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Total Platform Revenue</span>
            </div>
            <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-pointer" />
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#0F2F2A]">৳ 363,950</span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <span>34.0%</span>
              <ArrowDownRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 3: Bounce Rate / Order Conversion */}
        <div className="bg-white border border-[#E6EFE2] rounded-md p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <Activity className="w-4 h-4 text-slate-400" />
              <span>Fulfillment Conversion</span>
            </div>
            <HelpCircle className="w-3.5 h-3.5 text-slate-300 cursor-pointer" />
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#0F2F2A]">86.5%</span>
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#2F6F4E] bg-[#F1F7ED] px-1.5 py-0.5 rounded border border-[#2F6F4E]/20">
              <span>24.2%</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* 3. Middle Row: Sales Overview Connected Stacks + Weekly Subscriber Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Sales Overview Flow Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E6EFE2] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header with Title and Filter/Sort Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#2F6F4E]" />
                <span className="text-sm font-bold text-[#0F2F2A]">Sales Overview</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button 
                  type="button"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E6EFE2] text-xs font-medium text-slate-600 hover:bg-[#FAFCF9] transition"
                >
                  <Filter className="w-3 h-3" />
                  <span>Filter</span>
                </button>
                <button 
                  type="button"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#E6EFE2] text-xs font-medium text-slate-600 hover:bg-[#FAFCF9] transition"
                >
                  <ArrowUpDown className="w-3 h-3" />
                  <span>Sort</span>
                </button>
                <button 
                  type="button"
                  className="p-1 rounded-md border border-[#E6EFE2] text-slate-400 hover:text-[#0F2F2A] transition"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Metric Value */}
            <div>
              <div className="text-2xl font-black text-[#0F2F2A]">৳ 92,575.10</div>
              <div className="text-[11px] text-[#2F6F4E] font-medium mt-0.5 flex items-center gap-1">
                <span>15.8% ↗</span>
                <span className="text-slate-400">+৳ 1,435.00 increased</span>
              </div>
            </div>
          </div>

          {/* Connected Flow Stack Diagram (Oct, Nov, Dec with connecting ribbons) */}
          <div className="relative pt-6 pb-2">
            <div className="grid grid-cols-3 gap-6 items-end h-48 relative">
              {/* Connecting SVG Flow Ribbons */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 300 150">
                {/* Bridge 1: Oct to Nov */}
                <path d="M 65 30 C 105 30, 115 50, 150 50 L 150 140 C 115 140, 105 140, 65 140 Z" fill="#2F6F4E" fillOpacity="0.04" />
                <path d="M 65 60 C 105 60, 115 75, 150 75" fill="none" stroke="#2F6F4E" strokeOpacity="0.15" strokeDasharray="2 2" />
                <path d="M 65 95 C 105 95, 115 105, 150 105" fill="none" stroke="#2F6F4E" strokeOpacity="0.15" strokeDasharray="2 2" />
                
                {/* Bridge 2: Nov to Dec */}
                <path d="M 150 50 C 185 50, 195 20, 235 20 L 235 140 C 195 140, 185 140, 150 140 Z" fill="#2F6F4E" fillOpacity="0.04" />
                <path d="M 150 75 C 185 75, 195 45, 235 45" fill="none" stroke="#2F6F4E" strokeOpacity="0.15" strokeDasharray="2 2" />
                <path d="M 150 105 C 185 105, 195 75, 235 75" fill="none" stroke="#2F6F4E" strokeOpacity="0.15" strokeDasharray="2 2" />
              </svg>

              {/* Column 1: Oct */}
              <div className="flex flex-col items-center gap-1 z-10">
                <span className="text-[11px] font-bold text-slate-600 mb-1">৳ 29,882</span>
                <div className="w-16 space-y-1">
                  <div className="h-4 bg-[#88B04B]/70 rounded-sm"></div>
                  <div className="h-6 bg-[#2F6F4E]/60 rounded-sm"></div>
                  <div className="h-8 bg-[#2F6F4E]/80 rounded-sm"></div>
                  <div className="h-10 bg-[#0F2F2A]/90 rounded-sm"></div>
                </div>
                <span className="text-xs font-semibold text-slate-400 mt-2">Oct</span>
              </div>

              {/* Column 2: Nov */}
              <div className="flex flex-col items-center gap-1 z-10">
                <span className="text-[11px] font-bold text-slate-600 mb-1">৳ 17,650</span>
                <div className="w-16 space-y-1">
                  <div className="h-3 bg-[#88B04B]/70 rounded-sm"></div>
                  <div className="h-4 bg-[#2F6F4E]/60 rounded-sm"></div>
                  <div className="h-5 bg-[#2F6F4E]/80 rounded-sm"></div>
                  <div className="h-7 bg-[#0F2F2A]/90 rounded-sm"></div>
                </div>
                <span className="text-xs font-semibold text-slate-400 mt-2">Nov</span>
              </div>

              {/* Column 3: Dec */}
              <div className="flex flex-col items-center gap-1 z-10">
                <span className="text-[11px] font-bold text-slate-600 mb-1">৳ 40,056</span>
                <div className="w-16 space-y-1">
                  <div className="h-4 bg-[#D9A441]/80 rounded-sm"></div>
                  <div className="h-5 bg-[#88B04B]/80 rounded-sm"></div>
                  <div className="h-6 bg-[#2F6F4E]/60 rounded-sm"></div>
                  <div className="h-8 bg-[#2F6F4E]/80 rounded-sm"></div>
                  <div className="h-12 bg-[#0F2F2A] rounded-sm"></div>
                </div>
                <span className="text-xs font-semibold text-slate-400 mt-2">Dec</span>
              </div>
            </div>

            {/* Bottom Legend */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-4 border-t border-[#E6EFE2] mt-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-[#0F2F2A]"></span>
                <span>Gadgets</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-[#2F6F4E]"></span>
                <span>Mulberry Silk</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-[#88B04B]"></span>
                <span>Organic Honey</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-[#D9A441]"></span>
                <span>Sundarbans</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-slate-300"></span>
                <span>Other</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Total Orders Weekly Bar Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E6EFE2] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header */}
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

            {/* Metric Value */}
            <div className="mt-1">
              <div className="text-2xl font-bold text-[#0F2F2A]">24,473</div>
              <div className="text-[11px] text-[#2F6F4E] font-medium mt-0.5">
                8.3% ↗ +749 increased
              </div>
            </div>
          </div>

          {/* 7-Day Vertical Bar Chart with Tuesday Peak */}
          <div className="pt-6">
            <div className="h-40 flex items-end justify-between gap-2 px-1">
              {/* Sun */}
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-12 transition"></div>
                <span className="text-[10px] text-slate-400">Sun</span>
              </div>

              {/* Mon */}
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-20 transition"></div>
                <span className="text-[10px] text-slate-400">Mon</span>
              </div>

              {/* Tue (Highlighted Peak with Callout) */}
              <div className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#0F2F2A]">3,874</span>
                <div className="w-full bg-[#2F6F4E] rounded-md h-28 shadow-xs"></div>
                <span className="text-[10px] font-bold text-[#0F2F2A]">Tue</span>
              </div>

              {/* Wed */}
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-24 transition"></div>
                <span className="text-[10px] text-slate-400">Wed</span>
              </div>

              {/* Thu */}
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-16 transition"></div>
                <span className="text-[10px] text-slate-400">Thu</span>
              </div>

              {/* Fri */}
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-14 transition"></div>
                <span className="text-[10px] text-slate-400">Fri</span>
              </div>

              {/* Sat */}
              <div className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full bg-[#F1F7ED] hover:bg-[#2F6F4E]/30 rounded-md h-26 transition"></div>
                <span className="text-[10px] text-slate-400">Sat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Sales Distribution Arc Gauge + Integrations & Settlements Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Sales Distribution Semi-Donut Gauge (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E6EFE2] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#0F2F2A]">
                <PieChart className="w-4 h-4 text-slate-400" />
                <span>Sales Distribution</span>
              </div>
              <button 
                type="button"
                className="flex items-center gap-1 px-2 py-1 rounded-md border border-[#E6EFE2] text-[11px] font-medium text-slate-600 hover:bg-[#FAFCF9]"
              >
                <span>Monthly</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            {/* Channel Metrics Row */}
            <div className="grid grid-cols-3 gap-2 text-xs pt-2">
              <div className="border-l-2 border-[#2F6F4E] pl-2">
                <span className="text-[10px] text-slate-400 block">Storefront</span>
                <span className="font-bold text-[#0F2F2A]">৳ 37,482</span>
              </div>
              <div className="border-l-2 border-[#88B04B] pl-2">
                <span className="text-[10px] text-slate-400 block">Social App</span>
                <span className="font-bold text-[#0F2F2A]">৳ 24,160</span>
              </div>
              <div className="border-l-2 border-[#D9A441] pl-2">
                <span className="text-[10px] text-slate-400 block">Direct Order</span>
                <span className="font-bold text-[#0F2F2A]">৳ 21,342</span>
              </div>
            </div>
          </div>

          {/* Semi-Donut Arc Radial Gauge */}
          <div className="relative flex flex-col items-center justify-center pt-4">
            <svg viewBox="0 0 200 110" className="w-56 h-32 overflow-visible">
              {/* Background Arch Track */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#F1F7ED"
                strokeWidth="22"
                strokeLinecap="round"
              />
              {/* Secondary Segment: Leaf Green */}
              <path
                d="M 20 100 A 80 80 0 0 1 150 40"
                fill="none"
                stroke="#88B04B"
                strokeWidth="22"
                strokeLinecap="round"
              />
              {/* Primary Segment: Spruce Green */}
              <path
                d="M 20 100 A 80 80 0 0 1 100 20"
                fill="none"
                stroke="#2F6F4E"
                strokeWidth="22"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center -mt-6">
              <div className="text-xl font-bold text-[#0F2F2A]">৳ 82,984</div>
              <span className="text-[10px] text-slate-400">Total Channel Inflow</span>
            </div>
          </div>
        </div>

        {/* Right Column: List of Integrations & Courier Settlements (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E6EFE2] rounded-md p-6 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-1.5 text-sm font-bold text-[#0F2F2A]">
                <Sliders className="w-4 h-4 text-slate-400" />
                <span>List of Integrations & Settlements</span>
              </div>
              <button 
                type="button"
                className="text-xs font-semibold text-[#2F6F4E] hover:underline"
              >
                See All
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E6EFE2] text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 px-2 w-8">
                      <input 
                        type="checkbox"
                        checked={selectedIntegrations.length === integrations.length}
                        onChange={() => {
                          if (selectedIntegrations.length === integrations.length) {
                            setSelectedIntegrations([]);
                          } else {
                            setSelectedIntegrations(integrations.map(i => i.id));
                          }
                        }}
                        className="rounded border-[#E6EFE2] text-[#2F6F4E] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 px-2">Application</th>
                    <th className="py-2.5 px-2">Type</th>
                    <th className="py-2.5 px-2">Rate</th>
                    <th className="py-2.5 px-2 text-right">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6EFE2]">
                  {integrations.map((item) => {
                    const isSelected = selectedIntegrations.includes(item.id);

                    return (
                      <tr key={item.id} className="hover:bg-[#FAFCF9] transition">
                        <td className="py-3 px-2">
                          <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(item.id)}
                            className="rounded border-[#E6EFE2] text-[#2F6F4E] focus:ring-0 cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-[#F1F7ED] border border-[#2F6F4E]/20 text-[#2F6F4E] font-bold text-[10px] flex items-center justify-center shrink-0">
                              {item.logo}
                            </div>
                            <span className="font-semibold text-[#0F2F2A]">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-slate-500 text-[11px]">
                          {item.type}
                        </td>
                        <td className="py-3 px-2 w-28">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-[#F1F7ED] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#2F6F4E] rounded-full" 
                                style={{ width: `${item.rate}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{item.rate}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right font-semibold text-[#0F2F2A]">
                          {item.profit}
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
