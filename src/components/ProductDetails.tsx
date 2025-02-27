import React, { useEffect, useState } from "react";
import { Product } from "../types/types";
import { getProductById } from "../api/product.api";
import { useParams } from "react-router-dom";
import "./product.css";

const ProductDetails: React.FC = () => {
  const [productDetails, setProductDetails] = useState<Product | undefined>();
  const { id } = useParams();

  useEffect(() => {
    function getProductDetails(){
     getProductById(Number(id))
     .then((data) => {setProductDetails(data)})
     .catch(message=>window.alert(message));
    }
    getProductDetails();
  }, [id]);

  return (
    <div className="product-details-container">
      {/* Main Product Section */}
      {productDetails?.title ? (
        <>
        <div className="product-main">
        <img
          src={productDetails?.thumbnail}
          className="product-details-image"
          alt={productDetails?.title}
        />
        <div className="product-details-info">
          <h2 className="product-details-title">{productDetails?.title}</h2>
          <p className="product-details-description">{productDetails?.description}</p>
          <div className="product-details-price-discount">
            <span className="product-details-price">${productDetails?.price}</span>
            <span className="product-details-discount-percentage">{productDetails?.discountPercentage} % Off</span>
          </div>
          <p className="product-other-info">Status: {productDetails?.availabilityStatus}</p>
          <p className="product-other-info">Category: {productDetails?.category.toUpperCase()}</p>
          <span className="product-details-brand">Brand: {productDetails?.brand}</span>
          <p className="product-details-rating">Minimum Order: {productDetails?.minimumOrderQuantity}</p>
          <p className="product-details-rating">Rating: {productDetails?.rating} ⭐</p>
          <p className="product-details-stock">Stock: {productDetails?.stock}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-container">
        <h3 className="reviews-title">Customer Reviews</h3>
        {productDetails?.reviews && productDetails.reviews.length > 0 ? (
          productDetails.reviews.map((review, index) => (
            <div key={index} className="review-item">
              <p className="review-name">{review.reviewerName}</p>
              <p className="review-rating">Rating: {review.rating} ⭐</p>
              <p className="review-comment">"{review.comment}"</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      </>
      ): (<>No such Product</>)}
    </div>
  );
};

export default ProductDetails;