import { LayoutConstant } from "@/lib/constants/constants";
import { CategoryType } from "@/model/categoryType";
import { ComponentPropsType } from "@/model/componentPropsType";
import { MerchantType } from "@/model/merchantType";
import { SubcategoryType } from "@/model/subcategoryType";
import Image from "next/image";

type HeroBannerProps = {
	title: string;
	link: string;
	media: {
		desktopImage: { url: string; alternativeText?: string };
		mobileImage: { url: string; alternativeText?: string };
	};
	description: string;
};

function getBanner(
	layout: string,
	props: HeroBannerProps,
	category?: CategoryType,
	subcategory?: SubcategoryType,
	merchant?: MerchantType
): {
	title: string;
	desktopImage: string;
	mobileImage: string;
	bannerLink: string;
} {
	const defaultDesktopImage = `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/banner_festive.webp`;
	const defaultMobileImage = `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/mobile_festive_banner.webp`;

	switch (layout) {
		case LayoutConstant.HOME:
			return {
				title: props.title,
				desktopImage: props?.media?.desktopImage?.url || defaultDesktopImage,
				mobileImage: props?.media?.mobileImage?.url || defaultMobileImage,
				bannerLink: props?.link || ''
			};
		case LayoutConstant.CATEGORY:
		case LayoutConstant.CATEGORY_STATE:
		case LayoutConstant.CATEGORY_CITY:
			return {
				title: category?.name || props.title,
				desktopImage: category?.bannerImage?.desktopImage?.url || defaultDesktopImage,
				mobileImage: category?.bannerImage?.mobileImage?.url || defaultMobileImage,
				bannerLink: category?.bannerLink || ''
			};
		case LayoutConstant.SUBCATEGORY:
		case LayoutConstant.SUBCATEGORY_STATE:
		case LayoutConstant.SUBCATEGORY_CITY:
			return {
				title: subcategory?.name || props.title,
				desktopImage: (subcategory?.bannerImage?.desktopImage?.url ? subcategory?.bannerImage?.desktopImage?.url : category?.bannerImage?.desktopImage?.url) || defaultDesktopImage,
				mobileImage: subcategory?.bannerImage?.mobileImage?.url || defaultMobileImage,
				bannerLink: subcategory?.bannerLink ? subcategory?.bannerLink : category?.bannerLink || ''
			};
		case LayoutConstant.MERCHANT:
		case LayoutConstant.MERCHANT_STATE:
		case LayoutConstant.MERCHANT_CITY:
			return {
				title: merchant?.name || props.title,
				desktopImage: merchant?.bannerImage?.desktopImage?.url || defaultDesktopImage,
				mobileImage: merchant?.bannerImage?.mobileImage?.url || defaultMobileImage,
				bannerLink: merchant?.bannerLink || ''
			};
		default:
			return {
				title: props.title,
				desktopImage: props.media.desktopImage.url,
				mobileImage: props.media.mobileImage.url,
				bannerLink: ''
			};
	}
}

export default function HeroBanner({
	context,
	props,
}: {
	context: ComponentPropsType;
	props: HeroBannerProps;
}) {
	const { layout, category, subcategory, merchant } = context;
	const { title, desktopImage, mobileImage, bannerLink } = getBanner(
		layout,
		props,
		category,
		subcategory,
		merchant
	);

	const BannerContent = () => (
		<>
			{desktopImage && (
				<Image
					src={desktopImage}
					alt={title}
					width={1440}
					height={333}
					className="hidden md:block w-full h-auto"
				/>
			)}
			{mobileImage && (
				<Image
					src={mobileImage}
					alt={title}
					width={425}
					height={425}
					className="block md:hidden w-full h-auto"
				/>
			)}
		</>
	);

	return bannerLink ? (
		<a 
		href={bannerLink}
		target="_blank">
			<BannerContent />
		</a>
	) : (
		<BannerContent />
	);
}
