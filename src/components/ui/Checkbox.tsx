import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, ...props }) => {
    const id = React.useId();
    return (
        <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 border border-neutral-dark rounded text-brand-blue focus:ring-brand-blue"
                {...props}
            />
            <span className="text-sm text-neutral-darker">{label}</span>
        </label>
    );
};

export default Checkbox; 