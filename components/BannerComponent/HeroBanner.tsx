'use client'

import { LayoutConstant } from "@/lib/constants/constants";
import { CategoryType } from "@/model/categoryType";
import { ComponentPropsType } from "@/model/componentPropsType";
import { MerchantType } from "@/model/merchantType";
import { SubcategoryType } from "@/model/subcategoryType";
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

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
		case LayoutConstant.HOME:{
			const mappedItems = props.items
				.map(item => item.media)
				.filter((item): item is NonNullable<typeof item> => item !== undefined) || [{
					desktopImage: defaultDesktopImage,
					mobileImage: defaultMobileImage,
					bannerLink: ''
				}];
			return mappedItems;
		}
		case LayoutConstant.CATEGORY:
		case LayoutConstant.CATEGORY_STATE:
		case LayoutConstant.CATEGORY_CITY: {
			const categoryPageBanners = props.items
				.map(item => item.media)
				.filter((m): m is NonNullable<typeof m> => !!m?.desktopImage?.url);

			if (category?.bannerImage && category.bannerImage.length > 0) return category.bannerImage;
			if (categoryPageBanners.length > 0) return categoryPageBanners;

			return [{
				desktopImage: defaultDesktopImage,
				mobileImage: defaultMobileImage,
				bannerLink: ''
			}];
		}

		case LayoutConstant.SUBCATEGORY:
		case LayoutConstant.SUBCATEGORY_STATE:
		case LayoutConstant.SUBCATEGORY_CITY: {
			const subcategoryPageBanners = props.items
				.map(item => item.media)
				.filter((m): m is NonNullable<typeof m> => !!m?.desktopImage?.url);

			if (subcategory?.bannerImage && subcategory.bannerImage.length > 0) return subcategory.bannerImage;
			if (category?.bannerImage && category.bannerImage.length > 0) return category.bannerImage;
			if (subcategoryPageBanners.length > 0) return subcategoryPageBanners;

			return [{
				desktopImage: defaultDesktopImage,
				mobileImage: defaultMobileImage,
				bannerLink: ''
			}];
		}

		case LayoutConstant.MERCHANT:
		case LayoutConstant.MERCHANT_STATE:
		case LayoutConstant.MERCHANT_CITY: {
			const merchantPageBanners = props.items
				.map(item => item.media)
				.filter((m): m is NonNullable<typeof m> => !!m?.desktopImage?.url);

			if (category?.bannerImage && category.bannerImage.length > 0) return category.bannerImage;
			if (merchantPageBanners.length > 0) return merchantPageBanners;

			return [{
				desktopImage: defaultDesktopImage,
				mobileImage: defaultMobileImage,
				bannerLink: ''
			}];
		}

		default:
			return [{
				desktopImage: defaultDesktopImage,
				mobileImage: defaultMobileImage,
				bannerLink: ''
			}];
	}
}

// ---------------------- BannerContent Component ----------------------
type BannerContentProps = {
	banner: {
		bannerLink?: string;
		desktopImage: { url: string; alternativeText?: string };
		mobileImage?: { url: string; alternativeText?: string };
	};
	priority?: boolean;
};

const BannerContent = ({ banner, priority = false }: BannerContentProps) => (
	<>
		{banner.desktopImage?.url && (
			<Image
				src={banner.desktopImage.url}
				alt={banner.desktopImage.alternativeText ?? ''}
				width={1440}
				height={333}
				className="hidden md:block w-full h-auto"
				priority={priority}
			/>
		)}
		{banner.mobileImage?.url && (
			<Image
				src={banner.mobileImage.url}
				alt={banner.mobileImage.alternativeText ?? ''}
				width={425}
				height={425}
				className="block md:hidden w-full h-auto"
				priority={priority}
			/>
		)}
	</>
);

// ---------------------- HeroBanner Component ----------------------
export default function HeroBanner({
	context,
	props,
}: Readonly<{
	context: ComponentPropsType;
	props: HeroBannerProps;
}>) {
	const { layout, category, subcategory, merchant } = context;
	const banners = getBanner(layout, props, category, subcategory, merchant);

	// Initialize Embla Carousel with autoplay
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: true, duration: 20 },
		[Autoplay({ delay: 5000, stopOnInteraction: true })]
	);

	const [selectedIndex, setSelectedIndex] = useState(0);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on('select', onSelect);
		return () => {
			emblaApi.off('select', onSelect);
		};
	}, [emblaApi, onSelect]);


	const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

	// Single banner case
	if (banners.length === 1) {
		const banner = banners[0];
		return banner.bannerLink ? (
			<a href={banner.bannerLink} target="_blank" rel="noopener noreferrer">
				<BannerContent banner={banner} priority />
			</a>
		) : (
			<BannerContent banner={banner} priority />
		);
	}

	// Multiple banners (carousel)
	return (
		<div className="relative">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					    {banners.map((banner) => {
							const key = banner.bannerLink ?? banner.desktopImage.url;
							return (
								<div key={key} className="flex-[0_0_100%] min-w-0">
								{banner.bannerLink ? (
									<a href={banner.bannerLink} target="_blank" rel="noopener noreferrer">
									<BannerContent banner={banner} priority={false} />
									</a>
								) : (
									<BannerContent banner={banner} priority={false} />
								)}
								</div>
							);
							})}
				</div>
			</div>

			{/* Dots Navigation */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
				{banners.map((banner) => {
					const key = banner.bannerLink ?? banner.desktopImage.url;
					return (
					<button
						key={key}
						onClick={() => scrollTo(banners.indexOf(banner))}
						className={`w-2 h-2 rounded-full transition-all ${
						banners.indexOf(banner) === selectedIndex
							? 'bg-white w-8'
							: 'bg-white/50 hover:bg-white/75'
						}`}
						aria-label={`Go to slide`}
					/>
					);
				})}
				</div>
		</div>
	);
}
