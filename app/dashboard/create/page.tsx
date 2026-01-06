"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import MyDropzone from "@/app/components/DropZone";
import { useState } from "react";
import Image from "next/image";
import RichTextEditor from "@/app/components/RichText";

export default function CreatePostPage() {
    const [images, setImages] = useState([]);
    const [markdown, setMarkdown] = useState("")
    function deleteImage(index: number) {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full bg-white border-b z-50">
                <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-semibold">Create Post</h1>
                    <Button variant="outline">Back to Dashboard</Button>
                </div>
            </header>

            {/* Main */}
            <main className="pt-28 mx-auto max-w-3xl px-6">
                <Card>
                    <CardHeader>
                        <CardTitle>New Post</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Post title" />
                        </div>

                        {/* Slug */}
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" placeholder="post-title" />
                        </div>
                        {/* images */}
                        {/* // TODO: fix types when time allows */}
                        <div className="space-y-2 ">
                            <MyDropzone setImages={setImages} />
                            <div className="images-preview flex gap-2 flex-wrap">
                                {images.map((file, index) => {
                                    const src = URL.createObjectURL(file);

                                    return (
                                        <div key={index} className="relative w-20 h-20 cursor-pointer">
                                            <Image
                                                src={src}
                                                alt={file.name}
                                                fill
                                                onClick={() => deleteImage(index)}
                                                unoptimized
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>


                        {/* Content */}
                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <RichTextEditor value={markdown} onchange={setMarkdown} />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Button variant="outline">Cancel</Button>
                            <Button>Publish</Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
