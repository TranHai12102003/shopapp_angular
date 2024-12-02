import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product.admin.component.html',
  styleUrls: ['./product.admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  visiblePages: number[] = [];
  keyword: string = '';
  selectedCategoryId: number = 0;
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private sharedService: SharedService,
    private router: Router,
    private categoryService:CategoryService
  ) {}

  ngOnInit() {
    this.loadCategories();
    // Lắng nghe thay đổi từ selectedCategoryId và keyword
    this.sharedService.selectedCategoryId$.subscribe((categoryId: number) => {
      this.selectedCategoryId = categoryId;
      this.searchProducts();
    });

    this.sharedService.keyword$.subscribe((keyword: string) => {
      this.keyword = keyword;
      this.searchProducts();
    });

    this.getProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
  }

  searchProducts() {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    this.getProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage,
      this.itemsPerPage
    );
  }

  getProducts(
    keyword: string,
    selectedCategoryId: number,
    page: number,
    limit: number
  ) {
    this.productService
      .getProducts(keyword, selectedCategoryId, page, limit)
      .subscribe({
        next: (response: any) => {
          debugger;
          response.products.forEach((product: Product) => {
            product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          });
          this.products = response.products;
          this.totalPages = response.totalPages;
          this.visiblePages = this.generateVisiblePageArray(
            this.currentPage,
            this.totalPages
          );
        },
        error: (error: any) => {
          console.error('Error fetching products: ', error);
        },
      });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error("Không thể tải danh mục:", error);
      }
    );
  }

  getCategoryName(categoryId: number | null): string {
    if (!categoryId) return 'Không xác định';
  
    const category = this.categories.find((cat) => cat.id === categoryId);
  
    return category ? category.name : 'Không xác định';
  }
  
  //Xóa sản phẩm
  deleteProductId(product: Product) {
    const confirmation = window.confirm('Bạn chắc chắn xóa sản phẩm này?');
    if (confirmation) {
      debugger;
      this.productService.deleteProduct(product.id).subscribe({
        next: (respone) => {
          debugger;
          console.log(respone);
          alert("Xóa thành công");
          // location.reload();
          this.getProducts(this.keyword,
            this.selectedCategoryId,
            this.currentPage,
            this.itemsPerPage)
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(
      this.keyword,
      this.selectedCategoryId,
      this.currentPage - 1,
      this.itemsPerPage
    );
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }

  toggleDescription(product: Product, event: Event) {
    event.preventDefault();
    product.showFullDescription = !product.showFullDescription;
  }

  //hàm xử lý sự kiện khi người dùng bấm vào sản phẩm
  onProductClick(productId: number) {
    debugger;
    //điều hướng đến trang product-detail với productId là tham số
    this.router.navigate(['/products', productId]);
  }

  onProductBuyNow() {
    debugger;
    //điều hướng đến trang đặt hàng khi bấm mua ngay
    this.router.navigate(['/orders']);
  }

  insertProduct(){
    debugger
    this.router.navigate(['/admin/product/insert']);
}
  updateProduct(productId:number){
    debugger
    this.router.navigate(['/admin/product/update',productId]);
}
insertProductImg(productId:number){
  debugger
  this.router.navigate(['/admin/product/insert-product-img',productId]);
}
}
