import React, {FC} from 'react';
import {ButtonVariant} from "../../../types/enum";
import styles from './Button.module.scss';
import cn from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonVariant;
}

export const Button: FC<ButtonProps> =
    ({
         onClick,
         children,
         className,
         disabled,
         variant,
         ...props
    }) => {
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={cn(styles.button, styles[variant], className)}
                {...props}
            >
                {children}
            </button>
        );
};