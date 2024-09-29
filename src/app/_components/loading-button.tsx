import React from 'react';

interface LoadingButtonProps {
    pending: boolean;
    className: string;
    children: React.ReactNode; // Add this line
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ pending, className, children }) => {
    return (
        <button className={className} disabled={pending}>
            {pending ? 'Loading...' : children}
        </button>
    );
};

export default LoadingButton;