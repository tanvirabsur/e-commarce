import { Wallet, ArrowDownRight, ArrowUpRight, FileSpreadsheet, ShieldCheck, Download, Calendar, Filter } from "lucide-react";
import { MOCK_LEDGER_ENTRIES } from "@/lib/mock-data";

export default function AdminFinancePage() {
  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2F2A] tracking-tight">
            Financial Ledger & Reconciliation
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Per SRS 11.4: Immutable double-entry ledger stream, 10% platform commission accounting, and COD settlement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E6EFE2] text-xs font-medium text-[#0F2F2A] hover:bg-[#FAFCF9] transition shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Monthly Cycle</span>
          </button>

          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white text-xs font-bold transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-md border border-[#E6EFE2] shadow-xs">
          <span className="text-xs font-medium text-slate-500">Platform Commission Yield</span>
          <div className="text-2xl font-bold text-[#0F2F2A] mt-2">10.0%</div>
          <p className="text-[11px] text-[#2F6F4E] font-medium mt-1">Global Base Rate for All Categories</p>
        </div>

        <div className="bg-white p-5 rounded-md border border-[#E6EFE2] shadow-xs">
          <span className="text-xs font-medium text-slate-500">Unsettled In-Transit COD</span>
          <div className="text-2xl font-bold text-[#D9A441] mt-2">৳ 145,200</div>
          <p className="text-[11px] text-slate-400 mt-1">Steadfast & Pathao Carrier Clearing</p>
        </div>

        <div className="bg-white p-5 rounded-md border border-[#E6EFE2] shadow-xs">
          <span className="text-xs font-medium text-slate-500">Net Platform Commission</span>
          <div className="text-2xl font-bold text-[#2F6F4E] mt-2">৳ 48,250</div>
          <p className="text-[11px] text-[#2F6F4E] font-medium mt-1">100% Reconciled Net Revenue</p>
        </div>
      </div>

      {/* Real-time Double-entry Ledger Stream */}
      <div className="bg-white p-5 rounded-md border border-[#E6EFE2] space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#E6EFE2]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2F6F4E]" />
            <h2 className="font-bold text-[#0F2F2A] text-sm">Immutable Double-Entry Ledger Stream</h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Append-Only Audit Record</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EFE2] text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-2.5 px-2 font-bold">Timestamp</th>
                <th className="py-2.5 px-2 font-bold">Account</th>
                <th className="py-2.5 px-2 font-bold">Reference</th>
                <th className="py-2.5 px-2 font-bold">Description</th>
                <th className="py-2.5 px-2 font-bold text-right">Debit / Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EFE2]">
              {MOCK_LEDGER_ENTRIES.map((entry) => (
                <tr key={entry.id} className="hover:bg-[#FAFCF9] transition">
                  <td className="py-3 px-2 text-slate-500 font-mono text-[11px]">{entry.timestamp}</td>
                  <td className="py-3 px-2">
                    <span className="bg-[#F1F7ED] text-[#2F6F4E] px-2 py-0.5 rounded text-[11px] font-bold border border-[#2F6F4E]/20">
                      {entry.account}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-500 font-mono text-[11px]">
                    {entry.referenceType} ({entry.referenceId})
                  </td>
                  <td className="py-3 px-2 text-slate-600 max-w-xs truncate">
                    {entry.description}
                  </td>
                  <td className="py-3 px-2 text-right font-mono font-bold">
                    {entry.type === "credit" ? (
                      <span className="text-[#2F6F4E] inline-flex items-center gap-0.5">
                        + ৳{entry.amount.toLocaleString()}
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="text-red-600 inline-flex items-center gap-0.5">
                        - ৳{entry.amount.toLocaleString()}
                        <ArrowDownRight className="w-3 h-3" />
                      </span>
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
