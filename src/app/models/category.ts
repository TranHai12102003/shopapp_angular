export interface Category{
    id: number;
    name: string;
    parent_id:number | null;
    subCategories?:Category[];
}