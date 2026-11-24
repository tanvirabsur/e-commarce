"use client";

import { useState } from "react";
import { 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Search, 
  Clock, 
  Package, 
  X,
  ChevronRight
} from "lucide-react";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { SellerOrder } from "@/lib/types";

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<SellerOrder[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<SellerOrder | null>(null);
  const [courierProvider, setCourierProvider] = useState<"Steadfast" | "Pathao" | "RedX" | "Paperfly">("Steadfast");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "shipped" | "delivered">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !trackingNumber.trim()) return;

    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? {
      ...o,
      fulfillmentStatus: "shipped",
      courierProvider,
      trackingNumber: trackingNumber.trim(),
      dispatchDate: new Date().toISOString().split("T")[0]
    } : o));

    setSuccessNotice(`Consignment created! Order ${selectedOrder.parentOrderNumber} handed over to ${courierProvider} (Tracking: ${trackingNumber.trim()}).`);
    setSelectedOrder(null);
    setTrackingNumber("");
    setTimeout(() => setSuccessNotice(null), 5000);
  };

  const filteredOrders = orders.filter(order => {
    const matchesTab = 
      activeTab === "all" ? true :
      activeTab === "pending" ? (order.fulfillmentStatus === "processing" || order.fulfillmentStatus === "confirmed" || order.fulfillmentStatus === "pending_confirmation" || order.fulfillmentStatus === "packed") :
      activeTab === "shipped" ? (order.fulfillmentStatus === "shipped" || order.fulfillmentStatus === "out_for_delivery") :
      order.fulfillmentStatus === "delivered";

    const matchesQuery = 
      order.parentOrderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (order.trackingNumber && order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesQuery;
  });

  const pendingCount = orders.filter(o => o.fulfillmentStatus === "processing" || o.fulfillmentStatus === "confirmed" || o.fulfillmentStatus === "pending_confirmation" || o.fulfillmentStatus === "packed").length;
  const shippedCount = orders.filter(o => o.fulfillmentStatus === "shipped").length;
  const deliveredCount = orders.filter(o => o.fulfillmentStatus === "delivered").length;

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-md border border-[#E6EFE2] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-md bg-[#F1F7ED] text-[#2F6F4E] border border-[#2F6F4E]/20">
              <Truck className="w-4 h-4" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-[#0F2F2A] tracking-tight">
                Order Fulfillment & Courier Dispatch
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">
                Manage merchant-level orders, assign carrier tracking, and monitor Cash on Delivery settlement.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Courier Badges */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Integrated Carriers:</span>
          <span className="px-2 py-0.5 rounded bg-[#F1F7ED] text-[#2F6F4E] font-medium text-[11px] border border-[#2F6F4E]/20">
            Steadfast
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F1F7ED] text-[#2F6F4E] font-medium text-[11px] border border-[#2F6F4E]/20">
            Pathao
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F1F7ED] text-[#2F6F4E] font-medium text-[11px] border border-[#2F6F4E]/20">
            RedX
          </span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successNotice && (
        <div className="p-3.5 rounded-md bg-[#F1F7ED] border border-[#2F6F4E]/40 text-[#2F6F4E] text-xs font-semibold flex items-center justify-between shadow-2xs animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2F6F4E]" />
            <span>{successNotice}</span>
          </div>
          <button 
            onClick={() => setSuccessNotice(null)}
            className="text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Status Counters (Clean 6px radius cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-md border border-[#E6EFE2] shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Total Suborders</span>
          <div className="text-2xl font-bold text-[#0F2F2A] mt-1">{orders.length}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Allocated to your store</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-[#E6EFE2] shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Awaiting Dispatch</span>
          <div className="text-2xl font-bold text-[#D9A441] mt-1">{pendingCount}</div>
          <p className="text-[11px] text-[#D9A441] font-medium mt-0.5">Ready for packaging</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-[#E6EFE2] shadow-2xs">
          <span className="text-xs font-medium text-slate-500">In Transit (Courier)</span>
          <div className="text-2xl font-bold text-[#2F6F4E] mt-1">{shippedCount}</div>
          <p className="text-[11px] text-[#2F6F4E] font-medium mt-0.5">En route to customers</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-[#E6EFE2] shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Delivered & Settled</span>
          <div className="text-2xl font-bold text-[#2F6F4E] mt-1">{deliveredCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Credited to ledger</p>
        </div>
      </div>

      {/* Unified Orders Data Table Card */}
      <div className="bg-white rounded-md border border-[#E6EFE2] shadow-2xs overflow-hidden">
        {/* Controls Bar: Tabs & Search */}
        <div className="p-4 border-b border-[#E6EFE2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAFCF9]">
          {/* Crisp Segmented Tabs */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-200/60 rounded border border-slate-200 overflow-x-auto scrollbar-none whitespace-nowrap">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded text-xs transition ${
                activeTab === "all"
                  ? "bg-white text-[#0F2F2A] font-bold shadow-2xs"
                  : "text-slate-600 hover:text-black font-medium"
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-3 py-1 rounded text-xs transition ${
                activeTab === "pending"
                  ? "bg-white text-[#0F2F2A] font-bold shadow-2xs"
                  : "text-slate-600 hover:text-black font-medium"
              }`}
            >
              Awaiting Dispatch ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab("shipped")}
              className={`px-3 py-1 rounded text-xs transition ${
                activeTab === "shipped"
                  ? "bg-white text-[#0F2F2A] font-bold shadow-2xs"
                  : "text-slate-600 hover:text-black font-medium"
              }`}
            >
              Shipped ({shippedCount})
            </button>
            <button
              onClick={() => setActiveTab("delivered")}
              className={`px-3 py-1 rounded text-xs transition ${
                activeTab === "delivered"
                  ? "bg-white text-[#0F2F2A] font-bold shadow-2xs"
                  : "text-slate-600 hover:text-black font-medium"
              }`}
            >
              Delivered ({deliveredCount})
            </button>
          </div>

          {/* Clean Input with 4px/6px radius (Not Pill / Not Bubble) */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by order #, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E6EFE2] rounded pl-8 pr-3 py-1.5 text-xs text-[#0F2F2A] placeholder:text-slate-400 focus:outline-none focus:border-[#2F6F4E] transition shadow-2xs"
            />
          </div>
        </div>

        {/* Tabular Order Rows (Unified Table, No Floating Rounded Bubbles) */}
        <div className="overflow-x-auto">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              No orders found matching your active filter.
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E6EFE2] bg-white text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                  <th className="py-3 px-4">Order # & Payment</th>
                  <th className="py-3 px-4">Customer & Delivery</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Fulfillment</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6EFE2] bg-white">
                {filteredOrders.map(order => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-[#FAFCF9] transition-colors"
                  >
                    {/* Column 1: Order ID & Payment */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="space-y-1">
                        <span className="font-mono font-bold text-[#0F2F2A] text-xs block">
                          {order.parentOrderNumber}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="bg-[#F1F7ED] text-[#2F6F4E] px-1.5 py-0.5 rounded font-mono font-semibold text-[10px] border border-[#2F6F4E]/20">
                            {order.paymentMethod.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            ({order.paymentStatus})
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Customer & Delivery Address */}
                    <td className="py-3.5 px-4 align-top max-w-xs">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-[#0F2F2A] block">
                          {order.customerName}
                        </span>
                        <div className="text-slate-500 text-[11px] flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{order.customerPhone}</span>
                        </div>
                        <div className="text-slate-500 text-[11px] flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{order.deliveryAddress}, {order.city}</span>
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Items */}
                    <td className="py-3.5 px-4 align-top">
                      <div className="space-y-0.5">
                        <span className="font-medium text-[#0F2F2A] line-clamp-1">
                          {order.items[0]?.productName}
                        </span>
                        <span className="text-slate-500 text-[11px] block">
                          Qty: {order.items[0]?.quantity}
                        </span>
                      </div>
                    </td>

                    {/* Column 4: Amount & Payable */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#0F2F2A] block">
                          ৳ {order.subtotal.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#2F6F4E] font-semibold block">
                          Payable: ৳ {order.sellerPayable.toLocaleString()}
                        </span>
                      </div>
                    </td>

                    {/* Column 5: Status Badge & Courier Tracking */}
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide border ${
                          order.fulfillmentStatus === "delivered" ? "bg-[#F1F7ED] text-[#2F6F4E] border-[#2F6F4E]/30" :
                          order.fulfillmentStatus === "shipped" ? "bg-[#FAF3E0] text-[#D9A441] border-[#D9A441]/40" :
                          "bg-slate-100 text-slate-700 border-slate-200"
                        }`}>
                          {order.fulfillmentStatus.toUpperCase()}
                        </span>
                        {order.trackingNumber && (
                          <div className="text-[10px] text-slate-500 font-mono">
                            {order.courierProvider}: {order.trackingNumber}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Column 6: Action Button */}
                    <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                      {order.fulfillmentStatus !== "delivered" && order.fulfillmentStatus !== "shipped" ? (
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setTrackingNumber("");
                          }}
                          className="px-3 py-1.5 rounded bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white font-medium text-xs transition shadow-2xs btn-press-effect inline-flex items-center gap-1.5"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Handover to Courier</span>
                        </button>
                      ) : (
                        <div className="text-[#2F6F4E] font-medium text-xs inline-flex items-center gap-1.5 bg-[#F1F7ED] px-2.5 py-1 rounded border border-[#2F6F4E]/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{order.fulfillmentStatus === "delivered" ? "Delivered" : "Dispatched"}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Courier Handover Modal (Clean 6px radius) */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-[#0F2F2A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <form onSubmit={handleDispatch} className="bg-white border border-[#E6EFE2] p-5 rounded-md max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6EFE2]">
              <div className="flex items-center gap-2 text-[#2F6F4E] font-bold text-sm">
                <Truck className="w-4 h-4" />
                <span>Courier Handover & Tracking</span>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Provide consignment details for suborder <span className="text-[#0F2F2A] font-mono font-bold">{selectedOrder.parentOrderNumber}</span>.
            </p>

            <div className="p-3 rounded bg-[#FAFCF9] border border-[#E6EFE2] text-xs space-y-1">
              <div className="font-semibold text-[#0F2F2A]">{selectedOrder.customerName}</div>
              <div className="text-slate-500 text-[11px]">{selectedOrder.deliveryAddress}, {selectedOrder.city}</div>
              <div className="text-[#2F6F4E] font-bold pt-0.5">Collectible: ৳ {selectedOrder.subtotal.toLocaleString()} (COD)</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F2F2A] mb-1.5">Select Courier Provider *</label>
              <div className="grid grid-cols-2 gap-2">
                {(["Steadfast", "Pathao", "RedX", "Paperfly"] as const).map(carrier => (
                  <button
                    key={carrier}
                    type="button"
                    onClick={() => setCourierProvider(carrier)}
                    className={`py-1.5 px-3 rounded text-xs font-medium border transition text-left ${
                      courierProvider === carrier
                        ? "bg-[#F1F7ED] border-[#2F6F4E] text-[#2F6F4E] font-bold"
                        : "bg-[#FAFCF9] border-[#E6EFE2] text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {carrier} Courier
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F2F2A] mb-1">
                Carrier Consignment / Tracking ID *
              </label>
              <input
                type="text"
                required
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. SF-982104-BD or PTH-48291"
                className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded p-2 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E] font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Issued by your carrier dashboard after booking the pickup.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E6EFE2]">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-3.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white font-semibold text-xs transition shadow-2xs btn-press-effect"
              >
                Confirm Dispatch
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
