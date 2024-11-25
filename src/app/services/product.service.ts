import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductDTO } from '../dtos/product/insert.product.dto';

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
    return this.http.get<Product>(`${environment.apiBaseUrl}/products/${id}`);
  }

  getProductsByIds(productIds:number[]):Observable<Product[]>{
    //chuyển danh sách ID thành 1 chuỗi và truyền vào Params
    debugger
    const params= new HttpParams().set('ids',productIds.join(','));
    return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`,{params});
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
}
