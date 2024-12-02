import { Attribute } from "src/app/models/attribute";
import { ProductAttribute } from "src/app/models/product.attribute";
import { ProductImage } from "src/app/models/product.image";

export interface ProductResponse {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    productImages: ProductImage[];
    categoryId: number;
    productAttributes: ProductAttribute[];
    attributes: Attribute[];
    createdAt: string;
    updatedAt: string;
  }