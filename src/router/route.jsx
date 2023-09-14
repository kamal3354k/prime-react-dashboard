import Layout from "../layout/Layout";
import EditProduct from "../pages/EditProduct/EditProduct.jsx";
import AllProducts from "../pages/allproducts/AllProducts";
import Dashboard from "../pages/dashboard/Dashboard";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import ViewProduct from "../pages/viewProduct/ViewProduct";

const routes = [
  {
    path: "/edit-product",
    element: (
      <Layout>
        <EditProduct />
      </Layout>
    ),
    exact: true,
  },
  {
    path: "/add-product",
    element: (
      <Layout>
        <EditProduct />
      </Layout>
    ),
    exact: true,
  },
  {
    path: "/view-product",
    element: (
      <Layout>
        <ViewProduct />
      </Layout>
    ),
    exact: true,
  },
  {
    path: "/all-products",
    element: (
      <Layout title="All Products">
        <AllProducts />
      </Layout>
    ),
    exact: true,
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
    exact: true,
  },
  {
    path: "*",
    element: (
      <Layout>
        <PageNotFound />
      </Layout>
    ),
  },
];

export default routes;
