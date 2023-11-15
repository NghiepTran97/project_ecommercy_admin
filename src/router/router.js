import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import Index from "../pages";
import UserIndex from "../pages/users";
import UserCreate from "../pages/users/create";
import UserEdit from "../pages/users/edit";
import ProfileIndex from "../pages/profile/indexProfile";
import ProfileUpdate from "../pages/profile/updateProfile";
import Login from "../pages/login/login";
import ChangePassword from "../pages/login/changePassword";
import ProductIndex from "../pages/product/indexProduct";
import CategoryIndex from "../pages/categories/indexCategory";
import CategoryCreate from "../pages/categories/createCategory";
import CategoryUpdate from "../pages/categories/updateCategory";
import BrandIndex from "../pages/brands/indexBrand";
import BrandCreate from "../pages/brands/createBrand";
import BrandUpdate from "../pages/brands/updateBrand";
import ProductCreate from "../pages/product/createProduct";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Index/>
            },
            {
                path: "users",
                children: [
                    {
                        index: true,
                        element: <UserIndex/>
                    },
                    {
                        path: "create",
                        element: <UserCreate/>
                    },
                    {
                        path: ":userId/edit",
                        element: <UserEdit/>
                    }
                ]
            },
            {
                path: "admin/profile",
                children: [
                    {
                        index: true,
                        element: <ProfileIndex/>
                    },
                    {
                        path: "update",
                        element: <ProfileUpdate/>
                    },
                    {
                        path:"change_password",
                        element: <ChangePassword/>
                    }
                ]
            },
            {
                path: "admin/product",
                children: [
                    {
                        index: true,
                        element: <ProductIndex/>
                    },
                    {
                        path: "create",
                        element: <ProductCreate/>
                    }

                ]
            },
            {
                path: "category",
                children: [
                    {
                        index: true,
                        element: <CategoryIndex/>
                    },
                    {
                        path: "create",
                        element: <CategoryCreate/>
                    },
                    {
                        path: ":categoryId/update",
                        element: <CategoryUpdate/>
                    }

                ]
            },
            {
                path: "brand",
                children: [
                    {
                        index: true,
                        element: <BrandIndex/>
                    },
                    {
                        path: "create",
                        element: <BrandCreate/>
                    },
                    {
                        path: ":brandId/update",
                        element: <BrandUpdate/>
                    }
                ]
            }
        ]
    },
    {
        path: '/',
        children: [
            {
                path: 'login',
                element: <Login/>
            }
        ]
    }
])

export default router;