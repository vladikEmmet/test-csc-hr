import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Button/Button';
import { AddProductType, ButtonVariant } from '../../types/enum';
import { IProduct } from '../../types/product.type';
import { IItem } from '../../types/item.type';
import ProductService from '../../services/product.service';
import ItemService from '../../services/item.service';
import { errorCatch } from '../../utils/errorCatch';
import styles from './ProductItem.module.scss';

type ProductItemProps = (IProduct | IItem) & {
    onClick: (e: React.MouseEvent<HTMLTableRowElement>) => void;
    className?: string;
    isEdit: boolean;
    onCancel: () => void;
    afterSubmit: (productData: any) => void;
};

interface Inputs {
    name: string;
    price?: number;
    description?: string;
}

export const ProductItem: FC<ProductItemProps> = (props) => {
    const { id, name, onClick, className, isEdit } = props;
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            name: name,
            price: 'price' in props ? (props as IProduct).price : undefined,
            description: 'description' in props ? (props as IItem).description : undefined,
        }
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if ('price' in props) {
                const productData = {
                    id,
                    name: data.name,
                    price: data.price ?? 0,
                };
                await ProductService.updateProduct(productData);
                props.afterSubmit(productData);
            } else if ('description' in props) {
                if (data.description) {
                    const itemData = {
                        id,
                        name: data.name,
                        description: data.description,
                    };
                    await ItemService.updateItem(itemData);
                    props.afterSubmit(itemData);
                } else {
                    console.log("Description is required for items");
                }
            }
        } catch (err) {
            console.log(errorCatch(err));
        }
    };

    if (isEdit) {
        return (
            <div className={styles.formContainer}>
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

                    {'price' in props && (
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

                    {'description' in props && (
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
                        Submit
                    </Button>
                    <Button
                        type="button"
                        variant={ButtonVariant.LIGHT}
                        className={styles.button}
                        onClick={props.onCancel}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        );
    }

    return (
        <tr onClick={onClick} className={className}>
            <td>{id}</td>
            <td>{name}</td>
            {'price' in props ? <td>{(props as IProduct).price}</td> : <td>{(props as IItem).description}</td>}
        </tr>
    );
};
