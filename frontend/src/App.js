import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.jsx
// @ts-ignore
import { motion } from 'framer-motion';
import './App';
function App() {
    return (_jsxs("div", { className: "app-container", children: [_jsx(motion.header, { initial: { y: -80, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { type: 'spring', stiffness: 50 }, className: "header", children: _jsx("h1", { children: "\u2699\uFE0F \uC720\uD2F8\uB9AC\uD2F0 \uD328\uD0A4\uC9C0" }) }), _jsx(motion.main, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 }, className: "main-content", children: _jsx(motion.p, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: 'spring', bounce: 0.5 }, children: "\uB2E4\uC591\uD55C \uC720\uD2F8\uB9AC\uD2F0 \uB3C4\uAD6C\uB4E4\uC744 \uD55C \uACF3\uC5D0!" }) })] }));
}
export default App;
