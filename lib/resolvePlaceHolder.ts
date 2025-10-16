import { TextPlaceHolderType } from "@/model/textPlaceHolderType";

export function resolvePlaceHolder(data?: string, category?: string, subcategory?: string, merchant?: string, state?: string, city?: string): string {
   const mapData: TextPlaceHolderType = {
      category: category ?? '',
      subcategory: subcategory ?? '',
      merchant: merchant ?? '',
      state: state ?? '',
      city: city ?? '',
   };

   return (
      data?.replace(/{(category|subcategory|merchant|state|city)}/gi, (_, key) => {
         return mapData[key as keyof TextPlaceHolderType] ?? '';
      }) ?? ''
   );
}