"use client";
import { useState } from "react";
import Link from "next/link";
import { X, Menu, ChevronDown, ArrowRight } from "lucide-react";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="bg-black text-white px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <h1 className="text-xl font-bold">
                    LLM<span className="text-blue-500">AWARE</span>
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex space-x-8 text-sm uppercase">
                    <li>
                        <Link href="/">
                            <div className="hover:text-blue-400 transition">
                                Home
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-blue-400 transition">
                            Articles
                        </Link>
                    </li>
                    {/* Categories Dropdown */}
                    <li className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center hover:text-blue-400 transition"
                        >
                            Categories <ChevronDown size={18} />
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute left-0 mt-2 bg-gray-900 shadow-md rounded-md py-2 w-40">
                                <li>
                                    <Link className="block px-4 py-2 hover:bg-gray-800">
                                        Category 1
                                    </Link>
                                </li>
                                <li>
                                    <Link className="block px-4 py-2 hover:bg-gray-800">
                                        Category 2
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link className="hover:text-blue-400 transition">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-blue-400 transition">
                            Contact Us
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden focus:outline-none"
                    title="Open Menu"
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black text-white z-50 flex flex-col items-center justify-center transition-all duration-300">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-5 right-5"
                        title="Close Menu"
                    >
                        <X size={32} />
                    </button>

                    {/* Mobile Menu Items */}
                    <ul className="space-y-6 text-xl font-semibold text-center">
                        {["Home", "Articles", "About Us", "Contact Us"].map(
                            (item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <Link className="hover:text-blue-400 transition">
                                        {item}
                                    </Link>
                                    <ArrowRight size={20} />
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
