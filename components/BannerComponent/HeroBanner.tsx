import Image from "next/image";

type HeroBannerProps = {
  data: {
    title: string;
    media: {
      desktopImage: { url: string; alternativeText?: string };
      mobileImage: { url: string; alternativeText?: string };
    };
    description: string;
  };
};
export default function HeroBanner({ data }: HeroBannerProps) {
  if (!data) return null;
  const { title, media } = data;
  const desktopImage =
    media?.desktopImage?.url ||
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/banner_festive.webp`;

  const mobileImage =
    media?.mobileImage?.url ||
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/mobile_festive_banner.jpg`;
  return (
    <>
      {desktopImage && (
        <Image src={desktopImage} alt={media?.desktopImage?.alternativeText || title} width={1440} height={333} className="hidden md:block w-full h-auto" /> 
      )}
      {mobileImage && (
        <Image src={mobileImage} alt={media?.mobileImage?.alternativeText || title} width={425} height={425} className="block md:hidden w-full h-auto" /> 
      )}
    </>
  );
}
