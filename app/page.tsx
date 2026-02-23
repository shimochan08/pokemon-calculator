"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import "@/styles/AppLayout.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="app-container">

      {/* ===== Header ===== */}
      <header className="app-header">

        <button
          onClick={() => setOpen(!open)}>
          {open ? <HiX size={20} /> : <HiMenu size={20} />}
        </button>

        <h1>Pokemon Super Dashboard</h1>
      </header>

      {/* ===== Sidebar ===== */}
      <aside
        className="app-sidebar"
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <nav className="mt-6">
          <ul>
            <li className="app-nav-item">
              <Link href="/" className="app-nav-link">
                Home
              </Link>
            </li>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <li key={n} className="app-nav-item">
                <Link href={`/dashboard/${n}`} className="app-nav-link">
                  Dashboard {n}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* ===== Main ===== */}
      <main className="app-main" style={{ marginLeft: open ? "200px" : "0px" }}>
        <div>{children}</div>
      </main>
    </div>
  );
}