"use client"

import Link from "next/link";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";

export default function Navbar(): JSX.Element {
    const pathname = usePathname() || "/";

    const linkClass = (href: string) =>
        `px-3 py-2  text-sm font-medium text-white ${pathname === href
            ? "border-b-[2px] border-white"
            : `${styles.link}`
        }`;

    return (
        <header className={styles.header}>
            <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
                <Link href="/" className="link text-2xl font-bold text-white ">
                    Samsara
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
