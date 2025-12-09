"use client"

import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Image from "next/image"

export default function Slider() {
    return (
        <Carousel
            opts={{
                loop: true,  // penting untuk autoplay looping
            }}
            plugins={[
                Autoplay({ delay: 2000, stopOnMouseEnter: true, stopOnInteraction: false })  // autoplay tiap 3 detik

            ]}
            className="w-full cursor-pointer mx-auto py-10"
        >
            <CarouselContent className="w-full mx-auto">
                <CarouselItem>
                    <div className="h-96 w-full" >
                        <Image src="/design/2.jpeg" className="" alt="Design 2" width={700} height={400} />
                    </div>
                </CarouselItem>

                <CarouselItem>
                    <div className="h-96 w-full" >
                        <Image src="/design/3.jpeg" alt="Design 3" width={700} height={400} />
                    </div>
                </CarouselItem>

                <CarouselItem>
                    <div className="h-96 w-full" >
                        <Image src="/design/4.jpeg" alt="Design 4" width={700} height={400} />
                    </div>
                </CarouselItem>
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />

        </Carousel>
    )
}
