import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
const generateRandomKey = (length, useUpper, useLower, useNumbers, useSymbols) => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';
    let chars = '';
    if (useUpper)
        chars += upper;
    if (useLower)
        chars += lower;
    if (useNumbers)
        chars += numbers;
    if (useSymbols)
        chars += symbols;
    if (!chars)
        return '';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
const RandomKeyGeneratorPage = () => {
    const [useUpper, setUseUpper] = useState(true);
    const [useLower, setUseLower] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(false);
    const [count, setCount] = useState(5);
    const [length, setLength] = useState(16);
    const [keys, setKeys] = useState([]);
    const handleGenerate = () => {
        const results = Array.from({ length: count }, () => generateRandomKey(16, useUpper, useLower, useNumbers, useSymbols));
        setKeys(results);
    };
    return (_jsxs("div", { className: "flex flex-col items-center gap-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx(Checkbox, { checked: useUpper, onCheckedChange: () => setUseUpper(!useUpper) }), " \uB300\uBB38\uC790"] }), _jsxs("label", { className: "flex items-center gap-2", children: [_jsx(Checkbox, { checked: useLower, onCheckedChange: () => setUseLower(!useLower) }), " \uC18C\uBB38\uC790"] }), _jsxs("label", { className: "flex items-center gap-2", children: [_jsx(Checkbox, { checked: useNumbers, onCheckedChange: () => setUseNumbers(!useNumbers) }), " \uC22B\uC790"] }), _jsxs("label", { className: "flex items-center gap-2", children: [_jsx(Checkbox, { checked: useSymbols, onCheckedChange: () => setUseSymbols(!useSymbols) }), " \uD2B9\uC218\uBB38\uC790"] }), _jsxs("div", { className: "flex flex-col items-start", children: [_jsx("label", { htmlFor: "count", className: "text-sm mb-1", children: "\uC0DD\uC131 \uAC2F\uC218" }), _jsx("input", { id: "count", type: "number", min: 1, max: 50, value: count, onChange: (e) => setCount(Number(e.target.value)), className: "w-24 px-2 py-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600 dark:text-white", placeholder: "\uAC2F\uC218" })] }), _jsxs("div", { className: "flex flex-col items-start", children: [_jsx("label", { htmlFor: "length", className: "text-sm mb-1", children: "\uAE00\uC790 \uC218" }), _jsx("input", { id: "length", type: "number", min: 4, max: 128, value: length, onChange: (e) => setLength(Number(e.target.value)), className: "w-24 px-2 py-1 border rounded-md dark:bg-zinc-800 dark:border-zinc-600 dark:text-white", placeholder: "\uAE00\uC790 \uC218" })] }), _jsx("div", { className: "mt-6 sm:mt-0", children: _jsx(Button, { onClick: handleGenerate, children: "\uC0DD\uC131" }) })] }), _jsx("div", { className: "w-full max-w-2xl mt-6 flex flex-col gap-2", children: keys.map((key, i) => (_jsx("div", { className: "px-4 py-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-600 font-mono text-sm", children: key }, i))) })] }));
};
export default RandomKeyGeneratorPage;
