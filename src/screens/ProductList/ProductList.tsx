import React, { useEffect, useState } from 'react';
import { IItem } from '../../types/item.type';
import { IProduct } from '../../types/product.type';
import ProductService from '../../services/product.service';
import ItemService from '../../services/item.service';
import { errorCatch } from '../../utils/errorCatch';
import { Loader } from '../../components/UI/Loader/Loader';
import styles from './ProductList.module.scss';
import { Button } from '../../components/UI/Button/Button';
import { ButtonVariant } from '../../types/enum';
import ContextMenu from '../../components/UI/ContextMenu/ContextMenu';
import { ProductItem } from '../../components/ProductItem/productItem';
import {Input} from "../../components/UI/Input/Input";
import useDebounce from "../../hooks/useDebounce";

interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
    item: IItem | IProduct | null;
}

export const ProductList = () => {
    const [items, setItems] = useState<IItem[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0, item: null });
    const [editable, setEditable] = useState<string | null>(null);
    const [search, setSearch] = useState<string>('');
    const debouncedSearchTerm = useDebounce(search, 500);
    const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

    const afterEdit = (item: IItem | IProduct) => {
        if ('price' in item) {
            setProducts(prevProducts =>
                prevProducts.map(product => product.id === item.id ? item as IProduct : product)
            );
        } else {
            setItems(prevItems =>
                prevItems.map(i => i.id === item.id ? item as IItem : i)
            );
        }
        setEditable(null);
    };

    useEffect(() => {
        const fetchItems = async () => await ItemService.getAllItems();
        const fetchProducts = async () => await ProductService.getAllProducts();

        const fetchData = async () => {
            try {
                setLoading(true);
                const [items, products] = await Promise.all([fetchItems(), fetchProducts()]);
                setItems(items);
                setProducts(products);
            } catch (err) {
                console.log(errorCatch(err));
                setError(errorCatch(err));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setFilteredItems(
                items.filter(item =>
                    item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )
            );
            setFilteredProducts(
                products.filter(product =>
                    product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredItems(items);
            setFilteredProducts(products);
        }
    }, [debouncedSearchTerm, items, products]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as Element;
            if (!target.closest('table')) {
                setContextMenu({ ...contextMenu, visible: false });
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [contextMenu]);

    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, item: IItem | IProduct) => {
        if (editable) return;
        e.preventDefault();
        if (contextMenu.item && contextMenu.item.id === item.id) {
            handleClose();
            return;
        }
        setContextMenu({
            visible: true,
            x: window.scrollX + e.clientX,
            y: window.scrollY + e.clientY,
            item: item
        });
    };

    const handleEdit = () => {
        setEditable(contextMenu.item!.id);
        setContextMenu({ ...contextMenu, visible: false });
    };

    const handleDelete = async () => {
        try {
            if ('price' in contextMenu.item!) {
                await ProductService.deleteProduct(contextMenu.item!.id);
                setProducts(prevProducts =>
                    prevProducts.filter(product => product.id !== contextMenu.item!.id)
                );
            } else {
                await ItemService.deleteItem(contextMenu.item!.id);
                setItems(prevItems =>
                    prevItems.filter(item => item.id !== contextMenu.item!.id)
                );
            }
        } catch (err) {
            console.log(errorCatch(err));
            setError(errorCatch(err));
        } finally {
            setContextMenu({ ...contextMenu, visible: false });
        }
    };

    const handleClose = () => {
        setContextMenu({ ...contextMenu, visible: false, item: null });
    };

    if (loading) {
        return (
            <div className={styles['loader-container']}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles['error-container']}>
                <h1>Oops...</h1>
                <p>{error}</p>
                <p>Click the button, reload the page or try later.</p>
                <Button onClick={() => window.location.reload()} variant={ButtonVariant.LIGHT}>Try again</Button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <input
                type={"text"}
                name={"search"}
                placeholder={"Search"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
                <div className={styles['search-results']}>
                    <h2>Search Results</h2>
                    <h3>Items</h3>
                    {
                        filteredItems.length === 0 ? <p>No items found</p> : (
                            <table className={styles.table}>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredItems.map(item => (
                                    <ProductItem
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        description={item.description}
                                        onClick={(e) => handleRowClick(e, item)}
                                        className={contextMenu.item && contextMenu.item.id === item.id ? styles.active : ''}
                                        isEdit={editable ? editable === item.id : false}
                                        onCancel={() => setEditable(null)}
                                        afterSubmit={afterEdit}
                                    />
                                ))}
                                </tbody>
                            </table>
                        )
                    }
                    <h3>Products</h3>
                    {
                        filteredProducts.length === 0 ? <p>No products found</p> : (
                            <table className={styles.table}>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredProducts.map(product => (
                                    <ProductItem
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        onClick={(e) => handleRowClick(e, product)}
                                        isEdit={editable ? editable === product.id : false}
                                        onCancel={() => setEditable(null)}
                                        afterSubmit={afterEdit}
                                    />
                                ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            )}
            <h2>Items List</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <ProductItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        onClick={(e) => handleRowClick(e, item)}
                        className={contextMenu.item && contextMenu.item.id === item.id ? styles.active : ''}
                        isEdit={editable ? editable === item.id : false}
                        onCancel={() => setEditable(null)}
                        afterSubmit={afterEdit}
                    />
                ))}
                </tbody>
            </table>
            <h2>Products List</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <ProductItem
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        onClick={(e) => handleRowClick(e, product)}
                        isEdit={editable ? editable === product.id : false}
                        onCancel={() => setEditable(null)}
                        afterSubmit={afterEdit}
                    />
                ))}
                </tbody>
            </table>
            {contextMenu.visible && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={handleClose}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

