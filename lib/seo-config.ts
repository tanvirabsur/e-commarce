import { Product, Store } from "./types";

export const SITE_CONFIG = {
  name: "Elyqor",
  tagline: "Bangladesh Multi-Vendor Social Commerce Marketplace",
  description: "Bangladesh's premier verified multi-vendor social commerce marketplace. Discover authenticated products from top boutique merchants with nationwide Cash on Delivery.",
  url: "https://elyqor.com",
  currency: "BDT",
  currencySymbol: "৳",
  locale: "en_BD",
  contact: {
    phone: "+880 9612-000000",
    email: "support@elyqor.com",
    address: "Gulshan-2, Dhaka-1212, Bangladesh",
  },
  social: {
    facebook: "https://facebook.com/elyqor.official",
    instagram: "https://instagram.com/elyqor.official",
    youtube: "https://youtube.com/@elyqor",
  }
};

/**
 * Generate Schema.org JSON-LD for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/logo.png`,
    "description": SITE_CONFIG.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": SITE_CONFIG.contact.phone,
      "contactType": "customer service",
      "areaServed": "BD",
      "availableLanguage": ["bn", "en"]
    },
    "sameAs": [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.youtube
    ]
  };
}

/**
 * Generate Schema.org JSON-LD for Product
 */
export function generateProductSchema(product: Product) {
  const primaryImage = product.media.find(m => m.isPrimary)?.url || product.media[0]?.url;
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.media.map(m => m.url),
    "description": product.description,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand || product.sellerName
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_CONFIG.url}/products/${product.slug}`,
      "priceCurrency": "BDT",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stock > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": product.sellerName
      }
    },
    "aggregateRating": product.reviewCount > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating.toString(),
      "reviewCount": product.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    } : undefined
  };
}

/**
 * Generate Schema.org JSON-LD for Store / LocalBusiness
 */
export function generateStoreSchema(store: Store) {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": store.name,
    "image": store.logo,
    "telephone": store.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": store.address,
      "addressLocality": store.district,
      "addressCountry": "BD"
    },
    "priceRange": "৳৳",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": store.rating.toString(),
      "reviewCount": store.totalSales.toString()
    }
  };
}

/**
 * Generate Schema.org JSON-LD for Breadcrumbs
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

