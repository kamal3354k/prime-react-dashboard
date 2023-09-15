import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProduct } from "../../../redux/slice/productSlice.jsx";
import { initialState_Product } from "../../../redux/slice/productSlice.jsx";
import { productCategoryList } from "../../../pages/dashboard/constant.js";
import "./style.scss";
import { ratingBodyTemplate } from "./utlis/customTemplate.jsx";
import { useNavigate } from "react-router-dom";
import { setAllProduct } from "../../../redux/slice/allProductSlice.jsx";

export function GridDataTable({ tableColumnData, isAdmin }) {
  const [productDialog, setProductDialog] = useState({
    value: false,
    action: "",
  });
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const navigate = useNavigate();
  //   querys

  const product = useSelector((state) => state.product);
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog((pre) => ({ ...pre, value: false }));
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.title.trim()) {
      let _products = [...products];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = products.length + 1;
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      dispatch(setAllProduct(_products));
      setProductDialog(false);
      dispatch(setCurrentProduct(initialState_Product));
    }
  };

  const editProduct = (product) => {
    dispatch(setCurrentProduct({ ...product }));
    navigate("/edit-product");
  };

  const confirmDeleteProduct = (product) => {
    dispatch(setCurrentProduct(product));
    setDeleteProductDialog(true);
  };

  const viewProduct = (product) => {
    dispatch(setCurrentProduct(product));
    navigate("/view-product");
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    dispatch(setAllProduct(_products));
    setDeleteProductDialog(false);
    dispatch(setCurrentProduct(initialState_Product));
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    dispatch(setAllProduct(_products));
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };
  const onCategoryChange = (e) => {
    let _product = { ...product };

    _product["category"] = e.value;
    dispatch(setCurrentProduct(_product));
  };
  const handleImageUpload = (e) => {
    let _product = { ...product };
    if (e.files.length) {
      _product["thumbnail"] = e.files[0].objectURL;
      _product["images"] = e.files.map((d) => d.objectURL);
      dispatch(setCurrentProduct(_product));
    }
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;
    dispatch(setCurrentProduct(_product));
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    dispatch(setCurrentProduct(_product));
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={() => {
            dispatch(setCurrentProduct(initialState_Product));

            navigate("/add-product");
          }}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {isAdmin && (
          <>
            <Button
              icon="pi pi-pencil"
              rounded
              outlined
              className="mr-2"
              onClick={() => editProduct(rowData)}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              className="mr-2"
              onClick={() => confirmDeleteProduct(rowData)}
            />
          </>
        )}
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          severity="primary"
          onClick={() => viewProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );
  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        {isAdmin && (
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
        )}

        {products.length ? (
          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            header={header}
          >
            {/* dynamic column mapping */}
            {tableColumnData?.map((item, i) =>
              item.header !== "Action" ? (
                <Column key={i} {...item}></Column>
              ) : (
                <Column key={i} {...item} body={actionBodyTemplate}></Column>
              )
            )}
          </DataTable>
        ) : (
          ""
        )}
      </div>

      <Dialog
        visible={productDialog.value}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Product Details"
        modal
        className="p-fluid product_modal"
        footer={productDialog.action !== "view" && productDialogFooter}
        onHide={hideDialog}
      >
        {productDialog.action === "view" && !product.thumbnail && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={product.thumbnail}
            className="product-image block m-auto pb-3"
          />
        )}
        {productDialog.action !== "view" ? (
          <>
            <div className="field">
              <label htmlFor="name" className="font-bold">
                Name
              </label>

              <InputText
                id="name"
                value={product.title}
                onChange={(e) => onInputChange(e, "title")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !product.title,
                })}
              />

              {submitted && !product.title && (
                <small className="p-error">Name is required.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="demo" className="font-bold">
                Photo
              </label>
              <FileUpload
                onSelect={handleImageUpload}
                mode="basic"
                multiple
                name="demo"
                accept="image/*"
                maxFileSize={1000000}
              />
            </div>

            <div className="field">
              <label htmlFor="name" className="font-bold">
                Brand
              </label>

              <InputText
                id="brand"
                value={product.brand}
                onChange={(e) => onInputChange(e, "brand")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !product.title,
                })}
              />

              {submitted && !product.brand && (
                <small className="p-error">Brand is required.</small>
              )}
            </div>
            <div className="field">
              <label htmlFor="description" className="font-bold">
                Description
              </label>
              <InputTextarea
                id="description"
                value={product.description}
                onChange={(e) => onInputChange(e, "description")}
                required
                rows={3}
                cols={20}
              />
            </div>

            <div className="field">
              <label className="mb-3 font-bold">Category</label>
              <div className="formgrid grid">
                {productCategoryList.map((item, i) => (
                  <div className="field-radiobutton col-6" key={i}>
                    <RadioButton
                      inputId={`category${i}`}
                      name="category"
                      value={item.value}
                      onChange={onCategoryChange}
                      checked={product.category === item.value}
                    />
                    <label htmlFor={`category${i}`}>{item.text}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price" className="font-bold">
                  Price
                </label>
                <InputNumber
                  id="price"
                  value={product.price}
                  onValueChange={(e) => onInputNumberChange(e, "price")}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                />
              </div>
              <div className="field col">
                <label htmlFor="quantity" className="font-bold">
                  Quantity
                </label>
                <InputNumber
                  id="quantity"
                  value={product.stock}
                  onValueChange={(e) => onInputNumberChange(e, "stock")}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="view_product">
              <div className="view_product_image_container">
                <img className="view_product_image" src={product.thumbnail} />
              </div>
              <div className="view_product_other_image">
                {product?.images?.map((item, i) => (
                  <div
                    className="other_image"
                    key={i}
                    style={{ backgroundImage: `url(${item})` }}
                  ></div>
                ))}
              </div>
              <div className="view_product_details">
                <table>
                  <tr>
                    <td>
                      <b>Name :</b>
                    </td>
                    <td>{product.title}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Category :</b>
                    </td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Brand :</b>
                    </td>
                    <td>{product.brand}</td>
                  </tr>

                  <tr>
                    <td>
                      <b>Price :</b>
                    </td>
                    <td>{product.price}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Rating :</b>
                    </td>
                    <td>{ratingBodyTemplate(product)}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Quantity :</b>
                    </td>
                    <td>{product.stock}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Description :</b>
                    </td>
                    <td>{product.description}</td>
                  </tr>
                </table>
              </div>
            </div>
          </>
        )}
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
