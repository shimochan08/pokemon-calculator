'use client';

import { predictPokemon } from '@/lib/predict/autocomplete';
import { useState, useMemo } from 'react';
import { HiMenu } from 'react-icons/hi';

export type SearchItem = {
  id: number;
  english: string;
  japanese: string;
};

type SearchBarProps = {
  items: readonly SearchItem[];
  current?: string;
  onSelect?: (item: SearchItem) => void;
};

export default function SearchBar({ items, current, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(() => {
    return predictPokemon(query)
      .filter((item) => item.english !== current) // 現在のポケモンは除外
      .slice(0, 5);
  }, [query, current]);

  return (
    <div className="searchItem">
      <div className="searchItemField">
        {isOpen && <HiMenu className={`searchItemIcon ${isOpen ? 'hidden' : 'block'}`} />}
        <input
          className="searchItemInput"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={(e) => {
            if (!isOpen || results.length === 0) return;

            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
            }

            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
            }

            if (e.key === 'Enter' && activeIndex >= 0) {
              e.preventDefault();
              const item = results[activeIndex];
              onSelect?.(item);
              setQuery('');
              setIsOpen(false);
              setActiveIndex(-1);
            }
          }}
          placeholder="ポケモンを検索"
        />
      </div>

      {isOpen && results.length > 0 && (
        <ul className="searchItemResults">
          {results.map((item, index) => (
            <li
              key={item.id}
              className={`searchItemResult ${index === activeIndex ? 'searchItemResult--active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                onSelect?.(item);
                setQuery(item.japanese);
                setIsOpen(false);
                setActiveIndex(-1);
              }}
            >
              <div
                className={`searchItemResultLabel ${index === activeIndex ? 'searchItemResultLabel--active' : ''}`}
              >
                {item.japanese}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
