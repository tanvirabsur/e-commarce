import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  ArrowLeft, 
  Check, 
  Store, 
  CreditCard,
  ShoppingBag,
  Share2,
  PackageCheck
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo-config";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Elyqor",
      description: "The requested product is not available.",
    };
  }

  const primaryImage = product.media.find((m) => m.isPrimary)?.url || product.media[0]?.url;

  return {
    title: `${product.name} | Buy Online at Elyqor Bangladesh`,
    description: product.seo.description,
    alternates: {
      canonical: product.seo.canonicalUrl || `https://elyqor.com/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Elyqor Marketplace`,
      description: product.seo.description,
      url: `https://elyqor.com/products/${product.slug}`,
      siteName: "Elyqor",
      images: primaryImage ? [{ url: primaryImage, alt: product.name }] : [],
      type: "website",
      locale: "en_BD",
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo.title,
      description: product.seo.description,
      images: primaryImage ? [primaryImage] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://elyqor.com" },
    { name: product.category, url: `https://elyqor.com/categories/${product.categorySlug}` },
    { name: product.name, url: `https://elyqor.com/products/${product.slug}` }
  ]);

  const discountPercent = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#FAFCF9] text-[#0F2F2A] flex flex-col font-sans">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <header className="bg-white border-b border-[#E6EFE2] sticky top-0 z-50 shadow-xs">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-2xl tracking-tight text-[#0F2F2A]">
            ELYQOR
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-[#2F6F4E] flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Marketplace</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-8 w-full flex-1">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#2F6F4E] transition font-medium">Home</Link>
          <span>›</span>
          <span className="text-slate-600 font-medium">{product.category}</span>
          <span>›</span>
          <span className="text-[#0F2F2A] font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-white border border-[#E6EFE2] relative shadow-xs group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.media[0]?.url}
                alt={product.media[0]?.alt || product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {product.media[0]?.watermarkApplied && (
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-xs font-black text-[#2F6F4E] px-3.5 py-1.5 rounded-xl border border-[#2F6F4E]/20 shadow-md flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2F6F4E]" />
                  <span>ELYQOR VERIFIED</span>
                </div>
              )}

              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#D9A441] text-[#0F2F2A] text-xs font-black px-3 py-1.5 rounded-xl shadow-md">
                  SAVE {discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.media.length > 1 && (
              <div className="flex gap-3">
                {product.media.map((m, idx) => (
                  <div 
                    key={m.id} 
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 bg-white cursor-pointer transition ${
                      idx === 0 ? "border-[#2F6F4E] shadow-xs" : "border-[#E6EFE2] hover:border-slate-300"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.url} alt={m.alt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                <span className="bg-[#F1F7ED] px-2.5 py-0.5 rounded-lg font-mono font-bold text-[#2F6F4E] border border-[#2F6F4E]/20">
                  {product.sku}
                </span>
                <span>•</span>
                <span className="text-[#2F6F4E] font-bold">{product.category}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#0F2F2A] leading-snug">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1 text-[#D9A441] text-sm">
                  <Star className="w-4 h-4 fill-[#D9A441]" />
                  <span className="font-black text-[#0F2F2A]">{product.rating}</span>
                </div>
                <span className="text-xs text-slate-500">
                  ({product.reviewCount} Verified Buyer Reviews)
                </span>
                <span className="text-xs text-[#2F6F4E] font-black bg-[#F1F7ED] px-3 py-1 rounded-full border border-[#2F6F4E]/30 flex items-center gap-1">
                  <PackageCheck className="w-3.5 h-3.5" />
                  <span>In Stock ({product.stock} units available)</span>
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-lg bg-[#F1F7ED] border border-[#2F6F4E]/20 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-[#2F6F4E]">
                ৳ {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-slate-400 line-through">
                  ৳ {product.compareAtPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-[#0F2F2A] font-bold ml-auto bg-white px-3 py-1.5 rounded-xl border border-[#E6EFE2] shadow-xs">
                Cash on Delivery Available
              </span>
            </div>

            {/* Seller Info Card */}
            <div className="p-4 rounded-lg bg-white border border-[#E6EFE2] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#F1F7ED] flex items-center justify-center text-[#2F6F4E] font-bold">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0F2F2A] text-xs sm:text-sm flex items-center gap-1">
                    {product.sellerName}
                    <ShieldCheck className="w-4 h-4 text-[#2F6F4E]" />
                  </h4>
                  <p className="text-[11px] text-slate-500">Verified Social Commerce Merchant</p>
                </div>
              </div>

              <Link
                href={`/stores/${product.storeSlug}`}
                className="text-xs text-[#2F6F4E] font-bold hover:underline px-3 py-1.5 rounded-lg bg-[#FAFCF9] border border-[#E6EFE2]"
              >
                Visit Store
              </Link>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-extrabold text-[#0F2F2A] text-sm">Product Overview:</h3>
              <p className="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-lg border border-[#E6EFE2]">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-extrabold text-[#0F2F2A] text-sm">Key Specifications:</h3>
                <ul className="space-y-2 text-xs text-slate-700 bg-white p-4 rounded-lg border border-[#E6EFE2]">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#2F6F4E] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                className="w-full py-4 rounded-lg bg-[#2F6F4E] hover:bg-[#0F2F2A] text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 btn-press-effect"
              >
                <CreditCard className="w-4 h-4" />
                <span>Place Order with Cash on Delivery</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#E6EFE2] shadow-xs">
                <Truck className="w-4 h-4 text-[#2F6F4E] shrink-0" />
                <span>Nationwide delivery within 48-72 hours</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#E6EFE2] shadow-xs">
                <RotateCcw className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>7-Day free replacement warranty</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

