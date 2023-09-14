import React from "react";
import { GridDataTable } from "../../components/molecules/dataTable/GridDataTable";
import { Typography } from "@mui/material";
import { useGetAllProductsQuery } from "../../redux/services/productApi";
import { ProductTableData } from "./constant";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Typography
        fontSize="22px"
        padding="10px 0"
        fontWeight="600"
        sx={{ display: "flex",alignItems:"center"}}
      >
        <Link to="/all-products"
        style={{ display: "flex"}}

        >
          <i className="pi pi-angle-left" style={{ fontSize: "22px" }}></i>
        </Link>
        Dashboard
      </Typography>
      <GridDataTable
        tableColumnData={ProductTableData}
        isAdmin={true}
      />
    </div>
  );
};

export default Dashboard;
