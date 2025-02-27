export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    minimumOrderQuantity:number;
    availabilityStatus: string;
    reviews: Review[];
    category: string;
    thumbnail: string;
    shippingInformation: string;
    warrantyInformation: string;
    sku: string;
    returnPolicy: string;
    weight: number;
    dimensions: Dimension;
    images: string[];
}

export interface ProductsResponse {
    limit: number;
    products: Product[];
    skip: number;
    total: number;
}

export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Dimension{
    height: number;
    width: number;
    depth: number;
}

