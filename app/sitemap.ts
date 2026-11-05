import { MetadataRoute } from "next";
import { MOCK_PRODUCTS, MOCK_STORES } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://elyqor.com";

  // Static core indexable pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Dynamic public product pages (only approved & published ones per SRS 14.3)
  const productPages: MetadataRoute.Sitemap = MOCK_PRODUCTS
    .filter(p => p.approvalStatus === "approved" && p.publicationStatus === "published")
    .map(product => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  // Dynamic public store pages
  const storePages: MetadataRoute.Sitemap = MOCK_STORES.map(store => ({
    url: `${baseUrl}/stores/${store.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages, ...storePages];
}

