import { resolvePlaceHolder } from "@/lib/resolvePlaceHolder";
import { ComponentPropsType } from "@/model/componentPropsType"
import { LayoutConstant } from "@/lib/constants/constants";

import styles from "@/components/GeneralInformation/GeneralInformation.module.css"
import { CategoryType } from "@/model/categoryType";
import { SubcategoryType } from "@/model/subcategoryType";
import { MerchantType } from "@/model/merchantType";
import { StateType } from "@/model/stateType";
import { CityType } from "@/model/cityType";

const getContent = (layout: string, props?: any, category?: CategoryType, subcategory?: SubcategoryType, merchant?: MerchantType, state?: StateType, city?: CityType): string => {
    switch (layout) {
        case LayoutConstant.HOME:
            return props.content;
        case LayoutConstant.CATEGORY:
            return category?.categoryContent?.content || '';
        case LayoutConstant.CATEGORY_STATE:
            return resolvePlaceHolder(props?.content || '', category?.name, '', '', state?.name, '') || '';
        case LayoutConstant.CATEGORY_CITY:
            return resolvePlaceHolder(props?.content || '', category?.name, '', '', state?.name, city?.name) || '';
        case LayoutConstant.SUBCATEGORY:
            return subcategory?.subcategoryContent?.content || '';
        case LayoutConstant.SUBCATEGORY_STATE:
            return resolvePlaceHolder(props?.content || '', category?.name, subcategory?.name, '', state?.name, '') || '';
        case LayoutConstant.CATEGORY_CITY:
            return resolvePlaceHolder(props?.content || '', category?.name, subcategory?.name, '', state?.name, city?.name) || '';
        case LayoutConstant.MERCHANT:
            return merchant?.merchantContent?.content || '';
        case LayoutConstant.MERCHANT_STATE:
            return resolvePlaceHolder(props?.content || '', '', subcategory?.name, merchant?.name, state?.name, '') || '';
        case LayoutConstant.MERCHANT_CITY:
            return resolvePlaceHolder(props?.content || '', '', subcategory?.name, merchant?.name, state?.name, city?.name) || '';
        default:
            return "";
    }
}

export default function GeneralInformation({ props, context }: { context: ComponentPropsType; props: any; }) {
    const { layout, category, subcategory, merchant, city, state } = context;
    const content = getContent(layout, props, category, subcategory, merchant, state, city);

    if (!content)
        return <section className={`${styles.general_wrapper} bg-[var(--bg-grey)] md:pt-15 md:pb-15 md:px-16 px-4 py-10`}>
            <div className="max-w-7xl mx-auto">
                <h2>Festive Treats Offers by HDFC Bank</h2>
                <p>Celebrate the joy of the festive season with HDFC Bank Festive Treats Offers – your one-stop destination for exclusive savings, exciting rewards, and easy EMI options. Whether you are shopping for the latest gadgets, upgrading your home appliances, planning a holiday, or buying fashion essentials, HDFC Bank ensures every purchase is more rewarding with special discounts and cashback.</p>
                <p>From smartphones and laptops to TVs, home décor, jewelry, and travel bookings, Festive Treats by HDFC Bank brings you unmatched deals from top brands and partner stores. You can shop online or offline using HDFC Bank Credit Cards, Debit Cards, EasyEMI, or PayZapp to unlock exclusive benefits.</p>
                <h2>Why Choose HDFC Bank Festive Treats Offers?</h2>
                <ul>
                    <li>Exciting Discounts: Get attractive price cuts across leading categories like electronics, fashion, travel, dining, and more.</li>
                    <li>Cashback Rewards: Enjoy instant or assured cashback on eligible transactions with HDFC Bank cards and PayZapp.</li>
                    <li>Easy EMI Options: Convert your festive purchases into affordable EMIs at no extra cost.</li>
                    <li>Partner Brand Deals: Access exclusive offers from leading e-commerce platforms, retail outlets, and travel partners.</li>
                    <li>Safe &amp; Secure Payments: Shop with peace of mind using HDFC Bank’s trusted and secure payment network.</li>
                </ul>
                <h2>How to Avail HDFC Bank Festive Treats Offers?</h2>
                <p>Visit the Festive Treats page on HDFC Bank or open PayZapp.</p>
                <p>Browse offers across categories like mobiles, fashion, travel, and home appliances.</p>
                <p>Choose your preferred deal and complete the payment with an HDFC Bank Debit Card, Credit Card, or PayZapp.</p>
                <p>Get instant confirmation and enjoy rewards, cashback, or EMI benefits.</p>
                <p>This festive season, make every purchase smarter and more rewarding. Celebrate with HDFC Bank Festive Treats Offers and bring home happiness with exclusive savings and benefits.</p>
            </div>
        </section>

    return (
        <section className={`${styles.general_wrapper} bg-[var(--bg-grey)] md:pt-15 md:pb-15 md:px-16 px-4 py-10`}>
            <div className="max-w-7xl mx-auto" dangerouslySetInnerHTML={{ __html: content }} />
        </section>
    )
}
