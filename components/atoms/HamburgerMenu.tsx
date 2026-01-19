"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            {/* 左上ボタン */}
            <button
                className="p-2 m-2 rounded hover:bg-gray-200 fixed top-4 left-4 z-50"
                onClick={() => setOpen(!open)}
            >
                <HiMenu size={24} />
            </button>

            {/* サイドメニュー */}
            {open && (
                <div className="fixed top-0 left-0 h-full w-60 bg-white shadow-lg z-40">
                    <ul className="mt-16"> {/* 上にスペースを作ってボタンと被らないように */}
                        <li className="p-4 hover:bg-gray-100 cursor-pointer border-b">
                            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                        </li>
                        <li className="p-4 hover:bg-gray-100 cursor-pointer border-b">
                            <Link href="/calculator" onClick={() => setOpen(false)}>Calculator</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}