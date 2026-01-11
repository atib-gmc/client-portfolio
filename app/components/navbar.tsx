"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import style from "./navbar.module.css";
import GetUser from "../utils/GetUser";
import { Button } from "@/components/ui/button";
import client from "@/lib/supabaseClient";

export default function Navbar() {
    const pathname = usePathname() || "/";
    const user = GetUser();

    // pages that allow transparent navbar at top
    const transparentPages = ["/content", "/about"];

    const isTransparentPage = transparentPages.some(
        (page) => pathname === page || pathname.startsWith(page + "/")
    );

    const [hidden, setHidden] = useState(false);
    const [isOnTop, setIsOnTop] = useState(true);
    const lastScrollY = useRef(0);

    /* =====================
       Scroll position logic
    ====================== */
    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;
            setIsOnTop(currentY === 0);

            if (currentY > lastScrollY.current && currentY > 50) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* =====================
       Reset on route change
    ====================== */
    useEffect(() => {
        setHidden(false);
        setIsOnTop(true);
        lastScrollY.current = 0;
    }, [pathname]);

    function signout() {
        client.auth.signOut().then(() => {
            window.location.href = "/login";
        });
    }

    /* =====================
       Style logic
    ====================== */
    const useTransparent = isTransparentPage && isOnTop;

    const linkClass = (href: string) => `
    px-3 py-2 text-sm font-medium uppercase transition-colors duration-200
    ${useTransparent ? "text-white" : "text-black"}
    ${pathname === href ? "border-b-2 border-current" : style.link}
  `;

    return (
        <header
            className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${hidden ? "-translate-y-full" : "translate-y-0"}
        ${useTransparent ? "bg-transparent" : "bg-white"}
      `}
        >
            <nav className="mx-auto flex px-10 py-4 items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={150}
                        height={60}
                        priority
                        className={useTransparent ? "invert" : ""}
                    />
                </Link>

                <ul className="flex items-center gap-6">
                    <li>
                        <Link href="/" className={linkClass("/")}>
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

                    {user && (
                        <>
                            <li>
                                <Link href="/dashboard" className={linkClass("/dashboard")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Button
                                    onClick={signout}
                                    className={`
                    border px-3 py-2 text-sm uppercase
                    ${useTransparent
                                            ? "border-white text-white"
                                            : "border-black text-black"}
                    bg-transparent hover:bg-transparent
                  `}
                                >
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
