import React from 'react';
import styles from "./WelcomeScreen.module.scss";
import {Button} from "../../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import {ButtonVariant} from "../../types/enum";

export const WelcomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1>Welcome!</h1>
            <p>
                This application is designed for managing products in a warehouse. With administrator rights, you can add and delete products, as well as edit existing ones.
            </p>
            <Button
                onClick={() => navigate('/products')}
                variant={ButtonVariant.DARK}
                className={styles.button}
            >
                Product list
            </Button>
        </div>
    );
};