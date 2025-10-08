import { LayoutConstant } from "@/lib/constants/constants";
import { CategoryType } from "@/model/categoryType";
import { ComponentPropsType } from "@/model/componentPropsType";
import { MerchantType } from "@/model/merchantType";
import { SubcategoryType } from "@/model/subcategoryType";
import Image from "next/image";

type HeroBannerProps = {
	items: {
		title: string;
		link: string;
		media?: {
			bannerLink?: string
			desktopImage: { url: string; alternativeText?: string };
			mobileImage?: { url: string; alternativeText?: string };
		};
		description: string;
	}[]
};

const defaultDesktopImage = { url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/banner_festive.webp`, alternativeText: '' };
const defaultMobileImage = { url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/mobile_festive_banner.jpg`, alternativeText: '' };

function getBanner(
	layout: string,
	props: HeroBannerProps,
	category?: CategoryType,
	subcategory?: SubcategoryType,
	merchant?: MerchantType
): {
	bannerLink?: string
	desktopImage: { url: string; alternativeText?: string };
	mobileImage?: { url: string; alternativeText?: string };
}[] {

	switch (layout) {
		case LayoutConstant.HOME:
			const mappedItems = props.items.map(item => item.media).filter((item): item is NonNullable<typeof item> => item !== undefined) || [{
				desktopImage: defaultDesktopImage,
				mobileImage: defaultMobileImage,
				bannerLink: ''
			}];
			return mappedItems;
		case LayoutConstant.CATEGORY:
		case LayoutConstant.CATEGORY_STATE:
		case LayoutConstant.CATEGORY_CITY:
			const categoryPageBanners = props.items
				.map(item => item.media)
				.filter((m): m is NonNullable<typeof m> => !!m?.desktopImage?.url);

			if (category?.bannerImage && category.bannerImage.length > 0) {
				return category.bannerImage;
			}
			if (categoryPageBanners.length > 0) {
				return categoryPageBanners;
			}
			return [{
				desktopImage: defaultDesktopImage,
				mobileImage: defaultMobileImage,
				bannerLink: ''
			}];
		case LayoutConstant.SUBCATEGORY:
		case LayoutConstant.SUBCATEGORY_STATE:
		case LayoutConstant.SUBCATEGORY_CITY:
			const subcategoryPageBanners = props.items
				.map(item => item.media)
				.filter((m): m is NonNullable<typeof m> => !!m?.desktopImage?.url);
			if (subcategory?.bannerImage && subcategory.bannerImage.length > 0) {
				return subcategory.bannerImage;
			}
			if (category?.bannerImage && category.bannerImage.length > 0) {
				return category.bannerImage;
			}
			if (subcategoryPageBanners.length > 0) {
				return subcategoryPageBanners;
			}
			return [{
				desktopImage: defaultDesktopImage,
				mobileImage: defaultMobileImage,
				bannerLink: ''
			}];
		case LayoutConstant.MERCHANT:
		case LayoutConstant.MERCHANT_STATE:
		case LayoutConstant.MERCHANT_CITY:
			const merchantPageBanners = props.items
				.map(item => item.media)
				.filter((m): m is NonNullable<typeof m> => !!m?.desktopImage?.url);

			if (category?.bannerImage && category.bannerImage.length > 0) {
				return category.bannerImage;
			}
			if (merchantPageBanners.length > 0) {
				return merchantPageBanners;
			}
			return [{
				desktopImage: defaultDesktopImage,
				mobileImage: defaultMobileImage,
				bannerLink: ''
			}];
		default:
			return [{
				desktopImage: defaultDesktopImage,
				mobileImage: defaultMobileImage,
				bannerLink: ''
			}];
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
	const banners = getBanner(
		layout,
		props,
		category,
		subcategory,
		merchant
	);

	const banner = banners[0];
	const BannerContent = () => (
		<>
			{banner.desktopImage?.url && (
				<Image
					src={banner.desktopImage.url}
					alt={banner.desktopImage.alternativeText || ''}
					width={1440}
					height={333}
					className="hidden md:block w-full h-auto"
					priority
				/>
			)}
			{banner.mobileImage?.url && (
				<Image
					src={banner.mobileImage.url}
					alt={banner.mobileImage.alternativeText || ''}
					width={425}
					height={425}
					className="block md:hidden w-full h-auto"
					priority
				/>
			)}
		</>
	);

	return banner.bannerLink ? (
		<a
			href={banner.bannerLink}
			target="_blank">
			<BannerContent />
		</a>
	) : (
		<BannerContent />
	);
}
