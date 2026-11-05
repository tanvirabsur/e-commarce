import Link from "next/link";
import { Package, PlusCircle, Sparkles, ExternalLink } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export default function SellerProductsPage() {
  const products = MOCK_PRODUCTS.filter(p => p.sellerId === "str_01");

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6EFE2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-[#F1F7ED] text-[#2F6F4E]">
              <Package className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-[#2F6F4E] uppercase tracking-wider">Catalog Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F2F2A] tracking-tight">
            Store Products & SEO Health
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Manage your product inventory, live SEO score, and approval status across search engines.
          </p>
        </div>

        <Link
          href="/seller/products/new"
          className="flex items-center gap-2 bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white font-bold text-xs px-5 py-3 rounded-lg shadow-md transition shrink-0 btn-press-effect"
        >
          <PlusCircle className="w-4 h-4 text-[#D9A441]" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E6EFE2] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-[#0F2F2A] text-base">All Published Products ({products.length})</h3>
          <span className="text-xs text-slate-400 font-mono">Automated Schema.org JSON-LD Synced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EFE2] text-slate-400">
                <th className="pb-3.5 font-bold uppercase tracking-wider">Product & Media</th>
                <th className="pb-3.5 font-bold uppercase tracking-wider">Category / SKU</th>
                <th className="pb-3.5 font-bold uppercase tracking-wider">Price (BDT)</th>
                <th className="pb-3.5 font-bold uppercase tracking-wider">Stock</th>
                <th className="pb-3.5 font-bold uppercase tracking-wider">Approval</th>
                <th className="pb-3.5 font-bold uppercase tracking-wider">SEO Score</th>
                <th className="pb-3.5 font-bold uppercase tracking-wider text-right">Storefront</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EFE2]">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-[#F1F7ED]/50 transition-colors">
                  <td className="py-3.5">
                    <div className="flex items-center gap-3.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.media[0]?.url}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-[#0F2F2A] truncate max-w-xs">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Source: {p.source === "meta_catalog" ? "Meta Commerce" : "Direct"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-slate-600">
                    <div className="font-semibold">{p.category}</div>
                    <div className="text-[10px] font-mono text-slate-400">{p.sku}</div>
                  </td>
                  <td className="py-3.5 font-black text-[#0F2F2A]">
                    ৳ {p.price.toLocaleString()}
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-md font-mono font-bold text-[11px] ${
                      p.stock > 10 ? "text-[#2F6F4E] bg-[#F1F7ED]" : "text-[#D9A441] bg-[#FAF3E0]"
                    }`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      p.approvalStatus === "approved" ? "bg-[#F1F7ED] text-[#2F6F4E]" :
                      p.approvalStatus === "pending" ? "bg-[#FAF3E0] text-[#D9A441]" :
                      "bg-red-50 text-red-600"
                    }`}>
                      {p.approvalStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2F6F4E]" />
                      <span className="text-[11px] font-black text-[#2F6F4E] bg-[#F1F7ED] px-2.5 py-0.5 rounded-full border border-[#2F6F4E]/30">
                        100% Score
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 text-right">
                    {p.approvalStatus === "approved" ? (
                      <Link
                        href={`/products/${p.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[#2F6F4E] hover:underline font-bold"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Unpublished</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

