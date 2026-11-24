"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Globe, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowLeft, 
  AlertCircle 
} from "lucide-react";

export default function NewProductSEOAssistantPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("25");
  const [description, setDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Auto-slug generator
  const handleNameChange = (val: string) => {
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60);
    setSlug(generatedSlug);
  };

  // Calculate dynamic SEO health score (0-100)
  const calculateScore = () => {
    let score = 0;
    if (name.length >= 30 && name.length <= 65) score += 25;
    else if (name.length > 0) score += 10;

    if (description.length >= 80) score += 25;
    else if (description.length > 0) score += 10;

    if (focusKeyword && name.toLowerCase().includes(focusKeyword.toLowerCase())) score += 20;

    if (imageAlt.length >= 10) score += 15;

    if (slug.length >= 5) score += 15;

    return Math.min(100, score);
  };

  const seoScore = calculateScore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <Link
          href="/seller/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0F2F2A] transition"
        >
          <ArrowLeft className="w-4 h-4 text-[#2F6F4E]" />
          <span>Back to Product Catalog</span>
        </Link>

        {/* Dynamic SEO Score Badge */}
        <div className="flex items-center gap-2 bg-white border border-[#2F6F4E]/30 px-4 py-2 rounded-lg shadow-xs">
          <Sparkles className="w-4 h-4 text-[#2F6F4E]" />
          <span className="text-xs text-slate-600 font-bold">Live SEO Strength:</span>
          <span className={`text-xs font-black font-mono px-2.5 py-0.5 rounded-full ${
            seoScore >= 80 ? "bg-[#F1F7ED] text-[#2F6F4E]" :
            seoScore >= 50 ? "bg-[#FAF3E0] text-[#D9A441]" :
            "bg-red-50 text-red-600"
          }`}>
            {seoScore}%
          </span>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white p-10 rounded-md border border-[#E6EFE2] text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#F1F7ED] text-[#2F6F4E] flex items-center justify-center mx-auto border border-[#2F6F4E]/30 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#0F2F2A]">Product Submitted for Review</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your listing has been submitted to the Authority moderation queue (SRS 4.2). Once compliance checks complete, it will be indexed and published.
          </p>
          <div className="pt-2">
            <Link
              href="/seller/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white text-xs font-bold transition shadow-xs"
            >
              <span>Return to Products</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Product Fields (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-md border border-[#E6EFE2] space-y-5 shadow-xs">
            <h3 className="font-black text-[#0F2F2A] text-lg">Product Details & Catalog Listing</h3>

            {/* Product Title */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <label className="font-bold text-[#0F2F2A]">Product Title (SEO Title) *</label>
                <span className={name.length >= 40 && name.length <= 65 ? "text-[#2F6F4E] font-bold" : "text-slate-400"}>
                  {name.length}/60 characters
                </span>
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Ultra 2 Titanium Smartwatch - 2.19 AMOLED Display"
                className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-lg px-4 py-3 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
              />
            </div>

            {/* URL Slug Preview */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">
                Canonical URL Slug
              </label>
              <div className="flex items-center bg-[#F1F7ED] border border-[#E6EFE2] rounded-lg px-4 py-2.5 text-xs font-mono text-slate-600">
                <span className="text-slate-400">elyqor.com/products/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-transparent border-none text-[#2F6F4E] font-bold focus:outline-none ml-0.5 flex-1"
                />
              </div>
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0F2F2A] mb-1.5">Unit Price (BDT ৳) *</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="1850"
                  className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-lg px-4 py-3 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0F2F2A] mb-1.5">Initial Inventory Stock *</label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="25"
                  className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-lg px-4 py-3 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
                />
              </div>
            </div>

            {/* Focus Keyword */}
            <div>
              <label className="block text-xs font-bold text-[#0F2F2A] mb-1.5">
                Target Organic Search Keyword
              </label>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="e.g. Titanium smartwatch price BD"
                className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-lg px-4 py-3 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <label className="font-bold text-[#0F2F2A]">Full Description & Specifications *</label>
                <span>{description.length} chars</span>
              </div>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail key biometric tracking, display resolution, battery endurance..."
                className="w-full bg-[#FAFCF9] border border-[#E6EFE2] rounded-lg px-4 py-3 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E] resize-none"
              />
            </div>

            {/* Image Alt Tag & Watermark */}
            <div className="p-5 rounded-lg bg-[#F1F7ED] border border-[#2F6F4E]/20 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F2F2A] flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#2F6F4E]" />
                  <span>Media Asset Branding & Alt Tags</span>
                </span>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-bold">
                  <input
                    type="checkbox"
                    checked={watermarkEnabled}
                    onChange={(e) => setWatermarkEnabled(e.target.checked)}
                    className="rounded border-slate-300 text-[#2F6F4E] focus:ring-0"
                  />
                  <span>Apply Verified Watermark</span>
                </label>
              </div>

              <div>
                <label className="block text-[11px] text-slate-600 mb-1 font-bold">
                  Image Descriptive Alt Tag (for Google Image Search)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Ultra 2 Titanium Smartwatch front view with sport band"
                  className="w-full bg-white border border-[#E6EFE2] rounded-md px-3.5 py-2 text-xs text-[#0F2F2A] focus:outline-none focus:border-[#2F6F4E]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white font-bold text-xs shadow-md transition btn-press-effect"
            >
              Submit Listing for Moderation Review
            </button>
          </div>

          {/* Right Preview: Live Google Snippet (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white p-6 sm:p-8 rounded-md border border-[#E6EFE2] space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-black text-[#0F2F2A]">
                <Globe className="w-4 h-4 text-[#2F6F4E]" />
                <span>Google SERP Live Snippet</span>
              </div>

              <div className="p-5 rounded-lg bg-[#FAFCF9] text-slate-900 border border-[#E6EFE2] text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 text-[10px] mb-1 font-mono">
                  <span>elyqor.com</span>
                  <span>›</span>
                  <span className="text-slate-600">products</span>
                  <span>›</span>
                  <span className="text-slate-400">{slug || "product-slug"}</span>
                </div>

                <h4 className="text-base text-[#1a0dab] font-medium leading-snug line-clamp-1">
                  {name || "Your product title will render here on search"}
                </h4>

                <div className="text-[11px] text-[#2F6F4E] font-black my-1">
                  ৳ {price || "0"} BDT • In stock • Elyqor Verified
                </div>

                <p className="text-[11px] text-[#4d5156] line-clamp-2 leading-relaxed">
                  {description || "Meta description rich snippet rendering with exact keywords..."}
                </p>
              </div>

              {/* Checklist helper */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  {name.length >= 30 ? (
                    <CheckCircle2 className="w-4 h-4 text-[#2F6F4E]" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-[#D9A441]" />
                  )}
                  <span className={name.length >= 30 ? "text-[#0F2F2A] font-bold" : "text-slate-400"}>
                    Title meets optimal length (30-65 chars)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {description.length >= 80 ? (
                    <CheckCircle2 className="w-4 h-4 text-[#2F6F4E]" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-[#D9A441]" />
                  )}
                  <span className={description.length >= 80 ? "text-[#0F2F2A] font-bold" : "text-slate-400"}>
                    Comprehensive description provided (80+ chars)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {imageAlt ? (
                    <CheckCircle2 className="w-4 h-4 text-[#2F6F4E]" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-[#D9A441]" />
                  )}
                  <span className={imageAlt ? "text-[#0F2F2A] font-bold" : "text-slate-400"}>
                    Descriptive image alt tag defined
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

