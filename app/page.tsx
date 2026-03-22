"use client";

import { useState } from "react";
import Link from "next/link";
import "@/styles/AppLayout.css";
import { TbLayoutSidebarLeftCollapseFilled, TbMenu2 } from "react-icons/tb";
import { usePathname } from "next/navigation";
import Home from "@/components/templates/Home";
import { Tooltip } from "@mui/material";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="app-container">

      {/* ===== Header ===== */}
      <header className="app-header">

        {pathname !== "/" && (
          <button onClick={() => setOpen(!open)}>
            {open ? <TbLayoutSidebarLeftCollapseFilled size={20} /> : <TbMenu2 size={20} />}
          </button>
        )}
        <Tooltip
          title={"TOPページに戻る"}
          arrow
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: "#111827",
                color: "#fff",
                padding: "8px 12px",
              },
            },
            arrow: {
              sx: {
                color: "#111827",
              },
            },
          }}
        >
          <Link
            href="/"
            className={`app-nav-link`}
          >
            <h1 className="ml-4">Pokemon Super Dashboard</h1>
          </Link>
        </Tooltip>
      </header>

      {/* ===== Sidebar ===== */}
      <aside
        className="app-sidebar"
        style={{
          display: pathname === "/" ? "none" : "block",
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <nav className="mt-6">
          <ul>
            {[1, 2, 3, 4, 5, 6].map((n) => {
              const href = `/dashboard/${n}`;
              return (
                <li key={n} className="app-nav-item">
                  <Link
                    href={href}
                    className={`app-nav-link ${pathname === href ? "active" : ""
                      }`}
                  >
                    ポケモン {n}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* ===== Main ===== */}
      <main className="app-main" style={{ marginLeft: !isHome && open ? "200px" : "0px" }}>
        <div>{isHome ? <Home /> : children}</div>
      </main>
    </div >
  );
}