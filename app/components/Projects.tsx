// components/ArticleGrid.js

import Link from 'next/link';

// Dummy data for the cards
const articles = [
    { id: 1, title: 'Whoosh', category: 'Brand Identity', bgColor: 'bg-red-700', isTall: false },
    { id: 2, title: 'OVO', category: 'Product Design', bgColor: 'bg-indigo-700', isTall: false },
    { id: 3, title: 'Peruri', category: 'Website Design', bgColor: 'bg-blue-900', isTall: false },
    { id: 4, title: 'Life Finance', category: 'Marketing', bgColor: 'bg-sky-500', isTall: false },
    // ... add more articles
];

const ArticleCard = ({ article }) => {
    // Use a dynamic height class based on the 'isTall' property
    const heightClass = article.isTall ? 'h-96 md:h-[450px]' : 'h-72 md:h-96';

    return (
        <Link href={`/work/${article.id}`}>
            <div
                className={`relative flex items-end p-6 transition-transform duration-300 ease-in-out transform hover:scale-[1.02] ${heightClass} ${article.bgColor} text-white`}
            >
                {/* The Whoosh logo would be an Image component here */}
                <h2 className="text-4xl font-serif italic absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {article.title}
                </h2>

                {/* Category/Footer text */}
                <p className="text-base">
                    {article.category}
                </p>
            </div>
        </Link>
    );
};

const ArticleGrid = () => {
    return (
        <div className="container mx-auto p-4">
            {/* 2-column grid on small screens, which collapses to 1 column on extra small screens if needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default ArticleGrid;