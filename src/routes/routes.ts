import HomePage from "../pages/HomePage";
import AddProductPage from "../pages/AddProductPage";
import ProductListPage from "../pages/ProductListPage";

const routes = [
    {
        path: '/',
        element: HomePage,
        name: "Home",
    },
    {
        path: '/products',
        element: ProductListPage,
        name: "Products"
    },
    {
        path: '/add-product',
        element: AddProductPage,
        name: "Add Product"
    }
]

export default routes;
