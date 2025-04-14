import { jsx as _jsx } from "react/jsx-runtime";
export const Checkbox = ({ checked, onCheckedChange }) => {
    return (_jsx("input", { type: "checkbox", checked: checked, onChange: onCheckedChange, className: "w-4 h-4 accent-teal-600 dark:accent-teal-400" }));
};
