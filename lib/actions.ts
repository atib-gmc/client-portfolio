"use server"
import { revalidatePath } from "next/cache";
// import ImageKit from "imagekit"; // Import SDK-nya di sini
import client from "./supabaseClient";
import { imagekit } from "@/app/utils/imagekit";

// Inisialisasi ImageKit di server
export async function deletePost(post: any) {
    try {
        console.log("Memulai proses penghapusan post:", post.id);

        // 1. Tangani Hero Image (Karena formatnya String JSON)
        if (post.hero) {
            try {
                // Parse string JSON menjadi object
                const heroData = typeof post.hero === 'string'
                    ? JSON.parse(post.hero)
                    : post.hero;

                if (heroData && heroData.fileId) {
                    console.log("Menghapus Hero dari ImageKit:", heroData.fileId);
                    await imagekit.deleteFile(heroData.fileId);
                }
            } catch (e) {
                console.error("Gagal parse data hero:", e);
                // Kita lanjutkan saja agar post di database tetap bisa terhapus
            }
        }

        // 2. Tangani Gallery Images (Array images_urls)
        if (post.images_urls && Array.isArray(post.images_urls)) {
            console.log(`Menghapus ${post.images_urls.length} gallery images...`);

            for (const img of post.images_urls) {
                if (img.fileId) {
                    try {
                        await imagekit.deleteFile(img.fileId);
                        console.log("Terhapus dari ImageKit:", img.fileId);
                    } catch (err) {
                        console.error(`Gagal hapus file ${img.fileId} di ImageKit:`, err);
                    }
                }
            }
        }

        // 3. Hapus data di Supabase
        const { error: supabaseError } = await client
            .from("posts")
            .delete()
            .eq("id", post.id);

        if (supabaseError) {
            return { success: false, message: supabaseError.message };
        }

        // 4. Update UI Dashboard
        revalidatePath("/dashboard");

        return { success: true, message: "Post and images deleted successfully" };

    } catch (error: any) {
        console.error("Fatal Error in deletePost:", error);
        // RETURN PLAIN OBJECT: Jangan return object Error asli
        return {
            success: false,
            message: error.message || "Terjadi kesalahan sistem saat menghapus post."
        };
    }
}
export async function getAllCategory() {
    return await client.from("categories").select("*").order("name", { ascending: false })
}

export async function getAllPosts() {
    return await client.from("posts").select("*").order("created_at", { ascending: false });
}

export async function deleteImage(fileId: any[] | string) {
    try {
        // Kasus 1: Jika input adalah Array
        if (Array.isArray(fileId)) {
            for (const item of fileId) {
                // Cek apakah item itu object {fileId: ...} atau string langsung
                const idToDelete = typeof item === 'object' ? item.fileId! : item;

                if (idToDelete) {
                    await imagekit.deleteFile(idToDelete);
                    console.log("Deleted array item:", idToDelete);
                }
            }
        }
        // Kasus 2: Jika input adalah String tunggal
        else if (typeof fileId === 'string' && fileId.trim() !== "") {
            await imagekit.deleteFile(fileId);
            console.log("Deleted single file:", fileId);
        }

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting image:", error);
        // Kembalikan plain object agar tidak error di Next.js Client Component
        return { success: false, message: error.message || "Gagal menghapus gambar" };
    }
}


export async function getSinglePost(id: any) {
    return await client.from("posts").select("*").eq("id", id).single();
}