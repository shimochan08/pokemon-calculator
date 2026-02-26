"use client";

import { useState } from "react";
import Link from "next/link";
import "@/styles/AppLayout.css";
import { TbLayoutSidebarLeftCollapseFilled, TbMenu2 } from "react-icons/tb";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="app-container">

      {/* ===== Header ===== */}
      <header className="app-header">

        <button
          onClick={() => setOpen(!open)}>
          {open ? <TbLayoutSidebarLeftCollapseFilled size={20} /> : <TbMenu2 size={20} />}
        </button>

        <h1 className="ml-4">Pokemon Super Board</h1>
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
              <Link
                href="/"
                className={`app-nav-link ${pathname === "/" ? "active" : ""
                  }`}
              >
                Home
              </Link>
            </li>
            {[1, 2, 3, 4, 5, 6].map((n) => {
              const href = `/dashboard/${n}`;
              return (
                <li key={n} className="app-nav-item">
                  <Link
                    href={href}
                    className={`app-nav-link ${pathname === href ? "active" : ""
                      }`}
                  >
                    Dashboard {n}
                  </Link>
                </li>
              )
            })}
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