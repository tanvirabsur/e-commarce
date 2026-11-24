import { Users, CheckCircle2, Phone, MapPin, Share2, Store, ExternalLink } from "lucide-react";
import Link from "next/link";
import { MOCK_STORES } from "@/lib/mock-data";

export default function AdminSellersPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2F2A] tracking-tight">
            Merchant Governance & Stores
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Seller onboarding status, trade license verification, and store compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-white border border-[#E6EFE2] px-3 py-1.5 rounded-lg shadow-xs">
            Active Stores: <span className="font-bold text-[#0F2F2A]">{MOCK_STORES.length}</span>
          </span>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_STORES.map((store) => (
          <div key={store.id} className="bg-white rounded-md border border-[#E6EFE2] p-5 flex flex-col justify-between space-y-4 shadow-xs">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#2F6F4E]/20 bg-slate-50 shrink-0"
                  />
                  <div>
                    <h2 className="text-sm font-bold text-[#0F2F2A] flex items-center gap-1.5">
                      {store.name}
                      {store.isVerified && (
                        <CheckCircle2 className="w-4 h-4 text-[#2F6F4E] shrink-0" />
                      )}
                    </h2>
                    <p className="text-[11px] text-slate-500">{store.ownerName}</p>
                  </div>
                </div>

                <span className="text-[10px] bg-[#F1F7ED] text-[#2F6F4E] border border-[#2F6F4E]/30 font-bold px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                {store.description}
              </p>

              <div className="mt-4 pt-3 border-t border-[#E6EFE2] space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-2 text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{store.address}, {store.district}</span>
                </div>
                {store.fbPageUrl && (
                  <div className="flex items-center gap-2 text-[#2F6F4E] font-medium text-[11px]">
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="truncate">Facebook Verified Merchant</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-[#E6EFE2] flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">
                {store.totalSales.toLocaleString()}+ Orders
              </span>

              <Link
                href={`/stores/${store.slug}`}
                className="flex items-center gap-1 text-[#2F6F4E] hover:text-[#0F2F2A] font-bold text-xs"
              >
                <span>View Store</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
