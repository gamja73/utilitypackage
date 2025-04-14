import React from 'react';

interface CheckboxProps {
    checked: boolean;
    onCheckedChange: () => void;
}

export const Checkbox = ({ checked, onCheckedChange }: CheckboxProps) => {
    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={onCheckedChange}
            className="w-4 h-4 accent-teal-600 dark:accent-teal-400"
        />
    );
};
