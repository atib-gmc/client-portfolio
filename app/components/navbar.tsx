"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import style from "./navbar.module.css"
import IsAuthenticated from "./IsAuthenticated";
import GetUser from "../utils/GetUser";
import { Button } from "@/components/ui/button";
import client from "@/lib/supabaseClient";

export default function Navbar() {
    const pathname = usePathname() || "/";
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const user = GetUser();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    function signout() {
        // Sign out logic here
        client.auth.signOut().then(() => {
            // Handle post-signout actions
            window.location.href = "/login"; // Redirect to login page
        });
    }

    // KUNCI: Gunakan mix-blend-difference dan text-white murni
    const linkClass = (href: string) => `
        px-3 py-2 text-sm font-medium uppercase transition-all duration-200
        mix-blend-difference text-black
        ${pathname === href ? "border-b-2 border-black" : `${style.link}`}
    `;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300
                ${hidden ? "-translate-y-full" : "translate-y-0"}
                bg-transparent
            `}
            style={{ isolation: 'auto' }} // Memastikan tidak ada isolasi layer
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between p-4 bg-transparent">

                {/* Logo juga ikut invert agar terlihat saat bg putih */}
                <Link href="/" className="mix-blend-difference">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={180}
                        height={80}
                        priority
                        className="invert-0 hover:skew-3 transition-all duration-200"
                    />
                </Link>

                <ul className="flex items-center gap-6 bg-transparent">
                    <li >
                        <Link href="/" className={`${linkClass("/")} `}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className={linkClass("/about")}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className={linkClass("/contact")}>
                            Contact
                        </Link>
                    </li>

                    {user && (<><li>
                        <Link href="/dashboard" className={linkClass("/dashboard")}>
                            Dashboard
                        </Link>

                    </li>
                        <li>
                            <Button onClick={() => signout()} className="px-3 text-white py-2 text-sm font-medium uppercase mix-blend-difference cursor-pointer hover:-translate-y-1 transition-all duration-200">
                                Logout
                            </Button>
                        </li>
                    </>
                    )}
                </ul>
            </nav>
        </header>
    );
}