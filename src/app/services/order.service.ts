import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OrderDTO } from '../dtos/order/order.dto';
import { OrderResponse } from '../responses/order/order.response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/orders`;
  private apiGetAllOrders = `${environment.apiBaseUrl}/orders/get-orders-by-keyword`;

  constructor(private http: HttpClient) {}

  placeOrder(orderData: OrderDTO): Observable<any> {    
    // Gửi yêu cầu đặt hàng
    return this.http.post(this.apiUrl, orderData);
  }

  getOrderById(orderId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/orders/${orderId}`;
    return this.http.get(url);
  }

  getAllOrders(keyword:string,page:number,limit:number):Observable<OrderResponse[]>{
    const params= new HttpParams()
    .set('keyword',keyword)
    .set('page',page.toString())
    .set('limit',limit.toString());
    return this.http.get<any>(this.apiGetAllOrders,{params});
  }

  updateOrderStatus(OrderId:number, status:string):Observable<any>{
    return this.http.put(`${this.apiUrl}/${OrderId}/status`,{status});
  }
}
