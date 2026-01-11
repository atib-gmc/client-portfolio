import React from 'react'

export default function Loader({ children }: { children: React.ReactNode }) {
    return (
        <div className=" h-screen w-screen fixed top-0 right-0  bg-white/30  z-10 flex items-center backdrop-blur-md    justify-center mx-auto ">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-full mb-4 animate-spin">
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </div>
                <p className="text-gray-600">{children}</p>
            </div>
        </div>
    )
}
