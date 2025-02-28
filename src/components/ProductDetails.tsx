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

  const getDiscountedPrice=(actualPrice: number, discountPercentage: number): number=>{
      let discountPrice= (discountPercentage/100)*actualPrice;
      let priceAfterDiscount= (actualPrice-Number(discountPrice)).toFixed(2)
      return Number(priceAfterDiscount);
  }

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
            <span className="product-details-price">Price: ${productDetails?.price}</span>
            <span className="product-details-discount-percentage">Offer-Price: ${getDiscountedPrice(productDetails?.price, productDetails.discountPercentage)} - {productDetails?.discountPercentage} % Off</span>
            {/* <span className="product-details-discount-percentage">{productDetails?.discountPercentage} % Off</span> */}
          </div>
          <span className="product-details-status">Status: {productDetails?.availabilityStatus}</span>
          <span className="product-details-stock">Stock: {productDetails?.stock}</span>
          <span className="product-details-other-info">Category: {productDetails?.category.toUpperCase()}</span>
          <span className="product-details-other-info">Brand: {productDetails?.brand}</span>
          <span className="product-details-other-info">Minimum Order: {productDetails?.minimumOrderQuantity}</span>
          <span className="product-details-other-info">{productDetails?.returnPolicy}</span>
          <span className="product-details-other-info">Rating: {productDetails?.rating} ⭐</span>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-container">
        <h3 className="reviews-title">Customer Reviews</h3>
        {productDetails?.reviews && productDetails.reviews.length > 0 ? (
          productDetails.reviews.map((review, index) => (
            <div key={index} className="review-item">
              <p className="review-date">{`${new Date(review?.date).getFullYear()}-${new Date(review?.date).getMonth() + 1}-${new Date(review?.date).getDate()}`}</p>
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