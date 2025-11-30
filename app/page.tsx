import { Carousel } from "@/components/ui/carousel";
import Image from "next/image";
import Slider from "./components/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen  items-center justify-center bg-black font-sans dark:bg-black">
      <main className="flex min-h-screen w-full  flex-col items-center justify-between py-10 dark:bg-black sm:items-start">
        <Image src="/intro.gif" alt="Intro GIF" width={700} height={400} className="mx-auto pb-20" />
        <Slider />
      </main>
    </div>
  );
}
