import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { ApiResponse } from 'src/app/responses/apiResponse';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category.admin.component.html',
  styleUrls: ['./category.admin.component.scss'],
})
export class CategoryAdminComponent implements OnInit {
  categories: Category[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  keyword: string = '';
  visiblePages: number[] = [];
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getAllCategoires(this.currentPage, this.itemsPerPage);
  }
  //trả về danh sách các danh mục
  getAllCategoires(page: number, limit: number) {
    debugger;
    this.categoryService.getAllcategories(page, limit).subscribe({
      next: (response: any) => {
        debugger;
        this.categories = response.categories;
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

  //Xóa danh mục
  deleteCategoryId(category: Category) {
    const confirmation = window.confirm('Bạn chắc chắn xóa danh mục này?');
    if (confirmation) {
      debugger;
      this.categoryService.deleteCategoryId(category.id).subscribe({
        next: (respone) => {
          debugger;
          console.log('Xóa thành công');
          alert('Xóa thành công');
          // location.reload();
          this.getAllCategoires(this.currentPage,this.itemsPerPage)
        },
        complete: () => {
          debugger;
        },
        error: (error: HttpErrorResponse) => {
          debugger;
          console.error(error?.error?.message ?? '');
        },
      });
    }
  }

  getParentCategoryName(parentId: number | null): string {
    if (!parentId) return 'Không có';
    const parentCategory = this.categories.find((cat) => cat.id === parentId);
    return parentCategory ? parentCategory.name : 'Không xác định';
  }

  insertCategory() {
    debugger;
    this.router.navigate(['/admin/category/insert']);
  }

  updateCategoryId(categoryId: number) {
    debugger;
    this.router.navigate(['/admin/category/update/', categoryId]);
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
    this.getAllCategoires(this.currentPage - 1, this.itemsPerPage);
  }
}
