import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// Inisialisasi ImageKit dengan kunci rahasia (Server Side)
const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});


export async function GET() {
    try {
        // Menghasilkan parameter autentikasi untuk Client
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters);
    } catch (error) {
        return NextResponse.json({ error: "Failed to get auth" }, { status: 500 });
    }
}