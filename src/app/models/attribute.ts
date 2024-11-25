import { ProductAttribute } from "./product.attribute";

export interface Attribute{
    id: number;
    name: string;
    product_attributes:ProductAttribute[] | null;
}