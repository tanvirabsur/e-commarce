"use client";

import { useState } from "react";
import { 
  Share2, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle, 
  Download, 
  FileSpreadsheet
} from "lucide-react";
import { MOCK_IMPORT_JOBS } from "@/lib/mock-data";

export default function FacebookImportPage() {
  const [syncing, setSyncing] = useState(false);
  const [activeJob] = useState(MOCK_IMPORT_JOBS[0]);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const triggerSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 4000);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6EFE2] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-[#F1F7ED] text-[#2F6F4E]">
              <Share2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-[#2F6F4E] uppercase tracking-wider">Social Commerce Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F2F2A] tracking-tight">
            Meta Commerce Catalog Integration
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-xl">
            SRS 9 Direct Meta Graph API & Commerce Catalog product sync, asset ingestion, and price normalization pipeline.
          </p>
        </div>

        <button
          onClick={triggerSync}
          disabled={syncing}
          className="flex items-center gap-2 bg-[#2F6F4E] hover:bg-[#0F2F2A] disabled:opacity-50 text-white font-bold text-xs px-5 py-3 rounded-lg shadow-md transition shrink-0 btn-press-effect"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
          <span>{syncing ? "Synchronizing Meta Catalog..." : "Sync Catalog Now"}</span>
        </button>
      </div>

      {syncSuccess && (
        <div className="p-4 rounded-lg bg-[#F1F7ED] border border-[#2F6F4E]/30 text-[#2F6F4E] text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Facebook catalog sync completed successfully! 36 items refreshed and normalized.</span>
        </div>
      )}

      {/* Connected Account Card */}
      <div className="bg-white p-6 rounded-xl border border-[#E6EFE2] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs card-hover-effect">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#2F6F4E] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-[#0F2F2A] text-base">Apex Gadgets Official Facebook Page</h3>
              <span className="bg-[#F1F7ED] text-[#2F6F4E] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#2F6F4E]/20">
                Connected & Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              Catalog ID: cat_meta_4401928 • Meta Token: Encrypted in Secure Vault
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Last Synced:</span>
          <span className="text-[#0F2F2A] font-black font-mono">Today at 11:04 AM</span>
        </div>
      </div>

      {/* Sync Job Progress & Status (SRS 9.6) */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6EFE2] space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-[#0F2F2A] text-base">Ingestion Job Status ({activeJob.jobId})</h3>
          <span className="text-xs font-mono font-black text-[#2F6F4E] bg-[#F1F7ED] px-3 py-1 rounded-full border border-[#2F6F4E]/25">
            {activeJob.status.toUpperCase()}
          </span>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-mono">
            <span>Progress: {activeJob.completed} of {activeJob.total} products processed</span>
            <span>{Math.round((activeJob.completed / activeJob.total) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-[#E6EFE2]">
            <div 
              className="bg-[#2F6F4E] h-full rounded-full transition-all duration-500"
              style={{ width: `${(activeJob.completed / activeJob.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-3 pt-2 text-center text-xs">
          <div className="p-4 rounded-lg bg-[#FAFCF9] border border-[#E6EFE2]">
            <span className="text-slate-400 text-[11px] font-bold block uppercase tracking-wider">Total Items</span>
            <span className="font-black text-[#0F2F2A] font-mono text-xl mt-1 block">{activeJob.total}</span>
          </div>
          <div className="p-4 rounded-lg bg-[#FAFCF9] border border-[#E6EFE2]">
            <span className="text-slate-400 text-[11px] font-bold block uppercase tracking-wider">Ingested</span>
            <span className="font-black text-[#2F6F4E] font-mono text-xl mt-1 block">{activeJob.completed}</span>
          </div>
          <div className="p-4 rounded-lg bg-[#FAFCF9] border border-[#E6EFE2]">
            <span className="text-slate-400 text-[11px] font-bold block uppercase tracking-wider">Flagged</span>
            <span className="font-black text-red-600 font-mono text-xl mt-1 block">{activeJob.failed}</span>
          </div>
          <div className="p-4 rounded-lg bg-[#FAFCF9] border border-[#E6EFE2]">
            <span className="text-slate-400 text-[11px] font-bold block uppercase tracking-wider">Skipped</span>
            <span className="font-black text-slate-400 font-mono text-xl mt-1 block">{activeJob.skipped}</span>
          </div>
        </div>

        {/* Error Log Breakdown */}
        {activeJob.errorSummary && activeJob.errorSummary.length > 0 && (
          <div className="mt-4 p-5 rounded-lg bg-[#FAF3E0] border border-[#D9A441]/40 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0F2F2A]">
              <AlertCircle className="w-4 h-4 text-[#D9A441]" />
              <span>Normalization Exceptions Log:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              {activeJob.errorSummary.map((err, i) => (
                <li key={i} className="text-[11px]">{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CSV Fallback Option (SRS 9.2) */}
      <div className="bg-white p-6 rounded-xl border border-[#E6EFE2] flex items-center justify-between shadow-xs card-hover-effect">
        <div>
          <h4 className="font-black text-[#0F2F2A] text-sm flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#2F6F4E]" />
            <span>Bulk CSV / Excel Upload Fallback</span>
          </h4>
          <p className="text-slate-500 text-xs mt-0.5">
            If Facebook API permissions are pending, use our standardized Excel template to bulk import products.
          </p>
        </div>

        <button className="flex items-center gap-1.5 text-xs font-bold bg-[#F1F7ED] hover:bg-[#E6EFE2] text-[#0F2F2A] px-4 py-2.5 rounded-lg border border-[#2F6F4E]/20 transition btn-press-effect">
          <Download className="w-3.5 h-3.5 text-[#2F6F4E]" />
          <span>Download Template</span>
        </button>
      </div>
    </div>
  );
}

