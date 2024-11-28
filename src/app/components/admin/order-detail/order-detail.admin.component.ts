import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { OrderDetail } from 'src/app/models/order.detail';
import { Product } from 'src/app/models/product';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-detail-admin',
  templateUrl: './order-detail.admin.component.html',
  styleUrls: ['./order-detail.admin.component.scss']
})
export class OrderDetailComponent implements OnInit{
  orderId:number=0;
  orderResponse:OrderResponse={
    id: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: [] // Một mảng rỗng
  };

  constructor(private orderService:OrderService,private activatedRoute: ActivatedRoute,){}

  ngOnInit(): void {
    this.getOrderDetails();
  }
  getOrderDetails(): void {
    debugger
    this.orderId = Number(this.activatedRoute.snapshot.paramMap.get('id')); // Thay bằng ID của đơn hàng bạn muốn lấy.
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response: any) => {        
        debugger;    
        console.log(response);   
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address; 
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0], 
          response.order_date[1] - 1, 
          response.order_date[2]
        );        
        
        this.orderResponse.order_details = response.order_details
          .map((order_detail: OrderDetail) => {
            // console.log(order_detail.numberOfProduct);
            order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
            return order_detail;
        });        
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0], 
          response.shipping_date[1] - 1, 
          response.shipping_date[2]
        );
        
        this.orderResponse.shipping_method = response.shipping_method;
        
        this.orderResponse.status = response.status;
        this.orderResponse.total_money = response.total_money;
      },
      complete: () => {
        debugger;        
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });
  }
  

  //Hàm xử lý việc áp dụng mã giảm giá
  applyCoupon():void{
    //Cập nhật giá trị totalAmount dựa trên mã giảm giá nếu áp dụng
  }
}
