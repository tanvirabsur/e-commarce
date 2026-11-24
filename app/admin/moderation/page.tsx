"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Check, 
  X, 
  AlertTriangle, 
  Image as ImageIcon, 
  ExternalLink,
  Info,
  CheckCircle2,
  Calendar,
  Filter
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Product } from "@/lib/types";

export default function AdminModerationPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(MOCK_PRODUCTS[0]);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, approvalStatus: "approved" } : p));
    setActionNotice(`Listing "${selectedProduct.name}" has been approved for public catalog indexing.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleReject = () => {
    if (!rejectionReason) return;
    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? { 
      ...p, 
      approvalStatus: "rejected", 
      rejectionReason 
    } : p));
    setRejectionModalOpen(false);
    setRejectionReason("");
    setActionNotice(`Listing "${selectedProduct.name}" rejected. Notice dispatched to merchant.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2F2A] tracking-tight">
            Product Moderation Pipeline
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            SRS 8.3 & 8.4: Automated watermark verification, asset resolution validation, and listing compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-white border border-[#E6EFE2] px-3 py-1.5 rounded-lg shadow-xs">
            Queue: <span className="font-bold text-[#0F2F2A]">{products.length} Items</span>
          </span>
        </div>
      </div>

      {actionNotice && (
        <div className="p-3.5 rounded-lg bg-[#F1F7ED] border border-[#2F6F4E]/30 text-[#2F6F4E] text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Grid: Product List & Review Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left List: Products Table (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-md border border-[#E6EFE2] space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#E6EFE2]">
            <h2 className="font-bold text-[#0F2F2A] text-xs uppercase tracking-wider">Submission Queue</h2>
            <span className="text-[11px] font-mono text-slate-400">Select to inspect</span>
          </div>

          <div className="space-y-2">
            {products.map(p => (
              <div 
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`p-3 rounded-lg border cursor-pointer transition flex items-center justify-between gap-3 text-xs ${
                  selectedProduct.id === p.id 
                    ? "border-[#2F6F4E] bg-[#F1F7ED]/60 shadow-xs" 
                    : "border-[#E6EFE2] bg-[#FAFCF9] hover:bg-white"
                }`}
              >
                <div className="min-w-0">
                  <p className="font-bold text-[#0F2F2A] truncate">{p.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {p.sellerName} • <span className="text-[#2F6F4E] font-medium">{p.category}</span>
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    p.approvalStatus === "approved" ? "bg-[#F1F7ED] text-[#2F6F4E] border border-[#2F6F4E]/30" :
                    p.approvalStatus === "rejected" ? "bg-red-50 text-red-600 border border-red-200" :
                    "bg-[#FAF3E0] text-[#D9A441] border border-[#D9A441]/30"
                  }`}>
                    {p.approvalStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Preview Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-md border border-[#E6EFE2] space-y-5 shadow-xs">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6EFE2]">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-mono bg-[#F1F7ED] px-2 py-0.5 rounded font-bold text-[#2F6F4E]">
                  {selectedProduct.sku}
                </span>
                <span>•</span>
                <span>Seller: <strong>{selectedProduct.sellerName}</strong></span>
              </div>
              <h3 className="text-lg font-bold text-[#0F2F2A]">
                {selectedProduct.name}
              </h3>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xl font-black text-[#2F6F4E]">
                ৳ {selectedProduct.price.toLocaleString()}
              </span>
              {selectedProduct.compareAtPrice && (
                <span className="text-xs text-slate-400 line-through block">
                  ৳ {selectedProduct.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Watermark Validation Inspector */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0F2F2A] block">
              Automated Asset Watermark & Verification:
            </span>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-50 border border-[#E6EFE2] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedProduct.media[0]?.url} 
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              
              {selectedProduct.media[0]?.watermarkApplied ? (
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-xs font-bold text-[#2F6F4E] px-3 py-1 rounded-md border border-[#2F6F4E]/30 shadow-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2F6F4E]" />
                  <span>ELYQOR VERIFIED WATERMARK ATTACHED</span>
                </div>
              ) : (
                <div className="absolute bottom-3 right-3 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-white" />
                  <span>WATERMARK MISSING - POLICY REJECTION RECOMMENDED</span>
                </div>
              )}
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="bg-[#FAFCF9] border border-[#E6EFE2] rounded-lg p-4 space-y-2 text-xs">
            <span className="font-bold text-[#0F2F2A] block mb-1">Automated Compliance Diagnostics:</span>
            <div className="grid grid-cols-2 gap-2 text-slate-600">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2F6F4E]" />
                <span>Dimensions: 1080x1080px (Optimal)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2F6F4E]" />
                <span>Text Overlay: Clean (&lt; 15%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2F6F4E]" />
                <span>Duplicate Slug: Clean / Unique</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2F6F4E]" />
                <span>SEO Meta Description: Complete</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setRejectionModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs transition"
            >
              <X className="w-4 h-4" />
              <span>Reject Submission</span>
            </button>

            <button
              onClick={() => handleApprove(selectedProduct.id)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white font-bold text-xs transition shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Approve Listing</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectionModalOpen && (
        <div className="fixed inset-0 bg-[#0F2F2A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#E6EFE2] p-6 rounded-md max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-red-600 font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              <span>Select Rejection Reason</span>
            </div>

            <p className="text-xs text-slate-600">
              Specify reason for rejection. This notification will be automatically delivered to the merchant with guidance for resubmission.
            </p>

            <select
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-lg p-2.5 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
            >
              <option value="">Select a reason...</option>
              <option value="watermark_missing">Watermark missing or incorrectly formatted</option>
              <option value="low_resolution">Product image is blurry or below 800px minimum</option>
              <option value="prohibited_category">Category violates platform merchant policy</option>
              <option value="misleading_pricing">Compare-at discount exceeds allowed threshold</option>
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectionModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
