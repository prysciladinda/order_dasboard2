import React from 'react';
import { CloseIcon } from '../Icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onClear?: () => void;
}

const Input: React.FC<InputProps> = ({ value, onClear, className = '', ...props }) => {
    const hasValue = value !== '' && value !== undefined;

    return (
        <div className="relative w-full">
            <input
                value={value}
                className={`w-full px-4 py-2 bg-white text-neutral-darker placeholder-neutral-dark border border-neutral-dark rounded-md focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue outline-none transition-all ${hasValue ? 'pr-10' : ''} ${className}`}
                {...props}
            />
            {hasValue && onClear && (
                <button
                    type="button"
                    onClick={onClear}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-medium hover:text-black"
                    aria-label="Clear input"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            )}
        </div>
    );
};

export default Input; 