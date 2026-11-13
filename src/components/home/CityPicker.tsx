import { Location } from "@/types/Location";
import { titleCase } from "@/utils/helper";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";

interface CityPickerProps {
    locations: Location[] | undefined;
    value: string | null;
    onChange: (id: string) => void;
}

export default function CityPicker({ locations, value, onChange }: CityPickerProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const root = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLInputElement>(null);
    const listId = useId();

    const selected = locations?.find((l) => l.id === value);
    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        const all = locations ?? [];
        return (q ? all.filter((l) => l.lokasi.toLowerCase().includes(q)) : all).slice(0, 60);
    }, [locations, query]);

    useEffect(() => {
        if (!open) return;
        input.current?.focus();
        const onDown = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [open]);

    useEffect(() => setActive(0), [query]);

    const choose = (id: string) => {
        onChange(id);
        setOpen(false);
        setQuery("");
    };

    const onKey = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") { setOpen(false); return; }
        if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)); }
        if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
        if (e.key === "Enter" && results[active]) { e.preventDefault(); choose(results[active].id); }
    };

    return (
        <div ref={root} className="relative w-full sm:w-80">
            <span className="mb-1.5 block text-sm font-medium text-muted" id={`${listId}-label`}>Kota</span>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-labelledby={`${listId}-label ${listId}-value`}
                onClick={() => setOpen((v) => !v)}
                className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 text-left font-semibold transition-colors hover:border-ink"
            >
                <span id={`${listId}-value`} className="truncate">{selected ? titleCase(selected.lokasi) : "Memuat kota…"}</span>
                <HiChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-xl border border-line bg-surface shadow-xl">
                    <label className="flex items-center gap-2 border-b border-line px-4 transition-colors focus-within:border-accent focus-within:bg-accent-soft/40">
                        <HiSearch aria-hidden="true" className="h-5 w-5 text-muted" />
                        <span className="sr-only">Cari kota</span>
                        <input
                            ref={input}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={onKey}
                            role="combobox"
                            aria-expanded="true"
                            aria-controls={listId}
                            aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
                            placeholder="Ketik nama kota, mis. Bandung"
                            className="min-h-12 w-full bg-transparent outline-none placeholder:text-muted"
                        />
                    </label>
                    <ul id={listId} role="listbox" aria-label="Daftar kota" className="max-h-72 overflow-y-auto py-1">
                        {results.length === 0 && <li className="px-4 py-3 text-muted">Kota tidak ditemukan.</li>}
                        {results.map((l, i) => (
                            <li
                                key={l.id}
                                id={`${listId}-${l.id}`}
                                role="option"
                                aria-selected={l.id === value}
                                onMouseEnter={() => setActive(i)}
                                onClick={() => choose(l.id)}
                                className={`flex min-h-11 cursor-pointer items-center justify-between px-4 ${i === active ? "bg-accent-soft" : ""} ${l.id === value ? "font-semibold text-accent" : ""}`}
                            >
                                {titleCase(l.lokasi)}
                                {l.id === value && <span className="text-sm">Dipilih</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
