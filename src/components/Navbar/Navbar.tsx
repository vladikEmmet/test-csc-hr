import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import styles from './Navbar.module.scss';
import routes from "../../routes/routes";
import {BurgerButton} from "../UI/Button/BurgerButton/BurgerButton";
import cn from 'clsx';

export const Navbar = () => {
    const location = useLocation();
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    return (
        <>
            <div className={cn(styles.container, styles.desktop)}>
                <div className="common-container">
                    <nav>
                        <ul>
                            {routes.map(route =>
                                <li key={route.path} className={location.pathname === route.path ? styles.active : ""}>
                                    <Link to={route.path}>{route.name}</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
            <div className={styles.mobile}>
                <div className={styles.container}>
                    <div className="common-container">
                        <BurgerButton isOpened={isMenuOpened} onClick={() => setIsMenuOpened(prev => !prev)} />
                    </div>
                    <div className={cn(styles.nav, {
                        [styles.active]: isMenuOpened,
                    })}>
                        <nav>
                            <ul>
                                {routes.map(route =>
                                    <li key={route.path} className={location.pathname === route.path ? styles.active : ""}>
                                        <Link to={route.path} onClick={() => setIsMenuOpened(false)}>{route.name}</Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};