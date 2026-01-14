import React, { Dispatch, useState } from 'react';

const CategorySelect = ({ selectedCategory, categories, setSelectCategory }: { categories: any[], setSelectCategory: Dispatch<any>, selectedCategory: string }) => {

    // State untuk menyimpan daftar kategori

    // State untuk menyimpan kategori yang dipilih user

    return (
        <div className="flex flex-col gap-2 w-full max-w-xs">
            <label htmlFor="category-select" className="text-sm font-medium text-gray-700">
                Select Project Category
            </label>

            <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            >
                <option value="" disabled>-- Choose Category --</option>

                {/* Looping Categories */}
                {categories.map((category, index) => (
                    <option key={category.id} value={category.id}>
                        {category?.name}
                    </option>
                ))}
            </select>

            {/* Preview hasil pilihan (Opsional) */}
            {selectedCategory && (
                <p className="text-xs text-gray-500 mt-1">
                    Selected: <span className="font-bold">{categories.find((category) => category.id === selectedCategory)?.name}</span>
                </p>
            )}
        </div>
    );
};

export default CategorySelect;