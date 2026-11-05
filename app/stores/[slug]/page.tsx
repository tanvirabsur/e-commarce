import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  ArrowLeft, 
  Share2, 
  ShoppingBag,
  Award,
  Package
} from "lucide-react";
import { MOCK_STORES, MOCK_PRODUCTS } from "@/lib/mock-data";
import { generateStoreSchema } from "@/lib/seo-config";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return MOCK_STORES.map((store) => ({
    slug: store.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = MOCK_STORES.find((s) => s.slug === slug);

  if (!store) {
    return {
      title: "Store Not Found | Elyqor",
      description: "The requested seller store is not available.",
    };
  }

  return {
    title: `${store.name} - Verified Merchant in ${store.district} | Elyqor`,
    description: `Shop authentic products from ${store.name} on Elyqor Marketplace. Verified social commerce seller based in ${store.district}, Bangladesh with Cash on Delivery.`,
    alternates: {
      canonical: `https://elyqor.com/stores/${store.slug}`,
    },
    openGraph: {
      title: `${store.name} | Elyqor Bangladesh`,
      description: store.description,
      images: [{ url: store.coverImage, alt: store.name }],
    },
  };
}

export default async function StorePage({ params }: PageProps) {
  const { slug } = await params;
  const store = MOCK_STORES.find((s) => s.slug === slug);

  if (!store) {
    notFound();
  }

  const storeSchema = generateStoreSchema(store);
  const storeProducts = MOCK_PRODUCTS.filter(p => p.storeSlug === slug && p.approvalStatus === "approved");

  return (
    <div className="min-h-screen bg-[#FAFCF9] text-[#0F2F2A] flex flex-col font-sans">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />

      {/* Header */}
      <header className="bg-white border-b border-[#E6EFE2] sticky top-0 z-50 shadow-xs">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="font-black text-2xl tracking-tight text-[#0F2F2A]">
            ELYQOR
          </Link>
          <Link 
            href="/" 
            className="text-xs font-bold text-slate-600 hover:text-[#2F6F4E] flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </header>

      {/* Store Cover Banner & Profile */}
      <div className="relative">
        <div className="h-48 md:h-64 w-full bg-slate-100 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={store.coverImage} alt={store.name} className="w-full h-full object-cover" />
        </div>

        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative -mt-16 sm:-mt-20">
          <div className="bg-white border border-[#E6EFE2] rounded-xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={store.logo}
                alt={store.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border-2 border-[#2F6F4E] bg-white shadow-xs shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-[#0F2F2A]">{store.name}</h1>
                  <span className="p-1 rounded-full bg-[#F1F7ED] text-[#2F6F4E]">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
                  {store.description}
                </p>
                <div className="flex flex-wrap items-center gap-3.5 mt-2.5 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {store.address}, {store.district}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-[#D9A441]">
                    <Star className="w-3.5 h-3.5 fill-[#D9A441]" />
                    {store.rating} Rating
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-[#2F6F4E]">
                    <Award className="w-3.5 h-3.5 text-[#2F6F4E]" />
                    {store.totalSales.toLocaleString()}+ Verified Orders
                  </span>
                </div>
              </div>
            </div>

            {store.fbPageUrl && (
              <a
                href={store.fbPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-white bg-[#2F6F4E] hover:bg-[#0F2F2A] px-5 py-2.5 rounded-xl transition shrink-0 shadow-xs btn-press-effect"
              >
                <Share2 className="w-4 h-4" />
                <span>Visit Facebook Store</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Store Catalog Section */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12 w-full flex-1">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E6EFE2]">
          <div>
            <h2 className="text-xl font-black text-[#0F2F2A] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2F6F4E]" />
              <span>Available Products ({storeProducts.length})</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              100% authentic inventory approved under Elyqor compliance guidelines
            </p>
          </div>
        </div>

        {storeProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center border border-[#E6EFE2] text-slate-400 text-xs">
            <Package className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            No products are currently published for this store.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {storeProducts.map(p => (
              <article 
                key={p.id} 
                className="bg-white rounded-lg border border-[#E6EFE2] overflow-hidden flex flex-col justify-between shadow-xs card-hover-effect"
              >
                <div>
                  <div className="aspect-square bg-slate-50 overflow-hidden relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={p.media[0]?.url} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    {p.media[0]?.watermarkApplied && (
                      <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[10px] font-black text-[#2F6F4E] px-2 py-0.5 rounded shadow-xs border border-[#2F6F4E]/20">
                        VERIFIED
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F6F4E] bg-[#F1F7ED] px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                    <h3 className="font-bold text-[#0F2F2A] text-xs line-clamp-2 hover:text-[#2F6F4E] transition">
                      <Link href={`/products/${p.slug}`}>
                        {p.name}
                      </Link>
                    </h3>
                    <div className="font-black text-[#2F6F4E] text-base pt-1">
                      ৳ {p.price.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link
                    href={`/products/${p.slug}`}
                    className="w-full py-2.5 rounded-xl bg-[#F1F7ED] hover:bg-[#2F6F4E] text-[#0F2F2A] hover:text-white font-bold text-xs flex items-center justify-center transition btn-press-effect"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

