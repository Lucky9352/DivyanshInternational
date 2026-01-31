import type { Metadata } from "next";
import CatalogueViewer from "@/components/CatalogueViewer";
import { client } from "@/lib/sanity/client";
import { productsQuery, siteSettingsQuery } from "@/lib/sanity/queries";
import type { Product } from "@/sanity.types";

export const revalidate = 60;

const DEFAULT_META = {
  title: "Product Catalogue | Divyansh International",
  description:
    "Browse our interactive product catalogue featuring premium quality dry fruits, nuts, and specialty products.",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await client.fetch(siteSettingsQuery);

    const orgName = siteSettings?.organization?.name || "Divyansh International";
    const pageTitle = `Product Catalogue | ${orgName}`;

    return {
      title: pageTitle,
      description: DEFAULT_META.description,
      openGraph: {
        title: pageTitle,
        description: DEFAULT_META.description,
        type: "website",
      },
    };
  } catch {
    return {
      title: DEFAULT_META.title,
      description: DEFAULT_META.description,
    };
  }
}

export default async function CataloguePage() {
  const products: Product[] = await client.fetch(productsQuery);

  return <CatalogueViewer products={products} />;
}
