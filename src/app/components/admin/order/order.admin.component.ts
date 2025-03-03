import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/order";
import { OrderService } from "src/app/services/order.service";
import { OrderResponse } from "src/app/responses/order/order.response";
import { Router } from "@angular/router";

@Component({
    selector:'app-order-admin',
    templateUrl:'./order.admin.component.html',
    styleUrls:['./order.admin.component.scss']
})
export class OrderAdminComponent implements OnInit{
    orders:OrderResponse[]=[];
    currentPage: number =0;
    itemsPerPage:number=12;
    pages:number[]=[];
    totalPages:number = 0;
    keyword:string ="";
    visiblePages:number[]=[];
    constructor(private orderService:OrderService, private router:Router){

    }
    ngOnInit(): void {
        debugger
        this.getAllOrders(this.keyword, this.currentPage, this.itemsPerPage);
      }

    getAllOrders(keyword: string, page: number, limit: number) {
        debugger
        this.orderService.getAllOrders(keyword, page, limit).subscribe({
          next: (response: any) => {
            debugger        
            this.orders = response.orders;
            this.totalPages = response.totalPages;
            this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            console.error('Error fetching products:', error);
          }
        });    
      }
      onPageChange(page: number) {
        debugger;
        this.currentPage = page;
        this.getAllOrders(this.keyword, this.currentPage - 1, this.itemsPerPage);
      }
    
      generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
        const maxVisiblePages = 5;
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);
    
        let startPage = Math.max(currentPage - halfVisiblePages, 1);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    
        if (endPage - startPage + 1 < maxVisiblePages) {
          startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }
    
        return new Array(endPage - startPage + 1).fill(0)
            .map((_, index) => startPage + index);
      }
      deleteOrder(id:number) {
        
      }

      viewDetails(order:OrderResponse) {
        debugger
        this.router.navigate(['/admin/orders', order.id]);
      }

      changeOrderStatus(orderId: number, newStatus: string) {
        if (confirm('Bạn có chắc muốn thay đổi trạng thái đơn hàng này không?')) {
          this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
            next: (response) => {
              alert(response.message);
              this.getAllOrders(this.keyword, this.currentPage, this.itemsPerPage);
            },
            error: (error) => {
              console.error('Lỗi khi cập nhật trạng thái:', error);
              alert(error.message);
            }
          });
        }
      }
      
}