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

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const scrollTo = useCallback((index: number) => {
		if (emblaApi) emblaApi.scrollTo(index);
	}, [emblaApi]);

	// If only one banner, render without carousel
	if (banners.length === 1) {
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
			<a href={banner.bannerLink} target="_blank" rel="noopener noreferrer">
				<BannerContent />
			</a>
		) : (
			<BannerContent />
		);
	}

	// Render carousel for multiple banners
	return (
		<div className="relative">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{banners.map((banner, index) => {
						const BannerContent = () => (
							<>
								{banner.desktopImage?.url && (
									<Image
										src={banner.desktopImage.url}
										alt={banner.desktopImage.alternativeText || ''}
										width={1440}
										height={333}
										className="hidden md:block w-full h-auto"
										priority={index === 0}
									/>
								)}
								{banner.mobileImage?.url && (
									<Image
										src={banner.mobileImage.url}
										alt={banner.mobileImage.alternativeText || ''}
										width={425}
										height={425}
										className="block md:hidden w-full h-auto"
										priority={index === 0}
									/>
								)}
							</>
						);

						return (
							<div key={index} className="flex-[0_0_100%] min-w-0">
								{banner.bannerLink ? (
									<a href={banner.bannerLink} target="_blank" rel="noopener noreferrer">
										<BannerContent />
									</a>
								) : (
									<BannerContent />
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Navigation Arrows */}
			{/* <button
				onClick={scrollPrev}
				className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
				aria-label="Previous slide"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
				</svg>
			</button>

			<button
				onClick={scrollNext}
				className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
				aria-label="Next slide"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>
			</button> */}

			{/* Dots Navigation */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
				{banners.map((_, index) => (
					<button
						key={index}
						onClick={() => scrollTo(index)}
						className={`w-2 h-2 rounded-full transition-all ${
							index === selectedIndex
								? 'bg-white w-8'
								: 'bg-white/50 hover:bg-white/75'
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}