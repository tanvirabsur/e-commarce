"use client";

import { useState } from "react";
import { 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Search, 
  Filter, 
  Clock, 
  Package, 
  ExternalLink,
  X
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
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-lg border border-[#E6EFE2] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-[#F1F7ED] text-[#2F6F4E]">
              <Truck className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-[#0F2F2A] tracking-tight">
                Order Fulfillment & Courier Dispatch
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                Per SRS 10.4: Manage merchant-level split orders, assign carrier tracking, and monitor Cash on Delivery delivery progress.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Courier Badges */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Integrated Carriers:</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#F1F7ED] text-[#2F6F4E] font-bold text-xs border border-[#2F6F4E]/20">
            Steadfast
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#F1F7ED] text-[#2F6F4E] font-bold text-xs border border-[#2F6F4E]/20">
            Pathao
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#F1F7ED] text-[#2F6F4E] font-bold text-xs border border-[#2F6F4E]/20">
            RedX
          </span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successNotice && (
        <div className="p-4 rounded-xl bg-[#F1F7ED] border border-[#2F6F4E]/40 text-[#2F6F4E] text-xs font-bold flex items-center justify-between shadow-xs animate-fade-in">
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

      {/* Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-5 rounded-lg border border-[#E6EFE2] shadow-xs">
          <span className="text-xs font-bold text-slate-500">Total Suborders</span>
          <div className="text-2xl font-black text-[#0F2F2A] mt-1">{orders.length}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Allocated to your store</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#E6EFE2] shadow-xs">
          <span className="text-xs font-bold text-slate-500">Awaiting Dispatch</span>
          <div className="text-2xl font-black text-[#D9A441] mt-1">{pendingCount}</div>
          <p className="text-[11px] text-[#D9A441] font-semibold mt-0.5">Ready for packaging</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#E6EFE2] shadow-xs">
          <span className="text-xs font-bold text-slate-500">In Transit (Courier)</span>
          <div className="text-2xl font-black text-[#2F6F4E] mt-1">{shippedCount}</div>
          <p className="text-[11px] text-[#2F6F4E] font-semibold mt-0.5">En route to customers</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#E6EFE2] shadow-xs">
          <span className="text-xs font-bold text-slate-500">Delivered & Settled</span>
          <div className="text-2xl font-black text-[#2F6F4E] mt-1">{deliveredCount}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Payment credited to ledger</p>
        </div>
      </div>

      {/* Orders Filter & Search Bar */}
      <div className="bg-white rounded-lg border border-[#E6EFE2] p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAFCF9] rounded-lg border border-[#E6EFE2] overflow-x-auto scrollbar-none whitespace-nowrap">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "all"
                  ? "bg-[#2F6F4E] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#0F2F2A]"
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "pending"
                  ? "bg-[#2F6F4E] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#0F2F2A]"
              }`}
            >
              Awaiting Dispatch ({pendingCount})
            </button>
            <button
              onClick={() => setActiveTab("shipped")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "shipped"
                  ? "bg-[#2F6F4E] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#0F2F2A]"
              }`}
            >
              Shipped ({shippedCount})
            </button>
            <button
              onClick={() => setActiveTab("delivered")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "delivered"
                  ? "bg-[#2F6F4E] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#0F2F2A]"
              }`}
            >
              Delivered ({deliveredCount})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by order #, item, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Order Items Queue */}
        <div className="space-y-3 pt-2">
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              No orders found matching your active filter.
            </div>
          ) : (
            filteredOrders.map(order => (
              <div 
                key={order.id} 
                className="p-4 rounded-xl bg-[#FAFCF9] border border-[#E6EFE2] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs card-hover-effect"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono font-black text-[#2F6F4E] text-sm">
                      {order.parentOrderNumber}
                    </span>
                    <span className="bg-[#F1F7ED] text-slate-700 px-2.5 py-0.5 rounded font-mono font-bold text-[11px] border border-[#2F6F4E]/20">
                      {order.paymentMethod.toUpperCase()} ({order.paymentStatus.toUpperCase()})
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      order.fulfillmentStatus === "delivered" ? "bg-[#F1F7ED] text-[#2F6F4E] border border-[#2F6F4E]/30" :
                      order.fulfillmentStatus === "shipped" ? "bg-[#FAF3E0] text-[#D9A441] border border-[#D9A441]/30" :
                      "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}>
                      {order.fulfillmentStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-[#0F2F2A]">
                    <span className="font-bold">{order.items[0]?.productName}</span>
                    <span className="text-slate-500 font-medium"> × {order.items[0]?.quantity} Qty</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-slate-500 text-[11px]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {order.deliveryAddress}, {order.city}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {order.customerPhone} ({order.customerName})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                  <div className="text-left md:text-right">
                    <div className="font-black text-[#0F2F2A] text-sm">৳ {order.subtotal.toLocaleString()}</div>
                    <div className="text-[11px] text-[#2F6F4E] font-bold">
                      Payable: ৳ {order.sellerPayable.toLocaleString()}
                    </div>
                    {order.trackingNumber && (
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {order.courierProvider}: {order.trackingNumber}
                      </div>
                    )}
                  </div>

                  {order.fulfillmentStatus !== "delivered" && order.fulfillmentStatus !== "shipped" ? (
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setTrackingNumber("");
                      }}
                      className="px-4 py-2 rounded-xl bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white font-bold text-xs transition shadow-xs btn-press-effect flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Handover to Courier</span>
                    </button>
                  ) : (
                    <div className="text-[#2F6F4E] font-bold text-xs flex items-center gap-1.5 bg-[#F1F7ED] px-3 py-1.5 rounded-xl border border-[#2F6F4E]/20">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{order.fulfillmentStatus === "delivered" ? "Delivered" : "Dispatched"}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Courier Handover Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-[#0F2F2A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <form onSubmit={handleDispatch} className="bg-white border border-[#E6EFE2] p-6 rounded-lg max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#2F6F4E] font-bold text-base">
                <Truck className="w-5 h-5" />
                <span>Courier Handover & Tracking</span>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Provide consignment details for suborder <span className="text-[#0F2F2A] font-mono font-bold">{selectedOrder.parentOrderNumber}</span>. The tracking number will trigger SMS alerts and automated COD reconciliation.
            </p>

            <div className="p-3 rounded-xl bg-[#FAFCF9] border border-[#E6EFE2] text-xs space-y-1">
              <div className="font-bold text-[#0F2F2A]">{selectedOrder.customerName}</div>
              <div className="text-slate-500 text-[11px]">{selectedOrder.deliveryAddress}, {selectedOrder.city}</div>
              <div className="text-[#2F6F4E] font-black pt-1">Collectible Amount: ৳ {selectedOrder.subtotal.toLocaleString()} (COD)</div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2F2A] mb-1.5">Select Courier Provider *</label>
              <div className="grid grid-cols-2 gap-2">
                {(["Steadfast", "Pathao", "RedX", "Paperfly"] as const).map(carrier => (
                  <button
                    key={carrier}
                    type="button"
                    onClick={() => setCourierProvider(carrier)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition text-left ${
                      courierProvider === carrier
                        ? "bg-[#F1F7ED] border-[#2F6F4E] text-[#2F6F4E]"
                        : "bg-[#FAFCF9] border-[#E6EFE2] text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {carrier} Courier
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2F2A] mb-1">
                Carrier Consignment / Tracking ID *
              </label>
              <input
                type="text"
                required
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. SF-982104-BD or PTH-48291"
                className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-xl p-2.5 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E] font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Issued by your carrier dashboard after booking the pickup.
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white font-bold text-xs transition shadow-xs btn-press-effect"
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

