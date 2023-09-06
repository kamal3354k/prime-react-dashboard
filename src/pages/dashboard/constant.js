import {
  imageBodyTemplate,
  priceBodyTemplate,
  ratingBodyTemplate,
  statusBodyTemplate,
} from "../../components/molecules/dataTable/utlis/customTemplate";

export const ProductTableData = [
  {
    selectionMode: "multiple",
    exportable: false,
  },
  {
    field: "title",
    header: "Name",
    sortable: true,
    style: { minWidth: "8rem" },
  },
  {
    field: "image",
    header: "Image",
    body: imageBodyTemplate,
  },
  {
    field: "price",
    header: "Price",
    sortable: true,
    style: { minWidth: "8rem" },
    body: priceBodyTemplate,
  },
  {
    field: "category",
    header: "Category",
    sortable: true,
  },
  {
    field: "rating",
    header: "Rating",
    sortable: true,
    body: ratingBodyTemplate,
    style: { minWidth: "12rem" },
  },
  {
    field: "inventoryStatus",
    header: "Status",
    sortable: true,
    body: statusBodyTemplate,
    style: { minWidth: "12rem" },
  },
  {
    header: "Action",
    exportable: false,
    body: (item) => item,
    style: { minWidth: "12rem" },
  },
];

export const productCategoryList = [
  { value: "smartphones", text: "Smartphones" },
  { value: "laptops", text: "Laptops" },
  { value: "fragrances", text: "Fragrances" },
  { value: "skincare", text: "Skincare" },
  { value: "groceries", text: "Groceries" },
  { value: "home-decoration", text: "Home Decoration" },
];
