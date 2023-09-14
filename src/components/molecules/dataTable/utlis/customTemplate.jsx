import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { defaultImage } from "../../viewAndEditProductCard/constant";

export const formatCurrency = (value) => {
  return value?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const getStockAndSeverity = (product) => {
  if (product?.stock > 20) {
    return { severity: "success", text: "INSTOCK" };
  } else if (product?.stock > 0 && product.stock < 20) {
    return { severity: "warning", text: "LOWSTOCK" };
  } else {
    return { severity: "danger", text: "OUTOFSTOCK" };
  }
};

// template
export const priceBodyTemplate = (rowData) => {
  return formatCurrency(rowData?.price);
};

export const imageBodyTemplate = (rowData) => {
  return (
    <img
      src={rowData?.thumbnail || defaultImage}
      alt={rowData?.title}
      className="shadow-2 border-round"
      style={{ width: "64px" }}
    />
  );
};

export const ratingBodyTemplate = (rowData) => {
  return <Rating value={Math.round(rowData?.rating)} readOnly cancel={false} />;
};

export const statusBodyTemplate = (rowData) => {
  const { severity, text } = getStockAndSeverity(rowData);
  return <Tag value={text} severity={severity}></Tag>;
};


