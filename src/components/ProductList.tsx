import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/product.api";
import { Product, ProductsResponse } from "../types/types";
import { useNavigate } from "react-router-dom";
import "./productlist.css";

const ProductList: React.FC = () => {
  const [productList, setProductList] = useState<ProductsResponse | undefined>();
  const [listPerPage, setListPerPage] = useState(5);
  const [queryFilterList, setQueryFilterList] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts().then((data) => {
      setProductList(data);
      setQueryFilterList(Array.from(new Set(data?.products?.map((product) => product.category))));
    });
  }, []);

  const totalItems = query
    ? productList?.products?.filter((product) => product.category === query).length ?? 0
    : productList?.products?.length ?? 0;

  const totalPages = Math.ceil(totalItems / listPerPage);
  const lastIndex = page * listPerPage;
  const startingIndex = lastIndex - listPerPage;

  useEffect(() => {
    let filteredProducts: Product[] = productList?.products || [];

    if (query) {
      filteredProducts = filteredProducts.filter((product) => product.category === query);
    }

    const paginatedProducts = filteredProducts.slice(startingIndex, lastIndex);
    setFilteredData(paginatedProducts);

    if (page > totalPages) {
      setPage(1);
    }
  }, [page, query, listPerPage, productList?.products]);

  const handleProductItemClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handlePrevClick = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <aside className="product-list">
      <h1>Product List</h1>
      <div>
        Filter By Category:{" "}
        <select onChange={handleSelectChange}>
          <option value="">SELECT</option>
          {queryFilterList.map((value, index) => (
            <option key={index} value={value}>
              {value.toLocaleUpperCase()}
            </option>
          ))}
        </select>
      </div>
      {filteredData.map((product) => (
        <div key={product.id} className="product-item" onClick={() => handleProductItemClick(product.id)}>
          <img src={product.thumbnail} className="product-image" alt={product.title} />
          <div className="product-info">
            <p className="product-title">{product.title}</p>
            <span className="product-price">${product.price}</span>
            <p className="product-other-info">Status: {product.availabilityStatus}</p>
            <p className="product-other-info">Category: {product.category.toUpperCase()}</p>
            <p className="product-other-info">Brand: {product.brand}</p>
            <p className="product-other-info">Minimum Order: {product.minimumOrderQuantity}</p>
            <p className="product-other-info">Rating: {product.rating} ⭐</p>
            <p className="product-other-info">Stock: {product.stock}</p>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginTop: "20px" }}>
        <button onClick={handlePrevClick} disabled={page === 1} style={{ padding: "10px 16px", fontSize: "16px" }}>
          Previous Page
        </button>
        <button onClick={handleNextClick} disabled={page === totalPages} style={{ padding: "10px 16px", fontSize: "16px" }}>
          Next Page
        </button>
      </div>
    </aside>
  );
};

export default ProductList;