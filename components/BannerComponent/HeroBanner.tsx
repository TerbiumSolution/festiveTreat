import Image from "next/image";

export default function HeroBanner() {
  return (
    <Image src={`${process.env.NEXT_PUBLIC_APP_BASE_URL}assets/images/banner_festive.webp`} className="w-full h-full" alt={`asd`} width={1440} height={333}/>
  );
}
