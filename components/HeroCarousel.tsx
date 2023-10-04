"use client";
import { heroImages } from "@/lib/contants";
import { RedoIcon } from "lucide-react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
type Props = {};

const HeroCarousel = (props: Props) => {
  return (
    <div className="relative sm:px-10 py-5 sm:pt-20 pb-5 max-w-[560px] h-[700px] w-full bg-white rounded-[30px] sm:mx-auto">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}>
        {heroImages.map((item) => (
          <Image
            key={item.alt}
            src={item.imgUrl}
            alt={item.alt}
            width={500}
            height={500}
            className="object-contain"
          />
        ))}
      </Carousel>

      <RedoIcon
        width={200}
        height={200}
        strokeWidth={0.5}
        className="rotate-180 max-xl:hidden absolute -left-[20%] bottom-8 text-muted-foreground z-0"
      />
    </div>
  );
};

export default HeroCarousel;
