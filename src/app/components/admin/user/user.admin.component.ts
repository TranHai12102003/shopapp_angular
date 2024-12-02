import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { UserResponse } from "src/app/responses/user/user.response";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-user-admin',
    templateUrl:'./user.admin.component.html',
    styleUrls:['./user.admin.component.scss']
})
export class UserAdminComponent implements OnInit{
    users:UserResponse[]=[];
    currentPage: number = 0;
    itemsPerPage: number = 12;
    pages: number[] = [];
    totalPages:number = 0;
    visiblePages: number[] = [];
    keyword:string = "";

    //dùng để style hộp alert
    toastTitle: string = '';
    toastMessage: string = '';
    showToast: boolean = false;

    constructor(private userService:UserService){}
    ngOnInit(): void {
        this.getAllUsers(this.keyword,this.currentPage,this.itemsPerPage);
    }

    //dùng để style hộp alert
    showCustomToast(title: string, message: string) {
      this.toastTitle = title;
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => this.closeToast(), 5000); // Tự động đóng sau 5 giây
    }
    closeToast() {
      this.showToast = false;
    }

    getAllUsers(keyword:string,page:number,limit:number){
        debugger;
    this.userService.getAllUsers(keyword,page, limit).subscribe({
      next: (response: any) => {
        debugger;
        this.users = response.users;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(
          this.currentPage,
          this.totalPages
        );
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Không có danh mục', error);
      },
    });
    }
    //phân trang
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1)
      .fill(0)
      .map((_, index) => startPage + index);
  }

  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getAllUsers(this.keyword,this.currentPage - 1, this.itemsPerPage);
  }
  
  toggleUserStatus(userId: number, isActive: boolean) {
    const confirmation = window.confirm(
      isActive
        ? 'Bạn có chắc chắc khóa tài khoản này không?'
        : 'Bạn có chắc chắc kích hoạt tài khoản này không?'
    );

    if (confirmation) {
      this.userService.toggleUserStatus(userId, !isActive).subscribe({
        next: (response: any) => {
          console.log("Response:",response);
          // alert(response.message); // response.message có nghĩa là trỏ tới phần tử message trong json trả về
          this.showCustomToast('Thành công', response.message);
          // location.reload();
          this.getAllUsers(this.keyword,this.currentPage,this.itemsPerPage);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error.message || 'Failed to update user status.');
          // alert('Cập nhật trạng thái hoạt động thất bại');
          this.showCustomToast('Lỗi', 'Cập nhật trạng thái hoạt động thất bại');
        },
      });
    }
  }
  
}