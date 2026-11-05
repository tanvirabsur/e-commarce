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
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-6 rounded-lg border border-[#E6EFE2] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-[#F1F7ED] text-[#2F6F4E]">
              <Wallet className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-[#0F2F2A] tracking-tight">
                Seller Financials & Payout Settlement
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                Per SRS 11.3 & 11.5: Double-entry merchant ledger, 10% platform commission deductions, and automated payout disbursement.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => alert("Financial statement exported (CSV).")}
            className="px-4 py-2 rounded-xl bg-[#F1F7ED] hover:bg-[#E6EFE2] text-[#2F6F4E] font-bold text-xs flex items-center gap-2 transition border border-[#2F6F4E]/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* Financial Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-5 rounded-lg border border-[#E6EFE2] shadow-xs">
          <span className="text-xs font-bold text-slate-500">Gross Sales</span>
          <div className="text-2xl font-black text-[#0F2F2A] mt-1">৳ 1,84,200</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Total completed orders this month</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#E6EFE2] shadow-xs">
          <span className="text-xs font-bold text-slate-500">Platform Commission (10%)</span>
          <div className="text-2xl font-black text-[#2F6F4E] mt-1">৳ 18,420</div>
          <p className="text-[11px] text-[#2F6F4E] font-semibold mt-0.5">Standard marketplace rate</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#E6EFE2] shadow-xs">
          <span className="text-xs font-bold text-slate-500">Settled to Date</span>
          <div className="text-2xl font-black text-[#0F2F2A] mt-1">৳ 1,34,330</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Transferred to your bank/bKash</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#2F6F4E]/30 bg-[#F1F7ED]/50 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#2F6F4E]/10 rounded-bl-full pointer-events-none" />
          <span className="text-xs font-bold text-[#2F6F4E]">Available for Payout</span>
          <div className="text-2xl font-black text-[#2F6F4E] mt-1">৳ {availableBalance.toLocaleString()}</div>
          <p className="text-[11px] text-slate-600 font-semibold mt-0.5">Eligible for instant withdrawal</p>
        </div>
      </div>

      {/* Payout Form & Settlement Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Payout Request Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-[#E6EFE2] space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-[#0F2F2A] text-sm flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-[#2F6F4E]" />
              <span>Request Payout</span>
            </h3>
            <span className="text-[11px] font-bold text-slate-500 bg-[#FAFCF9] px-2.5 py-1 rounded-lg border border-[#E6EFE2]">
              Cap: ৳ {availableBalance.toLocaleString()}
            </span>
          </div>

          {payoutRequested ? (
            <div className="p-5 rounded-lg bg-[#F1F7ED] border border-[#2F6F4E]/40 text-[#2F6F4E] text-xs space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#2F6F4E]" />
                <span>Withdrawal Request Submitted</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs">
                Your payout request for <span className="font-bold text-[#0F2F2A]">৳ {Number(payoutAmount).toLocaleString()}</span> via <span className="font-bold uppercase text-[#2F6F4E]">{payoutMethod}</span> has been queued for verification.
              </p>
              <div className="p-3 bg-white rounded-xl border border-[#E6EFE2] text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Batch Reference:</span>
                  <span className="font-mono font-bold text-[#0F2F2A]">PO-2026-9812</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Arrival:</span>
                  <span className="font-bold text-[#2F6F4E]">Within 24 Hours</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPayoutRequested(false)}
                className="w-full py-2 rounded-xl bg-white border border-[#2F6F4E]/30 text-[#2F6F4E] font-bold text-xs hover:bg-[#F1F7ED] transition"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#0F2F2A] font-bold mb-1.5">
                  Withdrawal Amount (BDT ৳) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
                  <input
                    type="number"
                    required
                    max={availableBalance}
                    min={1000}
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-xl pl-8 pr-3.5 py-2.5 text-[#0F2F2A] font-mono font-bold text-sm focus:outline-none focus:border-[#2F6F4E] focus:bg-white"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>Minimum: ৳ 1,000</span>
                  <button 
                    type="button" 
                    onClick={() => setPayoutAmount(availableBalance.toString())}
                    className="text-[#2F6F4E] font-bold hover:underline"
                  >
                    Withdraw Max (৳ {availableBalance.toLocaleString()})
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#0F2F2A] font-bold mb-1.5">Disbursement Channel *</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod("bkash")}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                      payoutMethod === "bkash"
                        ? "bg-[#F1F7ED] border-[#2F6F4E] text-[#2F6F4E] font-black"
                        : "bg-[#FAFCF9] border-[#E6EFE2] text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-[11px]">bKash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod("nagad")}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                      payoutMethod === "nagad"
                        ? "bg-[#F1F7ED] border-[#2F6F4E] text-[#2F6F4E] font-black"
                        : "bg-[#FAFCF9] border-[#E6EFE2] text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-[11px]">Nagad</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod("bank")}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                      payoutMethod === "bank"
                        ? "bg-[#F1F7ED] border-[#2F6F4E] text-[#2F6F4E] font-black"
                        : "bg-[#FAFCF9] border-[#E6EFE2] text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span className="text-[11px]">Bank Wire</span>
                  </button>
                </div>
              </div>

              {payoutMethod === "bank" ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#0F2F2A] font-bold mb-1">Bank Name *</label>
                    <input
                      type="text"
                      required
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-xl px-3.5 py-2 text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F2F2A] font-bold mb-1">Branch Name *</label>
                    <input
                      type="text"
                      required
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                      className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-xl px-3.5 py-2 text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0F2F2A] font-bold mb-1">Account Number *</label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-xl px-3.5 py-2 text-[#0F2F2A] font-mono focus:outline-none focus:border-[#2F6F4E]"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[#0F2F2A] font-bold mb-1">
                    {payoutMethod.toUpperCase()} Wallet Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="017XX-XXXXXX"
                    className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-xl px-3.5 py-2.5 text-[#0F2F2A] font-mono focus:outline-none focus:border-[#2F6F4E]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white font-bold transition shadow-xs btn-press-effect flex items-center justify-center gap-2"
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

        {/* Settlement History (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-lg border border-[#E6EFE2] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-[#0F2F2A] text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2F6F4E]" />
              <span>Settlement & Payout Stream</span>
            </h3>
            <span className="text-xs text-slate-500">Double-entry verified records</span>
          </div>

          <div className="space-y-3">
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
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-[#FAFCF9] border border-[#E6EFE2] flex items-center justify-between text-xs card-hover-effect"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0F2F2A]">{payout.method}</span>
                    <span className="text-[10px] bg-[#F1F7ED] text-[#2F6F4E] px-2 py-0.5 rounded-full font-bold border border-[#2F6F4E]/20">
                      {payout.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Ref: {payout.ref} • {payout.account}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {payout.date}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-[#2F6F4E] font-mono text-base">
                    ৳ {payout.amount.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">Net Disbursed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

