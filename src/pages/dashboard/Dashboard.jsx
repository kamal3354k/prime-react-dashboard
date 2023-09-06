import React from "react";
import { GridDataTable } from "../../components/molecules/dataTable/GridDataTable";
import { Typography } from "@mui/material";
import { useGetAllProductsQuery } from "../../redux/services/productApi";
import { ProductTableData } from "./constant";

const Dashboard = () => {
  const { data } = useGetAllProductsQuery((state) => state.productApi);
  return (
    <div>
      <Typography fontSize="22px" padding="18px 0" fontWeight="600">Dashboard</Typography>
      <GridDataTable data={data} tableColumnData={ProductTableData} />
    </div>
  );
};

export default Dashboard;
