import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Category } from '../models/category';
import { ApiResponse } from '../responses/apiResponse';
import { UpdateCategoryDTO } from '../dtos/category/update.category.dto';
import { InsertCategoryDTO } from '../dtos/category/insert.category.dto';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiGetAllCategories = `${environment.apiBaseUrl}/categories`;
  private apiGetCategoriesParent = `${environment.apiBaseUrl}/categories/parents`;
  private apiGetSubCategories = `${environment.apiBaseUrl}/categories`;
  private apiCategories=`${environment.apiBaseUrl}`;
  constructor(private http: HttpClient) {}
  // getCategories(page: number, limit: number):Observable<Category[]> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('limit', limit.toString());
  //     return this.http.get<Category[]>(this.apiGetCategories, { params });
  // }
  getCategories(): Observable<Category[]> {
    //không phân trang
    return this.http.get<Category[]>(this.apiGetCategoriesParent);
  }

  getAllcategoriesNoPage() {
    //không phân trang
    return this.http.get<Category[]>(`${this.apiGetAllCategories}/all-no-page`);
  }

  getAllcategories(page: number, limit: number) {
    //có phân trang
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<Category[]>(this.apiGetAllCategories, { params });
  }

  // Gọi danh sách danh mục cha
  // getParentCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(this.apiGetParentCategories);
  // }
  // Phương thức lấy danh sách danh mục con theo parentId
  getSubCategories(parentId: number): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.apiGetSubCategories}/${parentId}/subcategories`
    );
  }

  // getCategoryId(categoryId:number):Observable<ApiResponse>{
  //   return this.http.get<ApiResponse>(`${this.apiCategories}/categories/${categoryId}`);
  getCategoryId(categoryId:number){
    return this.http.get(`${this.apiCategories}/categories/${categoryId}`);
  }
  insertCategory(insertCategoryDTO:InsertCategoryDTO){
    return this.http.post(`${this.apiCategories}/categories`,insertCategoryDTO);
  }
  // deleteCategoryId(categoryId:number):Observable<ApiResponse>{
  //     return this.http.delete<ApiResponse>(`${this.apiCategories}/categories/${categoryId}`);
  // }
  deleteCategoryId(categoryId:number){
      return this.http.delete(`${this.apiCategories}/categories/${categoryId}`);
  }
  updateCategoryId(categoryId:number,updatedCategory:UpdateCategoryDTO):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.apiCategories}/categories/${categoryId}`,updatedCategory)
  }
}
