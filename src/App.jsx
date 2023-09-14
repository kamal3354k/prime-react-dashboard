import { Typography } from "@mui/material";
import "./styles/App.css";
import routes from "./router/route";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllProduct } from "./redux/slice/allProductSlice";
import { useGetAllProductsQuery } from "./redux/services/productApi";

function App() {
  const dispatch = useDispatch();
  const { data } = useGetAllProductsQuery((state) => state.productApi);

  useEffect(() => {
    dispatch(setAllProduct(data?.products));
  }, [data?.products]);

  return (
    <>
      <Routes>
        {routes.map((item, i) => {
          return <Route key={i} {...item} />;
        })}
      </Routes>
    </>
  );
}

export default App;
