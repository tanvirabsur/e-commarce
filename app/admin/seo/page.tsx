"use client";

import { useState } from "react";
import { 
  Search, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  FileCode2, 
  Smartphone, 
  Monitor, 
  Copy, 
  Check, 
  Sliders, 
  TrendingUp, 
  ShieldCheck, 
  Zap 
} from "lucide-react";
import { MOCK_SEO_HEALTH, MOCK_PRODUCTS } from "@/lib/mock-data";
import { generateProductSchema, generateOrganizationSchema, generateBreadcrumbSchema } from "@/lib/seo-config";

export default function AdminSEOPage() {
  const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCTS[0]);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [activeSchemaTab, setActiveSchemaTab] = useState<"product" | "org" | "breadcrumb">("product");
  const [copied, setCopied] = useState(false);

  // Editable SERP fields
  const [customTitle, setCustomTitle] = useState(selectedProduct.seo.title);
  const [customDesc, setCustomDesc] = useState(selectedProduct.seo.description);
  const [customKeyword, setCustomKeyword] = useState(selectedProduct.seo.focusKeyword || "");

  const handleProductChange = (prodId: string) => {
    const prod = MOCK_PRODUCTS.find(p => p.id === prodId);
    if (prod) {
      setSelectedProduct(prod);
      setCustomTitle(prod.seo.title);
      setCustomDesc(prod.seo.description);
      setCustomKeyword(prod.seo.focusKeyword || "");
    }
  };

  const currentSchema = activeSchemaTab === "product" 
    ? generateProductSchema(selectedProduct)
    : activeSchemaTab === "org"
    ? generateOrganizationSchema()
    : generateBreadcrumbSchema([
        { name: "Home", url: "https://elyqor.com" },
        { name: selectedProduct.category, url: `https://elyqor.com/categories/${selectedProduct.categorySlug}` },
        { name: selectedProduct.name, url: `https://elyqor.com/products/${selectedProduct.slug}` }
      ]);

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(currentSchema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Score Header */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E6EFE2] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-[#F1F7ED] text-[#2F6F4E]">
              <Search className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-[#2F6F4E] uppercase tracking-wider">Search Engine Visibility</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F2F2A] tracking-tight">
            SEO Command & Health Center
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Marketplace search index coverage, real-time Schema.org structured data validation, Open Graph social previews, robots crawl budget, and Core Web Vitals audit.
          </p>
        </div>

        {/* Global SEO Score Gauge */}
        <div className="flex items-center gap-4 bg-[#F1F7ED] border border-[#2F6F4E]/30 p-5 rounded-xl shrink-0 shadow-xs card-hover-effect">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-[#E6EFE2] border-t-[#2F6F4E] border-r-[#88B04B] flex items-center justify-center">
              <span className="text-2xl font-black text-[#0F2F2A]">{MOCK_SEO_HEALTH.overallScore}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-[#2F6F4E]">
              <Sparkles className="w-4 h-4 text-[#88B04B]" />
              <span>Optimal Health</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">All Canonical Directives Active</p>
          </div>
        </div>
      </div>

      {/* Core Web Vitals Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E6EFE2] shadow-xs card-hover-effect">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Largest Contentful Paint</span>
            <Zap className="w-4 h-4 text-[#2F6F4E]" />
          </div>
          <div className="mt-3 text-2xl font-black text-[#2F6F4E]">
            {MOCK_SEO_HEALTH.coreWebVitals.lcp}
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-medium">Target: &lt; 2.5s (Passing)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E6EFE2] shadow-xs card-hover-effect">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>First Input Delay (FID)</span>
            <Zap className="w-4 h-4 text-[#2F6F4E]" />
          </div>
          <div className="mt-3 text-2xl font-black text-[#2F6F4E]">
            {MOCK_SEO_HEALTH.coreWebVitals.fid}
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-medium">Target: &lt; 100ms (Passing)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E6EFE2] shadow-xs card-hover-effect">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Cumulative Layout Shift</span>
            <Zap className="w-4 h-4 text-[#2F6F4E]" />
          </div>
          <div className="mt-3 text-2xl font-black text-[#2F6F4E]">
            {MOCK_SEO_HEALTH.coreWebVitals.cls}
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-medium">Target: &lt; 0.1 (Zero Shift)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E6EFE2] shadow-xs card-hover-effect">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Interaction to Next Paint</span>
            <Zap className="w-4 h-4 text-[#2F6F4E]" />
          </div>
          <div className="mt-3 text-2xl font-black text-[#2F6F4E]">
            {MOCK_SEO_HEALTH.coreWebVitals.inp}
          </div>
          <p className="text-[10px] text-slate-400 mt-1 font-medium">Target: &lt; 200ms (Passing)</p>
        </div>
      </div>

      {/* Main Dual Area: Interactive SERP & OpenGraph Studio vs SEO Audit Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: SERP & Social Card Simulator (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#E6EFE2] space-y-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#2F6F4E]" />
                <h3 className="font-black text-[#0F2F2A] text-sm">Google SERP Live Snippet Simulator</h3>
              </div>
              
              {/* Product Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedProduct.id}
                  onChange={(e) => handleProductChange(e.target.value)}
                  className="bg-[#FAFCF9] border border-[#E6EFE2] text-[#0F2F2A] text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#2F6F4E] cursor-pointer"
                >
                  {MOCK_PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>{p.name.slice(0, 32)}...</option>
                  ))}
                </select>

                <div className="flex bg-[#F1F7ED] rounded-xl p-1 border border-[#E6EFE2]">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1.5 rounded-lg transition ${previewDevice === "desktop" ? "bg-[#2F6F4E] text-white shadow-xs" : "text-slate-500 hover:text-[#0F2F2A]"}`}
                    title="Desktop SERP Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1.5 rounded-lg transition ${previewDevice === "mobile" ? "bg-[#2F6F4E] text-white shadow-xs" : "text-slate-500 hover:text-[#0F2F2A]"}`}
                    title="Mobile SERP Preview"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Google SERP Simulated Box */}
            <div className="p-5 rounded-lg bg-[#FAFCF9] text-slate-900 font-sans border border-[#E6EFE2] shadow-xs">
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                <div className="w-4 h-4 rounded-full bg-[#2F6F4E] text-white font-black text-[9px] flex items-center justify-center">
                  E
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-slate-600">
                  <span>elyqor.com</span>
                  <span>›</span>
                  <span className="text-slate-500">products</span>
                  <span>›</span>
                  <span className="text-slate-500 truncate max-w-[140px]">{selectedProduct.slug}</span>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-lg text-[#1a0dab] hover:underline font-medium cursor-pointer leading-tight mb-1">
                {customTitle || selectedProduct.name}
              </h4>

              {/* Rich Snippets / Ratings & Price */}
              <div className="flex items-center gap-2 text-[12px] text-slate-600 mb-1.5 font-sans">
                <div className="flex text-[#D9A441] text-xs">
                  {"★".repeat(Math.round(selectedProduct.rating))}
                  {"☆".repeat(5 - Math.round(selectedProduct.rating))}
                </div>
                <span className="font-bold text-[#0F2F2A]">Rating: {selectedProduct.rating}</span>
                <span>•</span>
                <span>{selectedProduct.reviewCount} reviews</span>
                <span>•</span>
                <span className="text-[#2F6F4E] font-black">৳ {selectedProduct.price} BDT</span>
                <span>•</span>
                <span className="text-slate-600 font-medium">{selectedProduct.stock > 0 ? "In stock" : "Out of stock"}</span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                {customDesc || selectedProduct.description}
              </p>
            </div>

            {/* Live Meta Tag Controls */}
            <div className="bg-[#F1F7ED] p-5 rounded-lg border border-[#2F6F4E]/20 space-y-3.5 text-xs">
              <div className="flex items-center justify-between text-[#0F2F2A] font-bold">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#2F6F4E]" />
                  <span>Meta Title & Snippet Live Tuner</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Real-Time Two-Way Sync</span>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>SEO Title Tag ({customTitle.length}/60 chars)</span>
                  <span className={customTitle.length <= 60 ? "text-[#2F6F4E] font-bold" : "text-[#D9A441] font-bold"}>
                    {customTitle.length <= 60 ? "Optimal Length ✓" : "Exceeds Standard"}
                  </span>
                </div>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-white border border-[#E6EFE2] rounded-xl px-3.5 py-2.5 text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Meta Description ({customDesc.length}/160 chars)</span>
                  <span className={customDesc.length <= 160 ? "text-[#2F6F4E] font-bold" : "text-[#D9A441] font-bold"}>
                    {customDesc.length <= 160 ? "Optimal Length ✓" : "Too Long"}
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  className="w-full bg-white border border-[#E6EFE2] rounded-xl px-3.5 py-2.5 text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E] resize-none"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-600 block mb-1 font-bold">Target Search Keyword</span>
                <input
                  type="text"
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  placeholder="e.g. Ultra 2 Titanium Smartwatch Bangladesh"
                  className="w-full bg-white border border-[#E6EFE2] rounded-xl px-3.5 py-2.5 text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
                />
              </div>
            </div>

            {/* Social Share Card Preview (OpenGraph / Facebook / Twitter) */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-3">
                <Share2 className="w-4 h-4 text-[#2F6F4E]" />
                <h4 className="font-black text-[#0F2F2A] text-xs">Social Share Preview (Open Graph og:image)</h4>
              </div>

              <div className="rounded-lg overflow-hidden border border-[#E6EFE2] bg-white max-w-md mx-auto shadow-xs card-hover-effect">
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedProduct.media[0]?.url}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur text-[10px] font-black text-[#2F6F4E] px-2.5 py-0.5 rounded-md border border-[#E6EFE2] shadow-xs">
                    VERIFIED ELYQOR
                  </div>
                </div>
                <div className="p-4 text-left">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">elyqor.com</span>
                  <p className="text-xs font-bold text-[#0F2F2A] truncate mt-0.5">{customTitle}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{customDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Schema.org Inspector & Audit Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Schema.org Structured Data Tab */}
          <div className="bg-white p-6 rounded-xl border border-[#E6EFE2] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-[#2F6F4E]" />
                <h3 className="font-black text-[#0F2F2A] text-sm">Schema.org JSON-LD Inspector</h3>
              </div>
              <button
                onClick={copySchemaToClipboard}
                className="flex items-center gap-1.5 text-[11px] bg-[#F1F7ED] hover:bg-[#E6EFE2] text-[#0F2F2A] font-bold px-3 py-1.5 rounded-xl border border-[#2F6F4E]/20 transition btn-press-effect"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#2F6F4E]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Schema"}</span>
              </button>
            </div>

            <div className="flex gap-1.5 p-1 bg-[#F1F7ED] rounded-lg border border-[#E6EFE2] text-xs">
              <button
                onClick={() => setActiveSchemaTab("product")}
                className={`flex-1 py-2 rounded-xl font-bold transition ${activeSchemaTab === "product" ? "bg-[#2F6F4E] text-white shadow-xs" : "text-slate-600 hover:text-[#0F2F2A]"}`}
              >
                Product
              </button>
              <button
                onClick={() => setActiveSchemaTab("org")}
                className={`flex-1 py-2 rounded-xl font-bold transition ${activeSchemaTab === "org" ? "bg-[#2F6F4E] text-white shadow-xs" : "text-slate-600 hover:text-[#0F2F2A]"}`}
              >
                Organization
              </button>
              <button
                onClick={() => setActiveSchemaTab("breadcrumb")}
                className={`flex-1 py-2 rounded-xl font-bold transition ${activeSchemaTab === "breadcrumb" ? "bg-[#2F6F4E] text-white shadow-xs" : "text-slate-600 hover:text-[#0F2F2A]"}`}
              >
                Breadcrumbs
              </button>
            </div>

            <pre className="p-4 rounded-lg bg-[#FAFCF9] border border-[#E6EFE2] text-[11px] font-mono text-[#0F2F2A] overflow-x-auto max-h-64 scrollbar-thin">
              {JSON.stringify(currentSchema, null, 2)}
            </pre>

            <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-[#F1F7ED] p-3 rounded-lg border border-[#2F6F4E]/20">
              <CheckCircle2 className="w-4 h-4 text-[#2F6F4E] shrink-0" />
              <span>Google Rich Results Validator: Schema syntax conforms to Schema.org standards (Offer, Currency: BDT).</span>
            </div>
          </div>

          {/* Detailed Audit Checklist */}
          <div className="bg-white p-6 rounded-xl border border-[#E6EFE2] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2F6F4E]" />
                <h3 className="font-black text-[#0F2F2A] text-sm">SEO Health Audit Checklist</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">SRS 14.1 Standard</span>
            </div>

            <div className="space-y-3">
              {MOCK_SEO_HEALTH.metrics.map((metric, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#FAFCF9] border border-[#E6EFE2] card-hover-effect">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0F2F2A]">{metric.name}</span>
                    <span className="text-[11px] font-mono font-black text-[#2F6F4E]">{metric.score}%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-[#F1F7ED] border border-[#2F6F4E]/20 text-xs space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Public Sitemap URLs:</span>
                <span className="font-black text-[#0F2F2A] font-mono">{MOCK_SEO_HEALTH.sitemapCount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Protected Private Routes:</span>
                <span className="font-bold text-[#D9A441] font-mono">{MOCK_SEO_HEALTH.noindexPages} (noindex)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SSR / ISR Edge Cache:</span>
                <span className="font-black text-[#2F6F4E]">Active & Warm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bangladesh High-Intent Keyword Rank Tracker */}
      <div className="bg-white p-6 rounded-xl border border-[#E6EFE2] shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2F6F4E]" />
            <h3 className="font-black text-[#0F2F2A] text-base">Search Console Verified Intent Queries</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Organic Impression Stream</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EFE2] text-slate-400">
                <th className="pb-3.5 font-bold uppercase tracking-wider">Search Query</th>
                <th className="pb-3.5 font-bold uppercase tracking-wider text-right">Impressions</th>
                <th className="pb-3.5 font-bold uppercase tracking-wider text-right">Clicks</th>
                <th className="pb-3.5 font-bold uppercase tracking-wider text-right">CTR</th>
                <th className="pb-3.5 font-bold uppercase tracking-wider text-right">SERP Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EFE2]">
              {MOCK_SEO_HEALTH.topKeywords.map((kw, i) => (
                <tr key={i} className="hover:bg-[#F1F7ED]/50 transition-colors">
                  <td className="py-3.5 font-black text-[#0F2F2A]">
                    {kw.keyword}
                  </td>
                  <td className="py-3.5 text-right text-slate-600 font-mono">
                    {kw.impressions.toLocaleString()}
                  </td>
                  <td className="py-3.5 text-right text-[#2F6F4E] font-black font-mono">
                    {kw.clicks.toLocaleString()}
                  </td>
                  <td className="py-3.5 text-right text-slate-600 font-mono">
                    {kw.ctr}
                  </td>
                  <td className="py-3.5 text-right font-mono">
                    <span className="bg-[#F1F7ED] text-[#2F6F4E] border border-[#2F6F4E]/30 px-2.5 py-0.5 rounded-full font-black">
                      #{kw.position}
                    </span>
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

