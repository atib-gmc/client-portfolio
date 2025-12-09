"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname() || "/";
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const linkClass = (href: string) =>
        `px-3 py-2  text-sm font-medium text-white ${pathname === href
            ? "border-b-[2px] border-white"
            : `${styles.link}`
        }`;

    return (
        <header className={` fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${hidden ? "-translate-y-full " : "translate-y-0 bg-transparent"}
      bg-black text-white p-4`}>
            <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
                <Link href="/" className="link text-2xl font-bold hover:skew-3 transition-transform duration-300 text-white ">
                    <Image src="/logo_white.png" alt="logo" width={200} height={100} />
                </Link>

                <ul className="flex items-center gap-2 uppercase">
                    <li>
                        <Link href="/" className={`${linkClass("/")}`}>Home</Link>
                    </li>
                    <li>
                        <Link href="/about" className={linkClass("/about")}>About</Link>
                    </li>
                    <li>
                        <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
