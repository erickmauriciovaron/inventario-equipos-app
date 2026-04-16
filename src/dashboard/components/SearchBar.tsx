import { useEffect, useRef, useState } from 'react';

interface Props {
  placeholder?: string;
  onQuery: (value: string) => void;
}

export const SearchBar = ({ placeholder = 'Buscar...', onQuery }: Props) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onQuery]);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-md">
        <label htmlFor="search" className="mb-2 block text-sm font-medium text-slate-700">
          Buscar equipo
        </label>
        <input
          ref={inputRef}
          id="search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <button
        type="button"
        onClick={() => {
          setQuery('');
          onQuery('');
          inputRef.current?.focus();
        }}
        className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Limpiar búsqueda
      </button>
    </div>
  );
};
