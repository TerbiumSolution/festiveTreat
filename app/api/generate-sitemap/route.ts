import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getCategoryData, getDealData, getStateData } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000/';
const SITEMAP_LIMIT = 50000;

const formatUrl = (url: string, date: string): string => `
  <url>
    <loc>${BASE_URL + url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;

async function writeSitemapFiles(urls: string[], currentDate: string): Promise<void> {
   const totalFiles = Math.ceil(urls.length / SITEMAP_LIMIT);
   const sitemapFilenames: string[] = [];

   await Promise.all(
      Array.from({ length: totalFiles }, async (_, index) => {
         const slice = urls
            .slice(index * SITEMAP_LIMIT, (index + 1) * SITEMAP_LIMIT)
            .map(url => formatUrl(url, currentDate))
            .join('');

         const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${slice}\n</urlset>`;
         const filename = `sitemap${totalFiles > 1 ? index + 1 : ''}.xml`;

         sitemapFilenames.push(filename);
         await fs.writeFile(path.join(process.cwd(), 'public', filename), xml);
      })
   );

   // Write sitemap index only if there's more than one sitemap
   if (sitemapFilenames.length > 1) {
      const indexXml =
         `<?xml version="1.0" encoding="UTF-8"?>\n` +
         `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
         sitemapFilenames
            .map(filename => `
   <sitemap>
     <loc>${BASE_URL}${filename}</loc>
     <lastmod>${currentDate}</lastmod>
   </sitemap>`)
            .join('') +
         `\n</sitemapindex>`;

      await fs.writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), indexXml);
   }
}

async function generateUrlCombinations(): Promise<string[]> {
   const urls: string[] = [''];

   const [categories, deals, states] = await Promise.all([
      getCategoryData(),
      getDealData(),
      getStateData()
   ]);

   const stateConfigs = states.map(state => ({
      slug: state.slug,
      citySlugs: state.cities.map(city => city.slug)
   }));

   for (const category of categories) {
      urls.push(category.slug);

      for (const { slug: stateSlug, citySlugs } of stateConfigs) {
         urls.push(`${category.slug}/${stateSlug}`);
         for (const citySlug of citySlugs) {
            urls.push(`${category.slug}/${citySlug}`);
         }
      }

      for (const subcategory of category.subcategories) {
         const subcategorySlug = subcategory.slug;
         urls.push(`${category.slug}/${subcategorySlug}`);

         for (const { slug: stateSlug, citySlugs } of stateConfigs) {
            urls.push(`${subcategorySlug}/${stateSlug}`);
            for (const citySlug of citySlugs) {
               urls.push(`${subcategorySlug}/${citySlug}`);
            }
         }
      }
   }

   const processedMerchants = new Set<string>();
   for (const deal of deals) {
      const merchantSlug = deal.subcategoryMerchants[0].merchant.slug;
      const subcategorySlug = deal.subcategoryMerchants[0].subcategory.slug;
      urls.push(`${subcategorySlug}/${merchantSlug}`);

      if (!processedMerchants.has(merchantSlug)) {
         for (const { slug: stateSlug, citySlugs } of stateConfigs) {
            urls.push(`${merchantSlug}/${stateSlug}`);
            for (const citySlug of citySlugs) {
               urls.push(`${merchantSlug}/${citySlug}`);
            }
         }
         processedMerchants.add(merchantSlug);
      }
   }

   return urls;
}

export async function POST() {
   try {
      const urls = await generateUrlCombinations();
      const currentDate = new Date().toISOString();

      await writeSitemapFiles(urls, currentDate);

      return NextResponse.json({ message: 'Sitemap generated successfully!' }, { status: 200 });
   } catch (error) {
      console.error('Sitemap generation error:', error);
      return NextResponse.json({
         error: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
   }
}