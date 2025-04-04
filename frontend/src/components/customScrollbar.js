import { jsx as _jsx } from "react/jsx-runtime";
import "./customScrollbar.css";
const CustomScrollbar = ({ children, className = "" }) => {
    return (_jsx("div", { className: `custom-scrollbar overflow-auto bg-zinc-900 text-white ${className}`, children: children }));
};
export default CustomScrollbar;
