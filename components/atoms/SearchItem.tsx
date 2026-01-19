"use client";

import { predictPokemon } from "@/lib/predict/autocomplete";
import { useState, useMemo } from "react";
import { HiMenu } from "react-icons/hi";

export type SearchItem = {
    id: number;
    english: string;
    japanese: string;
};

type Props = {
    items: readonly SearchItem[];
    onSelect?: (item: SearchItem) => void;
};

export default function SearchBar({ items, onSelect }: Props) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);


    const results = useMemo(() => {
        return predictPokemon(query).slice(0, 5);
    }, [query]);


    return (
        <div className="relative w-full max-w-md">
            <div className="flex items-center gap-2 rounded-xl border px-3 py-2 shadow-sm">
                <HiMenu className="text-gray-500" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                        setActiveIndex(-1);
                    }}
                    onKeyDown={(e) => {
                        if (!open || results.length === 0) return;

                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setActiveIndex((prev) =>
                                prev < results.length - 1 ? prev + 1 : 0
                            );
                        }

                        if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setActiveIndex((prev) =>
                                prev > 0 ? prev - 1 : results.length - 1
                            );
                        }

                        if (e.key === "Enter" && activeIndex >= 0) {
                            e.preventDefault();
                            const item = results[activeIndex];
                            onSelect?.(item);
                            setQuery(item.japanese);
                            setOpen(false);
                            setActiveIndex(-1);
                        }
                    }}
                    placeholder="ポケモンを検索"
                    className="w-full outline-none"
                    style={{
                        width: "100%",
                        padding: "8px 10px",
                        background: "#fff",
                        color: "#111",
                        fontSize: 14,
                    }}
                />
            </div>

            {open && results.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full rounded-xl border bg-white shadow">
                    {results.map((item, index) => (
                        <li
                            key={item.id}
                            className="cursor-pointer px-3 py-2"
                            style={{
                                background:
                                    index === activeIndex ? "#e5e7eb" : "#fff",
                            }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => {
                                onSelect?.(item);
                                setQuery(item.japanese);
                                setOpen(false);
                                setActiveIndex(-1);
                            }}
                        >
                            <div className="text-sm font-medium">{item.japanese}</div>
                        </li>
                    ))}

                </ul>
            )}
        </div>
    );
}
