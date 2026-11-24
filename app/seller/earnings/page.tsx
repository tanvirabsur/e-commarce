"use client";

import { useState } from "react";
import { 
  Wallet, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  Building2, 
  Smartphone, 
  FileText,
  AlertCircle,
  Download
} from "lucide-react";

export default function SellerEarningsPage() {
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("15000");
  const [payoutMethod, setPayoutMethod] = useState<"bkash" | "nagad" | "bank">("bkash");
  const [accountNumber, setAccountNumber] = useState("01712-345678");
  const [bankName, setBankName] = useState("BRAC Bank PLC");
  const [branchName, setBranchName] = useState("Gulshan Branch");
  const availableBalance = 31450;

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(payoutAmount) <= 0 || Number(payoutAmount) > availableBalance) return;
    setPayoutRequested(true);
  };

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="bg-white p-5 rounded-md border border-[#E6EFE2] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-md bg-[#F1F7ED] text-[#2F6F4E] border border-[#2F6F4E]/20">
              <Wallet className="w-4 h-4" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-[#0F2F2A] tracking-tight">
                Seller Financials & Payout Settlement
              </h1>
              <p className="text-slate-500 text-xs mt-0.5">
                Double-entry merchant ledger, 10% platform commission accounting, and automated payout disbursement.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => alert("Financial statement exported (CSV).")}
            className="px-3.5 py-1.5 rounded-md bg-[#F1F7ED] hover:bg-[#E6EFE2] text-[#2F6F4E] font-semibold text-xs flex items-center gap-2 transition border border-[#2F6F4E]/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* Financial Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-md border border-[#E6EFE2] shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Gross Sales</span>
          <div className="text-2xl font-bold text-[#0F2F2A] mt-1">৳ 1,84,200</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Total completed orders</p>
        </div>

        <div className="bg-white p-4 rounded-md border border-[#E6EFE2] shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Platform Commission (10%)</span>
          <div className="text-2xl font-bold text-[#2F6F4E] mt-1">৳ 18,420</div>
          <p className="text-[11px] text-[#2F6F4E] font-medium mt-0.5">Standard marketplace rate</p>
        </div>

        <div className="bg-white p-4 rounded-md border border-[#E6EFE2] shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Settled to Date</span>
          <div className="text-2xl font-bold text-[#0F2F2A] mt-1">৳ 1,34,330</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Transferred to your bank/bKash</p>
        </div>

        <div className="bg-white p-4 rounded-md border border-[#2F6F4E]/30 bg-[#F1F7ED]/40 shadow-2xs relative overflow-hidden">
          <span className="text-xs font-medium text-[#2F6F4E]">Available for Payout</span>
          <div className="text-2xl font-bold text-[#2F6F4E] mt-1">৳ {availableBalance.toLocaleString()}</div>
          <p className="text-[11px] text-slate-600 font-medium mt-0.5">Eligible for instant withdrawal</p>
        </div>
      </div>

      {/* Payout Form & Settlement Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Payout Request Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-md border border-[#E6EFE2] space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#E6EFE2]">
            <h3 className="font-bold text-[#0F2F2A] text-sm flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-[#2F6F4E]" />
              <span>Request Payout</span>
            </h3>
            <span className="text-[11px] font-medium text-slate-500 bg-[#FAFCF9] px-2 py-0.5 rounded border border-[#E6EFE2]">
              Min: ৳ 1,000
            </span>
          </div>

          {payoutRequested ? (
            <div className="p-4 rounded-md bg-[#F1F7ED] border border-[#2F6F4E]/30 text-[#2F6F4E] space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#2F6F4E]" />
                <span>Withdrawal Initiated!</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Disbursement of <strong className="text-[#0F2F2A]">৳ {Number(payoutAmount).toLocaleString()}</strong> to your {payoutMethod.toUpperCase()} account ({accountNumber}) is being queued.
              </p>
              <div className="p-2.5 bg-white rounded border border-[#E6EFE2] text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Routing Reference:</span>
                  <span className="font-mono font-bold text-[#0F2F2A]">TRF-2026-9912</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Arrival:</span>
                  <span className="font-medium text-[#2F6F4E]">Within 2 Hours (MFS Realtime)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPayoutRequested(false)}
                className="w-full py-1.5 rounded bg-white border border-[#2F6F4E]/30 text-[#2F6F4E] font-semibold text-xs hover:bg-[#F1F7ED] transition"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleRequestPayout} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#0F2F2A] font-semibold mb-1">
                  Withdrawal Amount (BDT) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
                  <input
                    type="number"
                    required
                    min="1000"
                    max={availableBalance}
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded pl-7 pr-3 py-2 text-[#0F2F2A] font-mono font-bold text-sm focus:outline-none focus:border-[#2F6F4E] focus:bg-white"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Available balance: ৳ {availableBalance.toLocaleString()}
                </span>
              </div>

              <div>
                <label className="block text-[#0F2F2A] font-semibold mb-1">Disbursement Channel *</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod("bkash")}
                    className={`p-2 rounded border text-center transition flex flex-col items-center gap-1 ${
                      payoutMethod === "bkash" 
                        ? "bg-[#F1F7ED] border-[#2F6F4E] text-[#2F6F4E] font-bold" 
                        : "bg-[#FAFCF9] border-[#E6EFE2] text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>bKash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayoutMethod("nagad")}
                    className={`p-2 rounded border text-center transition flex flex-col items-center gap-1 ${
                      payoutMethod === "nagad" 
                        ? "bg-[#F1F7ED] border-[#2F6F4E] text-[#2F6F4E] font-bold" 
                        : "bg-[#FAFCF9] border-[#E6EFE2] text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Nagad</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayoutMethod("bank")}
                    className={`p-2 rounded border text-center transition flex flex-col items-center gap-1 ${
                      payoutMethod === "bank" 
                        ? "bg-[#F1F7ED] border-[#2F6F4E] text-[#2F6F4E] font-bold" 
                        : "bg-[#FAFCF9] border-[#E6EFE2] text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>BEFTN Bank</span>
                  </button>
                </div>
              </div>

              {payoutMethod === "bank" ? (
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[#0F2F2A] font-semibold mb-1">Bank Name *</label>
                    <input
                      type="text"
                      required
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded px-3 py-1.5 text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F2F2A] font-semibold mb-1">Branch Name *</label>
                    <input
                      type="text"
                      required
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                      className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded px-3 py-1.5 text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F2F2A] font-semibold mb-1">Account Number *</label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded px-3 py-1.5 text-[#0F2F2A] font-mono focus:outline-none focus:border-[#2F6F4E]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[#0F2F2A] font-semibold mb-1">
                    {payoutMethod.toUpperCase()} Wallet Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="017XX-XXXXXX"
                    className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded px-3 py-2 text-[#0F2F2A] font-mono focus:outline-none focus:border-[#2F6F4E]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white font-semibold transition shadow-2xs btn-press-effect flex items-center justify-center gap-2"
              >
                <span>Authorize & Request Payout</span>
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Zero transaction fees. Funds processed via automated BEFTN / MFS rails.</span>
              </div>
            </form>
          )}
        </div>

        {/* Settlement History (7 cols, Unified Clean Table) */}
        <div className="lg:col-span-7 bg-white rounded-md border border-[#E6EFE2] shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-[#E6EFE2] flex items-center justify-between bg-[#FAFCF9]">
              <h3 className="font-bold text-[#0F2F2A] text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2F6F4E]" />
                <span>Settlement & Payout Stream</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Immutable audit records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E6EFE2] bg-white text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 px-4">Method & Account</th>
                    <th className="py-2.5 px-4">Reference & Date</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right">Net Disbursed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6EFE2] bg-white">
                  {[
                    {
                      ref: "PAY-2026-9012",
                      method: "bKash Merchant",
                      date: "March 02, 2026 • 04:00 PM",
                      amount: 15400,
                      status: "Settled",
                      account: "01712-***678"
                    },
                    {
                      ref: "PAY-2026-8804",
                      method: "BRAC Bank PLC",
                      date: "February 23, 2026 • 11:30 AM",
                      amount: 22800,
                      status: "Settled",
                      account: "1501-****-001"
                    },
                    {
                      ref: "PAY-2026-8430",
                      method: "Nagad Wallet",
                      date: "February 14, 2026 • 02:15 PM",
                      amount: 18500,
                      status: "Settled",
                      account: "01844-***321"
                    },
                    {
                      ref: "PAY-2026-7910",
                      method: "bKash Merchant",
                      date: "February 01, 2026 • 05:45 PM",
                      amount: 32000,
                      status: "Settled",
                      account: "01712-***678"
                    }
                  ].map((payout, idx) => (
                    <tr key={idx} className="hover:bg-[#FAFCF9] transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[#0F2F2A] block">{payout.method}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{payout.account}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-slate-600 block text-[11px]">{payout.ref}</span>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{payout.date}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] bg-[#F1F7ED] text-[#2F6F4E] px-2 py-0.5 rounded font-semibold border border-[#2F6F4E]/20">
                          {payout.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-bold text-[#0F2F2A] font-mono block">
                          ৳ {payout.amount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400">BEFTN / MFS</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
