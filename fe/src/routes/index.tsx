import LayoutAdmin from "@/pages/(dashboard)/layout";
import ProductAddPage from "@/pages/(dashboard)/products/add/page";
import NotFound from "@/pages/(website)/404/page";
import CartPage from "@/pages/(website)/cart/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import OrderPage from "@/pages/(website)/order/page";
import DetailProduct from "@/pages/(website)/product/detail/page";
import ProductPage from "@/pages/(website)/product/page";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ProductManagementPage from "@/pages/(dashboard)/products/page";
import ProductEditPage from "@/pages/(dashboard)/products/edit/page";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                    <Route path="products" element={<ProductPage />} />
                    <Route path="detail" element={<DetailProduct />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="order" element={<OrderPage />} />
                </Route>
                <Route
                    path="admin"
                    element={
                        <PrivateRoute>
                            <LayoutAdmin />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path="products"
                        element={<ProductManagementPage />}
                    />
                    <Route path="products/add" element={<ProductAddPage />} />
                    <Route
                        path="products/:id/edit"
                        element={<ProductEditPage />}
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default Router;
