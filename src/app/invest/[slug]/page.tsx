import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageView, productMetadata } from "@/components/product/product-page-view";
import { getProductByPath, getProductsByGroup } from "@/lib/product/configs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProductsByGroup("invest")
    .filter((product) => product.path.startsWith("/invest/"))
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductByPath(`/invest/${slug}`);
  if (!product) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }
  return productMetadata(product);
}

export default async function InvestProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductByPath(`/invest/${slug}`);
  if (!product) notFound();
  return <ProductPageView product={product} />;
}
