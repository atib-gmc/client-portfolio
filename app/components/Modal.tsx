"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/actions";
import client from "@/lib/supabaseClient"; // Import client kamu
import { useRouter } from "next/navigation";

export default function Modal({ post, setRefresh }) {
    const router = useRouter();

    // const handleDelete = async () => {
    //     const { error } = await client
    //         .from("posts")
    //         .delete()
    //         .eq("id", post.id);


    //     if (error) {
    //         alert("Gagal menghapus: " + error.message);
    //     } else {
    //         alert("Post berhasil dihapus!");
    //         router.refresh(); // Refresh data di dashboard
    //     }
    // };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus "{post.title}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tindakan ini tidak bisa dibatalkan. Postingan akan dihapus permanen dari database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    {/* Tombol Continue kita kasih fungsi delete */}
                    <AlertDialogAction onClick={() => deletePost(post).then(() => setRefresh((pre: boolean) => !pre))} className="bg-red-600 hover:bg-red-700">
                        Hapus Sekarang
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}