import Image from "next/image";

export default function HeroBanner() {
  return (
    <>
    <Image src={`${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/banner_festive.webp`} className="w-full h-full sm:block hidden" alt={`asd`} width={1440} height={333}/>
    <Image src={`${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/mobile_festive_banner.jpg`} className="w-full h-full sm:hidden block" alt={`asd`} width={425} height={425}/>
    </>
  );
}