"use client";
import { motion } from "motion/react"
import Image from "next/image";
import Slider from "./components/Hero";
import ArticleGrid from "./components/Projects";

export default function Home() {

  return (<div className="flex min-h-screen px-12 items-center justify-center  font-sans ">
    <main className="min-h-screen flex w-full mt-10  flex-col items-center justify-between py-10  sm:items-start">
      <div className="hero bg-white mb-10 ">
        <Image src="/intro-light.gif" alt="Intro GIF" width={700} height={380} className="mx-auto md:scale-150 xl:scale-200 pt-8.54 45 zx pb-20" />
        <div className="intos flex gap-4  mt-8 flex-wrap relative">
          <div className="row flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1, y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.3, }
              }}
              viewport={{ once: true }}
              className="xl:text-2xl md-text-2xl max-w-3/4 mb-10 text-black text-start   "> "I design with a quiet kind of passion —
              the kind you can’t always see, but can feel in the details. I believe a good design doesn’t shout; it resonates. Through shapes, spacing, and subtle contrast, I try to create work that carries a
              sense of balance, clarity, and just enough emotion to leave a trace."</motion.p>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{
                opacity: 1, x: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.3, }
              }}
              viewport={{ once: true }}
            >
              <Image src="/typo/p.jpeg" alt="Intro Image" width={400} height={300} className="rounded-xl object-cover w-full max-w-2xl opacity-90" />
            </motion.div>
          </div>
          <motion.div
            // 1. Framer Motion handles the initial state (opacity: 0, y: 20)
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              // 2. Framer Motion handles the final state (opacity: 1, y: 0)
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,
              }
            }}
            viewport={{ once: true }}

            // 3. Keep only the structural and positioning styles here
            className="absolute xl:top-1/4 md:top-2/5 left-2/4 -translate-x-2/4 z-10"
          >
            <Image
              src="/typo/y.jpeg"
              alt="Intro Image"
              width={300}
              height={300}
              // 4. REMOVE the conflicting 'opacity-0' and 'md:opacity-100' classes
              className="rounded-xl object-cover shadow-2xl shadow-black"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: 1, x: 0,
              transition: { duration: 0.8, ease: "easeOut", delay: 0.3, }
            }}
            viewport={{ once: true }}
          >
            <Image src="/typo/t.jpeg" alt="Intro Image" width={400} height={300} className="rounded-xl  object-cover opacity-90" />
          </motion.div>

        </div>
      </div>
      <Slider />
      <ArticleGrid />
    </main>
  </div>
  );
}
