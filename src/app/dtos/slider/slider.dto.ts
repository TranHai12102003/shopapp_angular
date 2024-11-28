export interface SliderDTO {
    title: string;
    image_url?: string;
    link_type: 'category' | 'product' | 'all_products';
    category_id: number | null;
    product_id: number | null;
  }
  