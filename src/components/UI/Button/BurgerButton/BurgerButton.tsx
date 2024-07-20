import React, {FC} from 'react';
import styles from './BurgerButton.module.scss';
import cn from 'clsx';

interface BurgerButtonProps {
    isOpened: boolean;
    onClick: () => void;
}

export const BurgerButton: FC<BurgerButtonProps> = ({isOpened, onClick}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container} onClick={onClick}>
                <div className={cn(styles.burger, {
                    [styles.animated]: isOpened,
                }
                )}></div>
            </div>
        </div>
    );
};