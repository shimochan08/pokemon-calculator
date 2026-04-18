'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePokemonBuildsContext } from '@/contexts/PokemonBuildsContext';
import { pokemonMap } from '@/lib/data/pokemonMap';

type AppSidebarProps = {
  hidden: boolean;
  open: boolean;
};

export default function AppSidebar({ hidden, open }: AppSidebarProps) {
  const pathname = usePathname();
  const { slots, builds } = usePokemonBuildsContext();

  return (
    <aside className={`app-sidebar ${hidden ? 'app-sidebar--hidden' : ''} ${!open ? 'app-sidebar--collapsed' : ''}`}>
      <nav className="app-sidebarNav">
        <ul>
          {(slots ?? []).map((slot, idx) => {
            const href = `/dashboard/${idx + 1}`;
            const build = builds[idx];
            const pokemonLabel = build?.name
              ? pokemonMap.find((pokemon) => pokemon.english === build.name)?.japanese ?? build.name
              : 'unknown';

            return (
              <li key={slot.slotId} className="app-nav-item">
                <Link href={href} className={`app-nav-link ${pathname === href ? 'active' : ''}`}>
                  {pokemonLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
