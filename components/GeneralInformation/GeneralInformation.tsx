import { resolvePlaceHolder } from "@/lib/resolvePlaceHolder";
import { ComponentPropsType } from "@/model/componentPropsType"
import { LayoutConstant } from "@/lib/constants/constants";

import styles from "@/components/GeneralInformation/GeneralInformation.module.css"
import { CategoryType } from "@/model/categoryType";
import { SubcategoryType } from "@/model/subcategoryType";
import { MerchantType } from "@/model/merchantType";
import { StateType } from "@/model/stateType";
import { CityType } from "@/model/cityType";

const getContent = (
  layout: string,
  props?: any,
  category?: CategoryType,
  subcategory?: SubcategoryType,
  merchant?: MerchantType,
  state?: StateType,
  city?: CityType
): string => {
  const content = props?.content || '';

  const applyPlaceholder = (
    catName = '',
    subcatName = '',
    merchName = '',
    stateName = '',
    cityName = ''
  ) => resolvePlaceHolder(content, catName, subcatName, merchName, stateName, cityName) || '';

  switch (layout) {
    case LayoutConstant.HOME:
      return props?.content ?? '';

    case LayoutConstant.CATEGORY:
      return category?.categoryContent?.content ?? '';

    case LayoutConstant.CATEGORY_STATE:
      return applyPlaceholder(category?.name, '', '', state?.name);

    case LayoutConstant.CATEGORY_CITY:
      return applyPlaceholder(category?.name, '', '', state?.name, city?.name);

    case LayoutConstant.SUBCATEGORY:
      return subcategory?.subcategoryContent?.content ?? '';

    case LayoutConstant.SUBCATEGORY_STATE:
      return applyPlaceholder(category?.name, subcategory?.name, '', state?.name);

    case LayoutConstant.SUBCATEGORY_CITY:
      return applyPlaceholder(category?.name, subcategory?.name, '', state?.name, city?.name);

    case LayoutConstant.MERCHANT:
      return merchant?.merchantContent?.content ?? '';

    case LayoutConstant.MERCHANT_STATE:
      return applyPlaceholder('', subcategory?.name, merchant?.name, state?.name);

    case LayoutConstant.MERCHANT_CITY:
      return applyPlaceholder('', subcategory?.name, merchant?.name, state?.name, city?.name);

    default:
      return '';
  }
};

export default function GeneralInformation({ props, context, }: Readonly<{ context: ComponentPropsType; props: any; }>) {
    const { layout, category, subcategory, merchant, city, state } = context;
    const content = getContent(layout, props, category, subcategory, merchant, state, city);

    if (content)
    return (
        <section className={`${styles.general_wrapper} bg-[var(--bg-grey)] md:pt-15 md:pb-15 md:px-16 px-4 py-10`}>
            <div className="max-w-7xl mx-auto" dangerouslySetInnerHTML={{ __html: content }} />
        </section>
    )
}
