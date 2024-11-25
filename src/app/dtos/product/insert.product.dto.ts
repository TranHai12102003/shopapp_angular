import { ProductAttributeDTO } from "./insert.product.attribute";

export interface ProductDTO {
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    category_id: number;
    product_attributes: ProductAttributeDTO[];
  }