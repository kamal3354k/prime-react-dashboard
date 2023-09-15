import React, { useState, useEffect } from "react";
import { sortOptions } from "./constant";
import { DataView } from "primereact/dataview";
import { ProgressSpinner } from 'primereact/progressspinner';
import {
  ratingBodyTemplate,
  statusBodyTemplate,
} from "../../components/molecules/dataTable/utlis/customTemplate";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { setCurrentProduct } from "../../redux/slice/productSlice";

export default function AllProducts() {
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(()=>{
   if(products.length){
    setLoading(false)
   }
  },[products])

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        setSortOrder(-1);
        setSortField(value.substring(1, value.length));
        setSortKey(value);
    } else {
        setSortOrder(1);
        setSortField(value);
        setSortKey(value);
    }
};


const header = () => {
  return (
    <Dropdown
      options={sortOptions}
      value={sortKey}
      optionLabel="label"
      placeholder="Sort By Price"
      onChange={onSortChange}
      className="w-full sm:w-14rem"
    />
  );
};

const viewPageHandle=(product)=>{
  dispatch(setCurrentProduct(product))
  navigate("/view-product")
  
}


  const itemTemplate = (product) => {
    return (
      <div className="col-12 cursor-pointer" onClick={()=>viewPageHandle(product)}>
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={product.thumbnail}
            alt={product.title}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.title}</div>
              {ratingBodyTemplate(product)}
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.category}</span>
                </span>
                {statusBodyTemplate(product)}
              </div>
              <span className="font-semibold">{product.description}</span>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${product.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      {loading ? (
        <div className="card flex justify-content-center">
        <ProgressSpinner />
    </div> // Your loading spinner or message
      ) : (
        <DataView
          header={header()}
          value={products}
          itemTemplate={itemTemplate}
          paginator
          sortField={sortField} // Set your sortField and sortOrder as needed
          sortOrder={sortOrder}
          rows={10}
        />
      )}
    </div>
  );
}
