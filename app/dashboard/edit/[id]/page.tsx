"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MyDropzone from "@/app/components/DropZone";
import { useState } from "react";
import Image from "next/image";
import RichTextEditor from "@/app/components/RichText";
import { useRouter } from "next/navigation";
import client from "@/lib/supabaseClient";
import Loader from "@/app/components/Loader";
import { renameImages } from "@/app/utils/func";

export default function EditPage() {
    const router = useRouter();
    const [hero, setHero] = useState(null);
    const [isPending, setIspending] = useState(false);
    const [status, setStatus] = useState("");
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [error, setError] = useState("");

    function deleteImage(index: number) {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    const uploadSemuaGambar = async () => {
        let heroUrl = null
        const daftarUrlHasil = [];
        console.log("uplaod image")

        // 1. Upload HERO jika ada
        if (hero) {
            setStatus("Uploading hero image...");
            const heroRenamed = renameImages(hero, "hero_");
            const authHero = await fetch("/api/auth-imagekit").then(res => res.json());

            const formDataHero = new FormData();
            formDataHero.append("file", heroRenamed);
            formDataHero.append("fileName", heroRenamed.name);
            formDataHero.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
            formDataHero.append("signature", authHero.signature);
            formDataHero.append("expire", authHero.expire.toString());
            formDataHero.append("token", authHero.token);

            const resHero = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
                method: "POST",
                body: formDataHero,
            });
            const dataHero = await resHero.json();
            heroUrl = { url: dataHero.url, fileId: dataHero.fileId };
        }

        // 2. Upload Gallery Images
        if (images.length > 0) {
            setStatus(`Uploading ${images.length} images...`);
            for (const file of images) {
                const imageRenamed = renameImages(file, "post_");
                const auth = await fetch("/api/auth-imagekit").then(res => res.json());

                const formData = new FormData();
                formData.append("file", imageRenamed);
                formData.append("fileName", imageRenamed.name);
                formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
                formData.append("signature", auth.signature);
                formData.append("expire", auth.expire.toString());
                formData.append("token", auth.token);

                const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();
                daftarUrlHasil.push({ url: data.url, fileId: data.fileId });
                console.log("Uploaded gallery image:", data.url);
            }
        }

        return { heroUrl, galleryUrls: daftarUrlHasil };
    };

    async function uploadPost() {
        setError("");
        if (title.trim() === "" || markdown.trim() === "" || (!hero && images.length === 0)) {
            setError("Please fill all fields and add at least one image.");
            return;
        }

        setIspending(true);
        setStatus("Starting upload process...");

        try {
            // Jalankan upload gambar dulu
            const { galleryUrls, heroUrl } = await uploadSemuaGambar();

            // Simpan ke Supabase
            setStatus("Saving post to database...");
            const { error: supabaseError } = await client.from("posts").insert({
                title,
                content: markdown,
                slug: title.toLowerCase().replace(/\s+/g, '-'),
                images_urls: galleryUrls, // Ini menyimpan array [{url, fileId}, ...]
                hero: heroUrl
            });

            if (supabaseError) throw supabaseError;

            alert("Post created successfully!");
            router.push("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Something went wrong during upload or saving.");
        } finally {
            setIspending(false);
            setStatus("");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
                <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-semibold">Create Post</h1>
                    <Button onClick={() => router.push("/dashboard")} variant="outline">Back</Button>
                </div>
            </header>

            <main className=" mx-auto max-w-3xl px-6 pb-20">
                <Card>
                    <CardHeader>
                        <CardTitle>New Post</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Hero Image */}
                        <div className="space-y-2">
                            <Label className="font-semibold">Hero Image</Label>
                            <div className="relative w-full h-64 border rounded-md overflow-hidden bg-gray-100">
                                {hero ? (
                                    <Image
                                        src={URL.createObjectURL(hero)}
                                        alt="Hero Preview"
                                        fill
                                        className="object-cover cursor-pointer"
                                        onClick={() => setHero(null)}
                                    />
                                ) : (
                                    <MyDropzone maxFiles={1} multiple={false} setImages={setHero} />
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input value={title} onChange={e => setTitle(e.target.value)} id="title" placeholder="Enter post title" />
                        </div>

                        {/* Additional Gallery Images */}
                        <div className="space-y-2">
                            <Label>Gallery Images</Label>
                            <MyDropzone setImages={setImages} />
                            <div className="flex gap-2 flex-wrap mt-2">
                                {images.map((file, index) => (
                                    <div key={index} className="relative w-20 h-20 border rounded-md overflow-hidden">
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            fill
                                            className="object-cover cursor-pointer"
                                            onClick={() => deleteImage(index)}
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <Label>Content</Label>
                            <RichTextEditor value={markdown} onchange={setMarkdown} />
                        </div>

                        {isPending && <Loader>{status}</Loader>}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-end gap-3">
                            <Button disabled={isPending} variant="outline" onClick={() => router.push("/dashboard")}>
                                Cancel
                            </Button>
                            <Button disabled={isPending} onClick={uploadPost}>
                                {isPending ? "Processing..." : "Publish Post"}
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </main>
        </div>
    );
}