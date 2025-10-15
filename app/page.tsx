import { headers } from 'next/headers';
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/lib/dataProvider";
import { getPageBlocks } from "@/lib/dataLayer";
import { LayoutConstant } from "@/lib/constants/constants";
import { resolvePlaceHolder } from "@/lib/resolvePlaceHolder";

type Props = {
  params: Promise<{ slug?: string[] }>,
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export async function generateMetadata({ params }: Props) {

  const { blocks } = await getPageBlocks();

  const seoComponent = blocks?.find((block: any) => block.__component === 'shared.seo');
  const seoTitle = seoComponent?.metaTitle;
  const seoDescription = seoComponent?.metaDescription;
  const canonicalUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_BASE_URL!),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'Festive Treats | HDFC',
      type: 'website',
      locale: 'en',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}favicon.ico`, // Or from SEO block
          width: 1200,
          height: 630,
          alt: seoTitle,
        }
      ]
    },
    robots: {
      index: process.env.NEXT_PUBLIC_INDEX === 'true' ? true : false,
      follow: process.env.NEXT_PUBLIC_INDEX === 'true' ? true : false,
      nocache: false,
      googleBot: {
        index: process.env.NEXT_PUBLIC_INDEX === 'true' ? true : false,
        follow: process.env.NEXT_PUBLIC_INDEX === 'true' ? true : false,
        noimageindex: false,
      }
    },
  };
};

export default async function Page({ params }: Props) {
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') || "";
  const { layout, blocks, deals, categories, states } = await getPageBlocks();
  if (layout === LayoutConstant.PAGE_NOT_FOUND) return notFound();

  const heroBannerComponent = blocks?.find((block: any) => block.__component === 'shared.hero-banner-carousal');
  return (
    blocks.map((block: any, index: number) =>
      <div key={index}>{BlockRenderer(layout, nonce, block, heroBannerComponent?.title, deals, categories, states)}</div>
    )
  );
}