import React, {useEffect} from 'react';
import {AddProductScreen} from "../screens/AddProductScreen/AddProductScreen";

const AddProductPage = () => {
    useEffect(() => {
        document.title = "Add new product";
    }, []);

    return (
        <div className="common-container">
            <h1 style={{textAlign: "center", margin: "20px auto"}}>Add Product Page</h1>
            <AddProductScreen />
        </div>
    );
};

export default AddProductPage;