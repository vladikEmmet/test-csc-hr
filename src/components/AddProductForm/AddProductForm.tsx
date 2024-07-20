import React, { FC } from 'react';
import styles from './AddProductForm.module.scss';
import {AddProductType, ButtonVariant, SubmitType} from '../../types/enum';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Button/Button';
import { errorCatch } from '../../utils/errorCatch';
import ProductService from '../../services/product.service';
import ItemService from '../../services/item.service';
import {generateRandomId} from "../../utils/generateRandomID";
import {useNavigate} from "react-router-dom";

// Определите типы данных для продуктов и предметов
type Inputs = {
    name: string;
    price?: number;
    description?: string;
}

interface AddProductFormProps {
    type: AddProductType;
}

export const AddProductForm: FC<AddProductFormProps> = ({ type}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const id = generateRandomId();
            if (type === AddProductType.PRODUCT) {
                const productData = {
                    id,
                    name: data.name,
                    price: data.price ?? 0,
                };
                await ProductService.addProduct(productData);
            } else if (type === AddProductType.ITEM) {
                if (data.description) {
                    const itemData = {
                        id,
                        name: data.name,
                        description: data.description,
                    };
                    await ItemService.addItem(itemData);
                } else {
                    console.log("Description is required for items");
                }
            }
            navigate('/products');
        } catch (err) {
            console.log(errorCatch(err));
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.label}>
                Name
                <Input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className={styles.input}
                />
            </label>
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}

            {type === AddProductType.PRODUCT && (
                <>
                    <label className={styles.label}>
                        Price
                        <Input
                            {...register('price', { valueAsNumber: true, required: "Price is required" })}
                            type="number"
                            className={styles.input}
                        />
                    </label>
                    {errors.price && <span className={styles.error}>{errors.price.message}</span>}
                </>
            )}

            {type === AddProductType.ITEM && (
                <>
                    <label className={styles.label}>
                        Description
                        <Input
                            {...register('description', { required: 'Description is required' })}
                            type="text"
                            className={styles.input}
                        />
                    </label>
                    {errors.description && <span className={styles.error}>{errors.description.message}</span>}
                </>
            )}

            <Button type="submit" variant={ButtonVariant.DARK} className={styles.button}>
                Add {type}
            </Button>
        </form>
    );
};
