// components/BillboardHero.js
import { getSinglePost } from '@/lib/actions';
import Image from 'next/image';
import styles from './content.module.css'

// URL Gambar yang telah dicari di internet
const ILLUSTRATION_URL = "http://googleusercontent.com/image_collection/image_retrieval/9698723849907971949_0";
const APPSTORE_LOGO_URL = "http://googleusercontent.com/image_collection/image_retrieval/12381743144748118721_0";
const PLAYSTORE_LOGO_URL = "http://googleusercontent.com/image_collection/image_retrieval/12381743144748118721_1";


const BillboardHero = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
    const { data } = await getSinglePost(id)
    console.log(data?.hero?.url)
    return (
        // Wrapper Hero: Menggunakan Flexbox. Asumsi background (pagar, jalan) adalah background div induk atau elemen di luar komponen ini.
        <div className="w-full">
            <div style={{
                background: `url(${data?.hero.url})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }} className="bg-cover bg-no-repeat w-full min-h-screen p-10 pt-20">
                <div className="text-white max-w-[450px] p-2 md:p-0 mb-10 md:mb-0 md:mr-20">
                    <h1 className="text-5xl lg:text-5xl font-extrabold leading-tight tracking-tighter mb-8">
                        {data?.title}
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

            <article id='reset' className={`${styles.reset} my-10 px-8`} dangerouslySetInnerHTML={{ __html: data?.content }}></article>
            <div className="images flex flex-col gap-4 overflow-x-auto py-10 px-8">
                {data?.images_urls && data.images_urls.map((imgObj: any, index: number) => (
                    <div key={index} className="min-w-[300px] min-h-[200px] flex-shrink-0 rounded-lg overflow-hidden border border-gray-300">
                        <Image
                            src={imgObj.url}
                            alt={`Gallery ${index}`}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>


            {/* <Image src="https://picsum.photos/id/237/720/400" alt="Intro GIF" width={700} height={380} className="" /> */}
        </div>
    );
};

export default BillboardHero;