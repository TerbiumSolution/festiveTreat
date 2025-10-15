import { notFound } from "next/navigation";
import { BlockRenderer } from "@/lib/dataProvider";
import { getPageBlocks, getSeoBlock } from "@/lib/dataLayer";
import { LayoutConstant } from "@/lib/constants/constants";
import { resolvePlaceHolder } from "@/lib/resolvePlaceHolder";
import { nanoid } from "nanoid";
export const revalidate = 3600;

type Props = {
   params: Promise<{ slug?: string[] }>,
   // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export async function generateMetadata({ params }: Props) {
   const { slug: slugArray } = await params;
  const slug = slugArray?.[0] ?? '';
  const subSlug = slugArray?.[1] ?? '';

   const { metaTitle, metaDescription, category, subcategory, merchant, state, city } = await getSeoBlock(slug, subSlug)
   const seoTitle = resolvePlaceHolder(metaTitle, category?.name, subcategory?.name, merchant?.name, state?.name, city?.name);
   const seoDescription = resolvePlaceHolder(metaDescription, category?.name, subcategory?.name, merchant?.name, state?.name, city?.name);
   const canonicalUrl = process.env.NEXT_PUBLIC_APP_BASE_URL + (subSlug ? `${slug}/${subSlug}` : slug)
   const isIndex = process.env.NEXT_PUBLIC_INDEX === 'true';

   const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL;
   if (!baseUrl) throw new Error("NEXT_PUBLIC_APP_BASE_URL is not defined");
   return {
      title: seoTitle,
      description: seoDescription,
      alternates: {
         canonical: canonicalUrl
      },

      metadataBase: new URL(baseUrl),
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
      index: isIndex,
      follow: isIndex,
      nocache: false,
      googleBot: {
         index: isIndex,
         follow: isIndex,
         noimageindex: false,
      }
      },
   };
};

export default async function Page({ params }: Props) {
   const { slug: slugArray } = await params;
   const slug = slugArray?.[0] ?? '';
   const subSlug = slugArray?.[1] ?? '';

   const { layout, blocks, deals, categories, states, category, subcategory, merchant, state, city } = await getPageBlocks(slug, subSlug);

   if (layout === LayoutConstant.PAGE_NOT_FOUND) return notFound();

   const heroBannerComponent = blocks?.find((block: any) => block.__component === 'shared.hero-banner-carousal');
   return (
      blocks.map((block: any) =>
         <div key={`${block.id || block.documentId || block.__component}-${nanoid()}`}>{BlockRenderer(layout, block, heroBannerComponent?.title, deals, categories, states, category, subcategory, merchant, state, city)}</div>
      )
   );
}