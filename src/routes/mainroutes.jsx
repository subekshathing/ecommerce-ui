
import Cart from "../component/Cart";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import ProductList from "../pages/ProductList";


const mainRoutes=[
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"home",
                element:<Home/>
            },
            {
                path:"products",
                element:<ProductList/>
            },
            {
                path:"about",
                element:<About/>
            },
            {
                path:"add-product",
                element:<AddProduct/>
            },
            {
                path:"product-details/:id",
                element:<ProductDetails/>
            },
            {
                path:"product-edit/:id",
                element:<EditProduct/>
            },
            {
                path: "cart",
                element: <Cart />,
              },
          
        ]
    }
]
export default mainRoutes