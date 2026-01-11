// components/ArticleGrid.js
"use client";
import { getAllPosts } from '@/lib/actions';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Dummy data for the cards
const articles = [
    { id: 1, title: 'Whoosh', category: 'Brand Identity', bgColor: 'bg-red-700', isTall: false },
    { id: 2, title: 'OVO', category: 'Product Design', bgColor: 'bg-indigo-700', isTall: false },
    { id: 3, title: 'Peruri', category: 'Website Design', bgColor: 'bg-blue-900', isTall: false },
    { id: 4, title: 'Life Finance', category: 'Marketing', bgColor: 'bg-sky-500', isTall: false },
    // ... add more articles
];

const ArticleCard = (post: any) => {
    // Use a dynamic height class based on the 'isTall' property
    const heightClass = post.isTall ? 'h-96 md:h-[450px]' : 'h-72 md:h-96';
    console.log(post)

    return (
        <Link href={`/content/${post?.article.id}`} key={post?.article.id} className={`rounded-lg overflow-hidden shadow-lg    `}>
            <div
                style={{ background: `url(${post?.article.hero?.url})` }}
                className={`relative flex items-end p-6 transition-transform duration-300 ease-in-out transform hover:scale-[1.02] ${heightClass}  text-white`}
            >
                {/* The Whoosh logo would be an Image component here */}
                <h2 className="text-3xl self-start font-serif italic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {post?.article.title}
                </h2>

                {/* Category/Footer text */}
                <p className="text-base">
                    {/* {article.category} */}
                </p>
            </div>
        </Link>
    );
};

const ArticleGrid = () => {

    const [post, setPost] = useState<any>(null)
    useEffect(() => {
        async function fetchData() {
            const res = await getAllPosts()
            if (res.data) {
                setPost(res.data)
            }
        } fetchData();
        // Any side effects if needed
    }, [])
    return (
        <div className="container mx-auto p-4">
            {/* 2-column grid on small screens, which collapses to 1 column on extra small screens if needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                {post?.map((article: any) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default ArticleGrid;