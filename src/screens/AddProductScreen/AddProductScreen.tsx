import React, {useState} from 'react';
import {AddProductType} from "../../types/enum";
import cn from 'clsx';
import styles from "./AddProductScreen.module.scss";
import {AddProductForm} from "../../components/AddProductForm/AddProductForm";

export const AddProductScreen = () => {
    const [type, setType] = useState<AddProductType>(AddProductType.PRODUCT);

    return (
        <div className={styles.container}>
            <div className={styles["type-container"]}>
                <button onClick={() => setType(AddProductType.PRODUCT)}
                        className={cn(styles.button,
                            {[styles.active]: type === AddProductType.PRODUCT})}>
                    Add Product
                </button>
                <button onClick={() => setType(AddProductType.ITEM)}
                        className={cn(styles.button,
                            {[styles.active]: type === AddProductType.ITEM})}>
                    Add Item
                </button>
            </div>
            <div className={styles['form-container']}>
                <AddProductForm type={type} />
            </div>
        </div>
    );
};