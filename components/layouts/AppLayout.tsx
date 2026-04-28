'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip } from '@mui/material';
import type { IconType } from 'react-icons';
import {
  TbCalculator,
  TbChartRadar,
  TbLayoutSidebarLeftCollapseFilled,
  TbList,
  TbMenu2,
  TbNotes,
  TbSettings,
  TbUsersGroup,
} from 'react-icons/tb';

type SidebarItem = {
  label: string;
  href: string;
  Icon: IconType;
};

const STANDALONE_PATHS = ['/', '/auth'];

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: 'ポケモン一覧', href: '/dashboard/1', Icon: TbList },
  { label: 'パーティ編成', href: '/dashboard/2', Icon: TbUsersGroup },
  { label: 'ダメージ計算', href: '/dashboard/3', Icon: TbCalculator },
  { label: 'ステータス確認', href: '/dashboard/4', Icon: TbChartRadar },
  { label: '育成メモ', href: '/dashboard/5', Icon: TbNotes },
  { label: '設定', href: '/dashboard/6', Icon: TbSettings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const isStandalonePage = STANDALONE_PATHS.includes(pathname);

  return (
    <div className="app-container">
      <AppHeader
        isSidebarVisible={!isStandalonePage}
        isSidebarOpen={open}
        onToggleSidebar={() => setOpen((prev) => !prev)}
      />

      <AppSidebar isHidden={isStandalonePage} isOpen={open} pathname={pathname} items={SIDEBAR_ITEMS} />

      <main className={`app-main ${!isStandalonePage && open ? 'app-main--withSidebar' : ''}`}>
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
        <Link href="/" className="app-nav-link">
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
