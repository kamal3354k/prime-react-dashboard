import React from "react";
import { GridDataTable } from "../../components/molecules/dataTable/GridDataTable";
import { useGetAllProductsQuery } from "../../redux/services/productApi";
import { ProductTableData } from "./constant";
const AllProducts = () => {
  const { data } = useGetAllProductsQuery((state) => state.productApi);
  return (
    <div>
      <GridDataTable data={data} tableColumnData={ProductTableData} />
    </div>
  );
};

export default AllProducts;
