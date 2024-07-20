import React from 'react';
import {AddProductScreen} from "../screens/AddProductScreen/AddProductScreen";

const AddProductPage = () => {
    return (
        <div className="common-container">
            <h1 style={{textAlign: "center", margin: "20px auto"}}>Add Product Page</h1>
            <AddProductScreen />
        </div>
    );
};

export default AddProductPage;