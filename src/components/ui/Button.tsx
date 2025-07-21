import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const baseClasses = 'font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
        primary: 'bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-400 focus:ring-black',
        secondary: 'bg-white text-neutral-darker border border-neutral-darker hover:bg-neutral-100 disabled:bg-neutral-100 disabled:text-neutral-400 focus:ring-neutral-darker',
        ghost: 'bg-transparent text-neutral-dark hover:text-brand-blue focus:ring-brand-blue',
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-5 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button; 