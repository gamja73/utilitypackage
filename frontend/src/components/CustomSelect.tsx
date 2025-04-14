import {useEffect, useRef, useState} from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    placeholder?: string;
    onChange: (option: Option | null) => void;
    isDarkMode: boolean;
}

export default function CustomSelect({options, placeholder = "옵션을 선택하세요...", onChange, isDarkMode}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Option | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (option: Option) => {
        setSelected(option);
        onChange(option);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full max-w-md" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className={`w-full px-4 py-2 border rounded-md text-left transition-colors duration-200
          ${isDarkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-zinc-300 text-zinc-900"}`}
            >
                {selected ? selected.label : placeholder}
            </button>

            {isOpen && (
                <div
                    className={`absolute z-10 mt-2 w-full border rounded-md shadow-lg
            ${isDarkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-zinc-200 text-zinc-900"}`}
                >
                    <input
                        type="text"
                        placeholder="검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full px-3 py-2 border-b outline-none text-sm
              ${isDarkMode ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400" : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-500"}`}
                    />
                    <ul className="max-h-60 overflow-y-auto">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className={`px-4 py-2 cursor-pointer hover:bg-teal-500 hover:text-white transition-colors duration-200
                  ${selected?.value === option.value ? "font-semibold" : ""}`}
                            >
                                {option.label}
                            </li>
                        ))}
                        {filteredOptions.length === 0 && (
                            <li className="px-4 py-2 text-sm text-zinc-400">검색 결과가 없습니다</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}