import { Attribute } from "./attribute";
import { ProductAttribute } from "./product.attribute";
import { ProductImage } from "./product.image";

export interface Product{
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    category_id: number;
    url: string; 
    product_images: ProductImage[];
    product_attributes:ProductAttribute[];   
    attributes: Attribute[];
    showFullDescription: boolean;
}