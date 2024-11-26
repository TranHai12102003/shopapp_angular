import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Slider } from '../models/slider';
import { Product } from '../models/product';
@Injectable({
    providedIn: 'root'
  })
export class SliderService{
    private apiGetSliders = `${environment.apiBaseUrl}/sliders`;
    private apiGetProductsByCategory = `${environment.apiBaseUrl}/categories`; // API lấy sản phẩm theo danh mục
    private apiGetProductDetails = `${environment.apiBaseUrl}/products`; // API lấy chi tiết sản phẩm
    private apiGetAllProducts = `${environment.apiBaseUrl}/products`; // API lấy chi tiết sản phẩm

    constructor(private http: HttpClient) { }

    getSliders(page: number, limit: number):Observable<Slider[]> {
        const params = new HttpParams()
          .set('page', page.toString())
          .set('limit', limit.toString());     
          return this.http.get<Slider[]>(this.apiGetSliders, { params });           
      }

      deleteSlider(sliderId:number){
        return this.http.delete(`${this.apiGetSliders}/${sliderId}`)
      }

    // Phương thức xử lý hành động khi click vào slider
  handleSliderAction(slider: Slider): Observable<any> {
    if (slider.linkType === 'category' && slider.categoryId) {
      // Trả về danh sách sản phẩm thuộc danh mục
      return this.http.get<Product[]>(`${this.apiGetProductDetails}/category/${slider.categoryId}`);
    } else if (slider.linkType === 'product' && slider.productId) {
      // Trả về chi tiết sản phẩm
      return this.http.get<Product>(`${this.apiGetProductDetails}/${slider.productId}`);
    } else if(slider.linkType === 'all_products' && slider.categoryId === null && slider.productId === null) {
      return this.http.get<Product>(`${this.apiGetAllProducts}`);
    }else{
      throw new Error('Invalid slider action');
    }
  }
}