'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@mui/material';
import type { IconType } from 'react-icons';
import {
  TbCalculator,
  TbLayoutSidebarLeftCollapseFilled,
  TbList,
  TbMenu2,
  TbSettings,
  TbSwords,
  TbUsersGroup,
} from 'react-icons/tb';

type SidebarItem = {
  label: string;
  href: string;
  Icon: IconType;
};

const STANDALONE_PATHS = ['/', '/auth'];

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'ポケモン一覧', href: '/pokemon-list', Icon: TbList },
  { label: 'パーティ編成', href: '/party-builder', Icon: TbUsersGroup },
  { label: 'バトル', href: '/battle', Icon: TbSwords },
  { label: 'ダメージ計算', href: '/damage-calculator', Icon: TbCalculator },
  { label: '設定', href: '/settings', Icon: TbSettings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [isSidebarTransitioning, setIsSidebarTransitioning] = useState(false);
  const sidebarTransitionTimeoutRef = useRef<number | null>(null);
  const pathname = usePathname();
  const isStandalonePage = STANDALONE_PATHS.includes(pathname);
  const isBarePage = pathname === '/';

  const handleToggleSidebar = () => {
    setIsSidebarTransitioning(true);
    setOpen((prev) => !prev);
    if (sidebarTransitionTimeoutRef.current !== null) {
      window.clearTimeout(sidebarTransitionTimeoutRef.current);
    }
    sidebarTransitionTimeoutRef.current = window.setTimeout(() => {
      setIsSidebarTransitioning(false);
      sidebarTransitionTimeoutRef.current = null;
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (sidebarTransitionTimeoutRef.current !== null) {
        window.clearTimeout(sidebarTransitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`app-container ${isBarePage ? 'app-container--bare' : ''}`}>
      {!isBarePage && (
        <AppHeader isSidebarVisible={!isStandalonePage} isSidebarOpen={open} onToggleSidebar={handleToggleSidebar} />
      )}

      <AppSidebar isHidden={isStandalonePage} isOpen={open} pathname={pathname} items={SIDEBAR_ITEMS} />

      <main
        className={`app-main ${isBarePage ? 'app-main--bare' : ''} ${
          isSidebarTransitioning ? 'app-main--sidebarTransition' : ''
        } ${!isStandalonePage && open ? 'app-main--withSidebar' : ''}`}
      >
        <div>{children}</div>
      </main>
    </div>
  );
}

function AppHeader({
  isSidebarVisible,
  isSidebarOpen,
  onToggleSidebar,
}: {
  isSidebarVisible: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  return (
    <header className="app-header">
      {isSidebarVisible && (
        <button
          type="button"
          className="app-headerToggle"
          aria-label={isSidebarOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
          onClick={onToggleSidebar}
        >
          {isSidebarOpen ? <TbLayoutSidebarLeftCollapseFilled size={20} /> : <TbMenu2 size={20} />}
        </button>
      )}
      <Tooltip
        title="TOPページに戻る"
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
        <Link href="/home" className="app-nav-link">
          <h1 className="app-headerTitle">Pokémon Super Dashboard</h1>
        </Link>
      </Tooltip>
    </header>
  );
}

function AppSidebar({
  isHidden,
  isOpen,
  pathname,
  items,
}: {
  isHidden: boolean;
  isOpen: boolean;
  pathname: string;
  items: SidebarItem[];
}) {
  return (
    <aside
      className={`app-sidebar ${isHidden ? 'app-sidebar--hidden' : ''} ${!isOpen ? 'app-sidebar--collapsed' : ''}`}
    >
      <nav className="mt-6" aria-label="メインナビゲーション">
        <ul>
          {items.map(({ label, href, Icon }) => (
            <li key={href} className="app-nav-item">
              <Link href={href} className={`app-nav-link ${pathname === href ? 'active' : ''}`}>
                <Icon className="app-nav-icon" size={18} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
