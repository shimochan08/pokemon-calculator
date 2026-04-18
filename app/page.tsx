'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TbLayoutSidebarLeftCollapseFilled, TbMenu2 } from 'react-icons/tb';
import { usePathname } from 'next/navigation';
import Home from '@/components/templates/Home';
import { Tooltip } from '@mui/material';
import { PokemonBuildsProvider } from '@/contexts/PokemonBuildsContext';
import AppSidebar from '@/components/organisms/AppSidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isAuth = pathname === '/auth';
  const isStandalonePage = isHome || isAuth;

  return (
    <PokemonBuildsProvider>
      <div className="app-container">
        {/* ===== Header ===== */}
        <header className="app-header">
          {!isStandalonePage && (
            <button className="app-headerToggle" onClick={() => setOpen(!open)}>
              {open ? <TbLayoutSidebarLeftCollapseFilled size={20} /> : <TbMenu2 size={20} />}
            </button>
          )}
          <Tooltip
            title={'TOPページに戻る'}
            arrow
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: '#111827',
                  color: '#fff',
                  padding: '8px 12px',
                },
              },
              arrow: {
                sx: {
                  color: '#111827',
                },
              },
            }}
          >
            <Link href="/" className={`app-nav-link`}>
              <h1 className="app-headerTitle">Pokémon Super Dashboard</h1>
            </Link>
          </Tooltip>
        </header>

        <AppSidebar hidden={isStandalonePage} open={open} />

        {/* ===== Main ===== */}
        <main className={`app-main ${!isStandalonePage && open ? 'app-main--withSidebar' : ''}`}>
          <div>{isHome ? <Home /> : children}</div>
        </main>
      </div>
    </PokemonBuildsProvider>
  );
}
