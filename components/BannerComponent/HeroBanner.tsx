import { LayoutConstant } from "@/lib/constants/constants";
import { CategoryType } from "@/model/categoryType";
import { ComponentPropsType } from "@/model/componentPropsType";
import { MerchantType } from "@/model/merchantType";
import { SubcategoryType } from "@/model/subcategoryType";
import Image from "next/image";

type HeroBannerProps = {
	title: string;
	media: {
		desktopImage: { url: string; alternativeText?: string };
		mobileImage: { url: string; alternativeText?: string };
	};
	description: string;
};

function getBanner(layout: string, props: HeroBannerProps, category?: CategoryType, subcategory?: SubcategoryType, merchant?: MerchantType): {
	title: string;
	desktopImage: string;
	mobileImage: string;
} {
	switch (layout) {
		case LayoutConstant.HOME:
			return { title: props.title, desktopImage: props.media.desktopImage.url, mobileImage: props.media.mobileImage.url };
		case LayoutConstant.CATEGORY:
		case LayoutConstant.CATEGORY_STATE:
		case LayoutConstant.CATEGORY_CITY:
			return {
				title: category?.name ? category.name : props.title, desktopImage: (category?.bannerImage?.desktopImage?.url ? category.bannerImage.desktopImage.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/banner_festive.webp`), mobileImage: (category?.bannerImage?.mobileImage?.url ? category.bannerImage.mobileImage.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/mobile_festive_banner.jpg`)
			}
		case LayoutConstant.SUBCATEGORY:
		case LayoutConstant.SUBCATEGORY_STATE:
		case LayoutConstant.SUBCATEGORY_CITY:
			return {
				title: subcategory?.name ? subcategory.name : props.title, desktopImage: (subcategory?.bannerImage?.desktopImage?.url ? subcategory.bannerImage.desktopImage.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/banner_festive.webp`), mobileImage: (subcategory?.bannerImage?.mobileImage?.url ? subcategory.bannerImage.mobileImage.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/mobile_festive_banner.jpg`)
			}
		case LayoutConstant.MERCHANT:
		case LayoutConstant.MERCHANT_STATE:
		case LayoutConstant.MERCHANT_CITY:
			return {
				title: merchant?.name ? merchant.name : props.title, desktopImage: (merchant?.bannerImage?.desktopImage?.url ? merchant.bannerImage.desktopImage.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/banner_festive.webp`), mobileImage: (merchant?.bannerImage?.mobileImage?.url ? merchant.bannerImage.mobileImage.url : `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/mobile_festive_banner.jpg`)
			}
		default:
			return { title: props.title, desktopImage: props.media.desktopImage.url, mobileImage: props.media.mobileImage.url };;
	}
}

export default function HeroBanner({ context, props }: { context: ComponentPropsType, props: HeroBannerProps }) {
	const { layout, category, subcategory, merchant } = context;
	const { title, desktopImage, mobileImage } = getBanner(layout, props, category, subcategory, merchant);
	
	return (
		<>
			{desktopImage && (
				<Image src={desktopImage} alt={title} width={1440} height={333} className="hidden md:block w-full h-auto" />
			)}
			{mobileImage && (
				<Image src={mobileImage} alt={title} width={425} height={425} className="block md:hidden w-full h-auto" />
			)}
		</>
	);
}
