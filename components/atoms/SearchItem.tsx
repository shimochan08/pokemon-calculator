"use client";

import { predictPokemon } from "@/lib/predict/autocomplete";
import { useState, useMemo } from "react";
import { HiMenu } from "react-icons/hi";

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
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);


    const results = useMemo(() => {
        return predictPokemon(query)
            .filter(item => item.english !== current) // 現在のポケモンは除外
            .slice(0, 5);
    }, [query, current]);


    return (
        <div className="relative w-full max-w-md" >
            <div className="flex items-center gap-2 rounded-xl  px-3 py-2 " style={{ minWidth: "260px" }}>
                {isOpen && <HiMenu className={`text-gray-500 ${isOpen ? 'hidden' : 'block'}`} />}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                        setActiveIndex(-1);
                    }}
                    onKeyDown={(e) => {
                        if (!isOpen || results.length === 0) return;

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
                            setQuery("");
                            setIsOpen(false);
                            setActiveIndex(-1);
                        }
                    }}
                    placeholder="ポケモンを検索"
                    className="w-full outline-none"
                    style={{
                        width: "100%",
                        minWidth: "200px",
                        padding: "8px 10px",
                        background: "#182230",
                        color: "#ffffffff",
                        fontSize: 14,
                    }}
                />
            </div>

            {
                isOpen && results.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full rounded-xl border shadow-none overflow-hidden" >
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
                                    setIsOpen(false);
                                    setActiveIndex(-1);
                                }}
                            >
                                <div className={`text-sm font-medium ${index === activeIndex ? "text-blue-800" : "text-gray-800"
                                    }`}>{item.japanese}</div>
                            </li>
                        ))}

                    </ul>
                )
            }
        </div >
    );
}
