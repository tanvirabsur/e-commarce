import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://elyqor.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/products/",
          "/stores/",
          "/categories/",
          "/about",
          "/contact",
          "/terms",
          "/privacy"
        ],
        disallow: [
          "/admin/",
          "/seller/",
          "/account/",
          "/checkout/",
          "/api/",
          "/cart/"
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/seller/", "/account/"],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

