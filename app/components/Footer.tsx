// components/Footer.js

import Link from 'next/link';

const Footer = () => {
    const bgColor = '#2B78D9'; // The requested background color

    return (
        <footer style={{ backgroundColor: bgColor }} className="text-white">
            {/* Container for padding and main content */}
            <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">

                {/* Top Section: Main CTA and Contact/Careers */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/20 pb-10 mb-10">
                    <div className="flex-1 max-w-lg mb-8 md:mb-0">
                        <h1 className="text-4xl sm:text-5xl font-normal leading-tight">
                            Tell us your vision, <br /> and let's grow beyond.
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-12">
                        {/* New Project / Contact Info */}
                        <div>
                            <p className="mb-2 text-lg">
                                New project <span className="text-sm">↓</span>
                            </p>
                            <Link href="mailto:info@visious.co" className="block text-white underline hover:no-underline">
                                info@visious.co
                            </Link>
                            <Link href="tel:+62817539995" className="block text-white underline hover:no-underline">
                                Reza: +62 817 53 999 5
                            </Link>
                        </div>

                        {/* Join Us / Careers */}
                        <div>
                            <p className="mb-2 text-lg">
                                Join us <span className="text-sm">↓</span>
                            </p>
                            <Link href="/careers" className="text-white underline hover:no-underline">
                                Open Positions
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Address, Subscription, Social, Meta Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Company/Address Info */}
                    <div className="order-2 md:order-1">
                        <address className="not-italic text-sm">
                            PT. Visindo Graphics ID <br />
                            Jl. Rindang No.4, Cipedak Jagakarsa, <br />
                            Jakarta Indonesia 12630.
                        </address>
                    </div>

                    {/* Subscription & Social Links */}
                    <div className="order-1 md:order-2 flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
                        {/* Subscription */}
                        <div>
                            <p className="text-sm">
                                Subscribe to our newsletter <br />
                                for updates.
                                <Link href="/subscribe" className="text-white underline hover:no-underline ml-1">
                                    here
                                </Link>
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4 text-sm">
                            <Link href="https://www.instagram.com/yourhandle" className="underline hover:no-underline">
                                Instagram
                            </Link>
                            <Link href="https://www.behance.net/yourhandle" className="underline hover:no-underline">
                                Behance
                            </Link>
                        </div>
                    </div>

                    {/* Time/Date Info (Aligned Right in original, but placed at the end for simplicity) */}
                    <div className="order-3 md:order-3 flex justify-start md:justify-end space-x-4 text-sm">
                        <p>Jakarta City. 05:41:56 AM</p>
                        <p>Monday, Dec 08, 2025 (GMT +07)</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;