import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "primereact/utils";
import {
  initialState_Product,
  setCurrentProduct,
} from "../../../redux/slice/productSlice";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { productCategoryList } from "../../../pages/dashboard/constant";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./style.scss";
import { FileUpload } from "primereact/fileupload";
import { Typography } from "@mui/material";
import {
  priceBodyTemplate,
  ratingBodyTemplate,
  statusBodyTemplate,
} from "../dataTable/utlis/customTemplate";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../redux/services/productApi";
import { Toast } from "primereact/toast";
import { setAllProduct } from "../../../redux/slice/allProductSlice";
import { defaultImage } from "./constant";
const submitted = false;

const ViewAndEditProductCard = ({ title, type }) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [products, setProducts] = useState([]);
  const toast = useRef(null);
  const navigate = useNavigate();

  const { data } = useGetAllProductsQuery((state) => state.productApi);

  useEffect(() => {
    setProducts(data?.products);
  }, [data?.products]);

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;
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

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    dispatch(setCurrentProduct(_product));
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };

    _product["category"] = e.value;
    dispatch(setCurrentProduct(_product));
  };

  const saveProduct = () => {
    setSubmitted(true);
    const { title, category, price, stock, description, brand } = product;
    if (title && category && price && stock && description && brand) {
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
      dispatch(setCurrentProduct(initialState_Product));
      navigate("/dashboard");
    }
  };

  const cancelProduc = () => {
    navigate("/dashboard");
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
  return (
    <>
      <Toast ref={toast} />
      <main>
        <Card
          title={
            <>
              <Typography
                fontSize="22px"
                padding="10px 0"
                fontWeight="600"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <i
                  onClick={() => navigate(-1)}
                  className="pi pi-angle-left back-arrow"
                ></i>
                {title}
              </Typography>
            </>
          }
          className="m-0 p-4 pt-2 card"
          footer={() =>
            type === "EDIT" ? footer(saveProduct, cancelProduc) : ""
          }
        >
          <div className="edit-container grid">
            <div className="formgrid grid gap-5 ">
              <div className="sm:col-12 md:col">
                <div className="image-container">
                  <div className="view_product">
                    <div className="view_product_image_container">
                      <img
                        className="view_product_image"
                        src={product.thumbnail || defaultImage}
                      />
                    </div>
                    <div className="view_product_other_image">
                      {product?.images.length > 1 &&
                        product?.images?.map((item, i) => (
                          <div
                            className="other_image"
                            key={i}
                            style={{ backgroundImage: `url(${item})` }}
                          ></div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="formgrid grid">
                  <div className="field col flex direction-column">
                    <label htmlFor="name" className="font-bold">
                      Name
                    </label>
                    {type === "EDIT" ? (
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
                    ) : (
                      <Typography>{product.title}</Typography>
                    )}
                    {submitted && !product.title && (
                      <small className="p-error">Name is required.</small>
                    )}
                  </div>

                  <div className="field col flex direction-column">
                    <label htmlFor="name" className="font-bold">
                      Brand
                    </label>

                    {type === "EDIT" ? (
                      <InputText
                        id="brand"
                        value={product.brand}
                        onChange={(e) => onInputChange(e, "brand")}
                        required
                        autoFocus
                        className={classNames({
                          "p-invalid": submitted && !product.brand,
                        })}
                      />
                    ) : (
                      <Typography>{product.brand}</Typography>
                    )}

                    {submitted && !product.brand && (
                      <small className="p-error">Brand is required.</small>
                    )}
                  </div>
                </div>
                <div className="formgrid grid  ">
                  <div className="field col flex direction-column ">
                    <label htmlFor="price" className="font-bold">
                      Price
                    </label>
                    {type === "EDIT" ? (
                      <InputNumber
                        id="price"
                        value={product.price}
                        onValueChange={(e) => onInputNumberChange(e, "price")}
                        mode="currency"
                        currency="USD"
                        locale="en-US"
                        className={classNames({
                          "p-invalid": submitted && !product.stock,
                        })}
                      />
                    ) : (
                      <Typography>{priceBodyTemplate(product)}</Typography>
                    )}
                    {submitted && !product.price && (
                      <small className="p-error">Price is required.</small>
                    )}
                  </div>
                  <div className="field col flex direction-column">
                    <label htmlFor="quantity" className="font-bold">
                      Quantity
                    </label>
                    {type === "EDIT" ? (
                      <>
                        <InputNumber
                          id="quantity"
                          value={product.stock}
                          onValueChange={(e) => onInputNumberChange(e, "stock")}
                          className={classNames({
                            "p-invalid": submitted && !product.stock,
                          })}
                        />
                      </>
                    ) : (
                      <Typography>{statusBodyTemplate(product)}</Typography>
                    )}
                    {submitted && !product.stock && (
                      <small className="p-error">Quantity is required.</small>
                    )}
                  </div>
                </div>

                <div className="field ">
                  <label className="mb-3 font-bold">Category</label>
                  {type === "EDIT" ? (
                    <div className="formgrid grid">
                      {productCategoryList.map((item, i) => (
                        <div className="field-radiobutton col-6" key={i}>
                          <RadioButton
                            inputId={`category${i}`}
                            name="category"
                            value={item.value}
                            onChange={onCategoryChange}
                            checked={product.category === item.value}
                            className={classNames({
                              "p-invalid": submitted && !product.stock,
                            })}
                          />
                          <label htmlFor={`category${i}`}>{item.text}</label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Typography>{product.category}</Typography>
                  )}
                  {submitted && !product.category && (
                    <small className="p-error">Category is required.</small>
                  )}
                </div>
                {type !== "EDIT" && (
                  <div className="field">
                    <label className="mb-3 font-bold">Rating</label>
                    <Typography>{ratingBodyTemplate(product)}</Typography>
                  </div>
                )}

                {type === "EDIT" && (
                  <div className="field col ">
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
                )}

                <div className="field flex direction-column">
                  <label htmlFor="description" className="font-bold">
                    Description
                  </label>
                  {type === "EDIT" ? (
                    <InputTextarea
                      id="description"
                      value={product.description}
                      onChange={(e) => onInputChange(e, "description")}
                      required
                      rows={3}
                      cols={20}
                      className={classNames({
                        "p-invalid": submitted && !product.description,
                      })}
                    />
                  ) : (
                    <Typography>{product.description}</Typography>
                  )}
                  {submitted && !product.description && (
                    <small className="p-error">Description is required.</small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};

export default ViewAndEditProductCard;

const footer = (saveProduct, cancelProduc) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={cancelProduc}
      />
    </div>
  );
};
