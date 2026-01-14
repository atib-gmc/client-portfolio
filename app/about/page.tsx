"use client";

import React from "react";

export default function AboutPage() {
    return (
        <main className="w-full bg-black text-white -">
            {/* Hero Section */}
            <section className="relative w-full h-screen flex items-center justify-center">
                <img
                    src="/design/hero.jpeg"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 text-center px-6 max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">Where Ideas Step Into the Light</h1>
                    <p className="text-base leading-relaxed">
                        Setiap desain adalah panggung kecil tempat imajinasi berdiri di tengah sorotan.
                    </p>
                </div>
            </section>

            {/* Words + Image Section */}
            <section className="w-full px-6 py-20 flex flex-col gap-10 md:flex-row md:items-center md:justify-center max-w-5xl mx-auto">
                <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-semibold">Crafting Visual Stories</h2>
                    <p>Inspired by the concept of Samsara, the ever-repeating cycle of rebirth, we see a brand’s journey as a dynamic and continuous process.

                        We embrace the Four Stages of Samsara: Birth, Growth, Evolution and Rebirth. Each marking a critical step from entering the market, building presence and refining through insight to emerging stronger than before. In moments of uncertainty, we step in as your adventure companion. We’re there by your side, filling the gaps, sharing the journey, and helping you reach your fullest potential.</p>
                </div>
                <img
                    src="/design/side.jpeg"
                    alt="Design Work"
                    className="flex-1 w-full rounded-xl object-cover max-h-96"
                />
            </section>

        </main>
    );
}