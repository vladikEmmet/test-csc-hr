import React, { forwardRef } from 'react';
import cn from 'clsx';
import styles from './Input.module.scss';

interface InputProps {
    type: string;
    name: string;
    className?: string;
    placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ type, name, className, placeholder, ...props }, ref) => {
    return <input type={type} name={name} className={cn(className, styles.input)} placeholder={placeholder} ref={ref} {...props} />;
});