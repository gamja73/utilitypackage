import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
export default function CustomSelect({ options, placeholder = "옵션을 선택하세요...", onChange, isDarkMode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);
    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const handleSelect = (option) => {
        setSelected(option);
        onChange(option);
        setIsOpen(false);
        setSearchTerm("");
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "relative w-full max-w-md", ref: dropdownRef, children: [_jsx("button", { type: "button", onClick: toggleDropdown, className: `w-full px-4 py-2 border rounded-md text-left transition-colors duration-200
          ${isDarkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-zinc-300 text-zinc-900"}`, children: selected ? selected.label : placeholder }), isOpen && (_jsxs("div", { className: `absolute z-10 mt-2 w-full border rounded-md shadow-lg
            ${isDarkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-zinc-200 text-zinc-900"}`, children: [_jsx("input", { type: "text", placeholder: "\uAC80\uC0C9...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: `w-full px-3 py-2 border-b outline-none text-sm
              ${isDarkMode ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400" : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-500"}` }), _jsxs("ul", { className: "max-h-60 overflow-y-auto", children: [filteredOptions.map((option) => (_jsx("li", { onClick: () => handleSelect(option), className: `px-4 py-2 cursor-pointer hover:bg-teal-500 hover:text-white transition-colors duration-200
                  ${selected?.value === option.value ? "font-semibold" : ""}`, children: option.label }, option.value))), filteredOptions.length === 0 && (_jsx("li", { className: "px-4 py-2 text-sm text-zinc-400", children: "\uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4" }))] })] }))] }));
}
