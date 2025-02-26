import React, { useEffect, useState } from "react";
import { Product } from "../types/types";
import { getProductById } from "../api/product.api";
import { useParams } from "react-router-dom";
import "./product.css"; // Import CSS file

const ProductDetails: React.FC = () => {
  const [productDetails, setProductDetails] = useState<Product>();
  const { id } = useParams();

  useEffect(() => {
    getProductById(Number(id)).then((data) => {
      setProductDetails(data);
    });
  }, [id]);

  return (
    <div className="product-details-container">
        <img
        src={productDetails?.images[0]}
        className="product-details-image"
        alt={productDetails?.title}
      />
      <div className="product-details-info">
        <p className="product-details-title">
          {productDetails?.title}
        </p>
        <p className="product-details-description">{productDetails?.description}</p>
        <span className="product-details-price">${productDetails?.price}</span>
        <span className="product-details-brand">{productDetails?.brand}</span>
        <p className="product-details-rating">Category: {productDetails?.category.toLocaleUpperCase()}</p>
        <p className="product-details-rating">Rating: {productDetails?.rating}</p>
        <p className="product-details-stock">Stock: {productDetails?.stock}</p>
      </div>
    </div>
  );
};

export default ProductDetails;