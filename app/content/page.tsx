// components/BillboardHero.js
import Image from 'next/image';

// URL Gambar yang telah dicari di internet
const ILLUSTRATION_URL = "http://googleusercontent.com/image_collection/image_retrieval/9698723849907971949_0";
const APPSTORE_LOGO_URL = "http://googleusercontent.com/image_collection/image_retrieval/12381743144748118721_0";
const PLAYSTORE_LOGO_URL = "http://googleusercontent.com/image_collection/image_retrieval/12381743144748118721_1";


const BillboardHero = () => {
    return (
        // Wrapper Hero: Menggunakan Flexbox. Asumsi background (pagar, jalan) adalah background div induk atau elemen di luar komponen ini.
        <div className="w-full">
            <div style={{ background: "url(https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }} className="w-full min-h-screen p-10 pt-20">
                <div className="text-white max-w-[450px] p-2 md:p-0 mb-10 md:mb-0 md:mr-20">
                    <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tighter mb-8">
                        Shedding Light on Investment
                    </h1>

                    {/* Deskripsi Pendek */}
                    <p className="text-lg mb-6 opacity-90">
                        Subscribe to our newsletter for updates here
                    </p>

                    {/* Link Sosial di bawah */}
                    <div className="flex gap-6 text-sm opacity-90">
                        <span className="underline hover:no-underline cursor-pointer">Instagram</span>
                        <span className="underline hover:no-underline cursor-pointer">Behance</span>
                    </div>
                </div>
            </div>

            {/* 1. KONTEN KIRI: Teks Utama dan Deskripsi (Area Gelap) */}
            {/* Menggunakan fixed width max-w-[450px] agar mirip dengan porsi di gambar */}

            <p className='text-white my-10 px-8'>
                Bank investasi (Investment Bank) adalah lembaga keuangan yang membantu perusahaan atau pemerintah:

                Mengumpulkan modal (misal lewat saham atau obligasi)

                Memberi saran transaksi besar (merger, akuisisi, restrukturisasi)

                Membeli dan menjual sekuritas untuk klien

                Singkatnya: membantu klien dapat dana dan melakukan transaksi besar.
            </p>


            <Image src="https://picsum.photos/id/237/720/400" alt="Intro GIF" width={700} height={380} className="" />
        </div>
    );
};

export default BillboardHero;