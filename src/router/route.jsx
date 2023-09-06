import Layout from "../layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home/home";

const routes = [
  {
    path: "/",
    element: <Home/>,
    exact: true,
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
];

export default routes;
