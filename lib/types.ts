export type UserRole = "buyer" | "seller" | "authority" | "admin";

export type ApprovalStatus = "draft" | "pending" | "approved" | "rejected" | "suspended" | "archived";
export type PublicationStatus = "unpublished" | "published" | "archived";
export type ProductSource = "manual" | "meta_catalog" | "csv" | "api";

export interface SEOData {
  title: string;
  description: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface ProductMedia {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  watermarkApplied?: boolean;
  backgroundProcessed?: boolean;
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  storeSlug: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  brand?: string;
  sku: string;
  price: number; // in BDT
  compareAtPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  source: ProductSource;
  sourcePageName?: string;
  media: ProductMedia[];
  approvalStatus: ApprovalStatus;
  publicationStatus: PublicationStatus;
  seo: SEOData;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  ownerName: string;
  phone: string;
  isVerified: boolean;
  rating: number;
  totalProducts: number;
  totalSales: number;
  joinedDate: string;
  description: string;
  logo: string;
  coverImage: string;
  address: string;
  district: string;
  fbPageUrl?: string;
  commissionRatePercent: number;
}

export type FulfillmentStatus = 
  | "pending_confirmation"
  | "confirmed"
  | "processing"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "return_requested";

export interface OrderItem {
  productId: string;
  productName: string;
  slug: string;
  imageUrl: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface SellerOrder {
  id: string;
  parentOrderNumber: string;
  sellerId: string;
  sellerName: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  city: string;
  items: OrderItem[];
  subtotal: number;
  shippingCharge: number;
  platformCommission: number;
  sellerPayable: number;
  paymentMethod: "cod" | "online";
  paymentStatus: "paid" | "pending" | "reconciled";
  fulfillmentStatus: FulfillmentStatus;
  courierProvider?: "Steadfast" | "Pathao" | "RedX" | "Paperfly";
  trackingNumber?: string;
  dispatchDate?: string;
  createdAt: string;
}

export interface MetaImportJob {
  jobId: string;
  provider: "meta" | "csv";
  sourcePageName: string;
  sourceCatalogId: string;
  status: "queued" | "processing" | "completed" | "completed_with_errors" | "failed";
  total: number;
  completed: number;
  failed: number;
  skipped: number;
  startedAt: string;
  finishedAt?: string;
  errorSummary?: string[];
}

export interface SEOAuditMetric {
  name: string;
  score: number; // 0 - 100
  status: "good" | "warning" | "error";
  description: string;
  recommendation?: string;
}

export interface SEOHealthReport {
  overallScore: number;
  metrics: SEOAuditMetric[];
  sitemapCount: number;
  robotsTxtActive: boolean;
  indexedPages: number;
  noindexPages: number;
  structuredDataTypes: string[];
  coreWebVitals: {
    lcp: string; // Largest Contentful Paint (e.g. 1.2s)
    fid: string; // First Input Delay (e.g. 15ms)
    cls: string; // Cumulative Layout Shift (e.g. 0.02)
    inp: string; // Interaction to Next Paint
  };
  topKeywords: {
    keyword: string;
    impressions: number;
    clicks: number;
    ctr: string;
    position: number;
  }[];
}

export interface LedgerEntry {
  id: string;
  timestamp: string;
  type: "credit" | "debit";
  account: "Commission Revenue" | "Seller Payable" | "Gateway Clearing" | "COD Receivable" | "Refund Reserve";
  amount: number;
  referenceType: "Order" | "Payout" | "Commission" | "Reconciliation";
  referenceId: string;
  description: string;
}

