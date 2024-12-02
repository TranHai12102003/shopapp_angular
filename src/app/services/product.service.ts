import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductDTO } from '../dtos/product/insert.product.dto';
import { ProductImage } from '../models/product.image';
import { ProductUpdateDTO } from '../dtos/product/update.product.attribute';
import { ProductResponse } from '../responses/product/product.response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiGetProducts = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts(
            keyword:string, categoryId:number, 
              page: number, limit: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('category_id', categoryId)
      .set('page', page.toString())
      .set('limit', limit.toString());            
    return this.http.get<Product[]>(this.apiGetProducts, { params });
  }

  getDetailProduct(productId: number) {
    return this.http.get(`${environment.apiBaseUrl}/products/${productId}`);
  }

  getProductById(id: number) {
    return this.http.get<ProductUpdateDTO>(`${environment.apiBaseUrl}/products/${id}`);
  }

  //Mới ngày 29-11-2024
  getProductId(productId:number):Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${environment.apiBaseUrl}/products/${productId}`);
  }

  //Lấy các sản phẩm theo chuỗi id
  getProductsByIds(productIds:number[]):Observable<Product[]>{
    //chuyển danh sách ID thành 1 chuỗi và truyền vào Params
    debugger
    const params= new HttpParams().set('ids',productIds.join(','));
    return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`,{params});
  }

  //lấy sản phẩm mới nhất
  getProductLatest():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiGetProducts}/latest`);
  }

  getCategoryId(categoryId:number){
    return this.http.get(`${environment.apiBaseUrl}/categories/${categoryId}`);
  }

  addProduct(product:ProductDTO):Observable<any>{
    return this.http.post<any>(`${this.apiGetProducts}`,product);
  }
  deleteProduct(productId:number){
    return this.http.delete(`${this.apiGetProducts}/${productId}`)
  }
  updateProduct(productId:number,productUpdateDTO:ProductDTO):Observable<any>{
    return this.http.put<any>(`${this.apiGetProducts}/${productId}`,productUpdateDTO)

  }
  insertProductImg(productId: number, formData: FormData): Observable<ProductImage[]> {
    return this.http.post<ProductImage[]>(`${this.apiGetProducts}/uploads/${productId}`,formData);
  }


  // uploadImages(productId: number, files: File[]): Observable<any> {
  //   const formData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     formData.append('files', files[i]);
  //   }
  //   // Upload images for the specified product id
  //   return this.http.post(`${this.apiGetProducts}/products/uploads/${productId}`, formData);
  // }
  // deleteProductImage(id: number): Observable<any> {
  //   debugger
  //   return this.http.delete<string>(`${this.apiGetProducts}/product_images/${id}`);
  // }
}
