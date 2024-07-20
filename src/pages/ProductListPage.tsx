import React, {useEffect} from 'react';
import {ProductList} from "../screens/ProductList/ProductList";

const ProductListPage = () => {
    useEffect(() => {
        document.title = "Products and Items";
    }, []);

    return (
        <div className="common-container">
            <h1 style={{textAlign: "center", margin: "20px auto"}}>Product List Page</h1>
            <ProductList />
        </div>
    );
};

export default ProductListPage;