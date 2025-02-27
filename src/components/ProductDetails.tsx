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
          <span className="product-details-other-info">Status: {productDetails?.availabilityStatus}</span>
          <span className="product-details-other-info">Category: {productDetails?.category.toUpperCase()}</span>
          <span className="product-details-other-info">Brand: {productDetails?.brand}</span>
          <span className="product-details-other-info">Minimum Order: {productDetails?.minimumOrderQuantity}</span>
          <span className="product-details-other-info">{productDetails?.returnPolicy}</span>
          <span className="product-details-other-info">Rating: {productDetails?.rating} ⭐</span>
          <span className="product-details-other-info">Stock: {productDetails?.stock}</span>
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