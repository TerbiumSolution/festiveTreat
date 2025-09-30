import { CacheConstant } from '@/lib/constants/constants';
import { revalidateTag } from 'next/cache';

export async function POST() {
   revalidateTag(CacheConstant.revalidateTag);
   return Response.json({ revalidated: true });
}