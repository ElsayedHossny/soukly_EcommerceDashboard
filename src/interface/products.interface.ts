import { IBrand } from "./brands.interface";
import { ICatrgory } from "./categories.interface";
import { IPagenation } from "./pagenation.interface";
import { ISubcategory } from "./subcategory.interface";

export interface IProducts {
  results: number;
  metadata: IPagenation;
  data: IProduct[];
}

export interface IProduct {
  sold: number;
  images: string[];
  subcategory: ISubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICatrgory;
  brand: IBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: string[];
  reviews?: IReview[]; // ⬅️ جديد
}

// Dummy Api

export interface IProductDummy {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: IDimensionsDummy;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IReviewDummy[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IMetaDummy;
  images: string[];
  thumbnail: string;
}

export interface IDimensionsDummy {
  width: number;
  height: number;
  depth: number;
}

export interface IReviewDummy {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface IMetaDummy {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface IReviewUser {
  _id: string;
  name: string;
}

export interface IReview {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: IReviewUser;
  createdAt: string;
  updatedAt: string;
}

export interface ISingleProductResponse {
  data: IProduct;
}
