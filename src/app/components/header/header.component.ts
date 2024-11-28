// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { UserResponse } from 'src/app/responses/user/user.response';
import { CategoryService } from 'src/app/services/category.service';
import { SharedService } from 'src/app/services/shared.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories: Category[] = [];
  subDellCategories: Category[] = [];
  subAsusCategories: Category[] = [];
  subLenovoCategories:Category[]=[];
  subHpCategories:Category[]=[];
  subAcerCategories:Category[]=[];
  selectedCategoryId: number = 0;
  selectedCategoryName: string = 'Danh mục';
  keyword: string = '';
  parentId:number=0;
  isExpanded: boolean = false;
  products:Product[]=[];

  userResponse?:UserResponse | null
  isPopoverOpen = false;

  totalQuantity: number = 0; 

  constructor(
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private userService:UserService,
    private tokenService:TokenService,
    private popoverConfig: NgbPopoverConfig, 
    private cartService:CartService, 
    private router: Router,
    private productService:ProductService) { }

  ngOnInit() {
    // this.getCategories(1, 100);
    this.getCategories();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.totalQuantity = this.cartService.getTotalQuantity();
    this.getSubDellCategories(1);
    this.getSubAsusCategories(4);
    this.getSubLenovoCategories(6);
    this.getSubHpCategories(17);
    this.getSubAcerCategories(77)
    this.getProductLatest();
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index:number){
    if(index === 0){
      this.router.navigate(['/user-profile']);
    }
    else if(index === 2){
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item 
  }

  onCategoryChange() {
    const selectedCategory = this.categories.find(category => category.id === +this.selectedCategoryId);
    this.selectedCategoryName = selectedCategory ? selectedCategory.name : 'Tất cả';
    this.sharedService.updateSelectedCategoryId(this.selectedCategoryId);
  }

 getProductLatest() {
  this.productService.getProductLatest().subscribe({
    next: (products: Product[]) => {
      console.log("Dữ liệu API trả về:", products);
      products.forEach((product:Product)=>{
        product.url=`${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
      });
      this.products=products;
    },
    error: (err: any) => {
      console.error("Lỗi lấy sản phẩm mới nhất:", err.message || err);
    },
  });
}


  // getCategories(page: number, limit: number) {
  //   this.categoryService.getCategories(page, limit).subscribe({
  //     next: (categories: Category[]) => {
  //       this.categories = categories;
  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching categories: ', error);
  //     }
  //   });
  // }
  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error fetching categories: ', error);
      }
    });
  }

  getSubDellCategories(parentId:number) {
    this.categoryService.getSubCategories(parentId).subscribe({
      next: (subcategories: Category[]) => {
        debugger
        this.subDellCategories = subcategories;
        console.log(this.subDellCategories);
      },
      error: (error: any) => {
        console.error('Error fetching categories: ', error);
      }
    });
  }
  getSubAsusCategories(parentId:number) {
    this.categoryService.getSubCategories(parentId).subscribe({
      next: (subcategories: Category[]) => {
        debugger
        this.subAsusCategories = subcategories;
        console.log(this.subAsusCategories);
      },
      error: (error: any) => {
        console.error('Error fetching categories: ', error);
      }
    });
  }
  getSubAcerCategories(parentId:number) {
    this.categoryService.getSubCategories(parentId).subscribe({
      next: (subcategories: Category[]) => {
        debugger
        this.subAcerCategories = subcategories;
        console.log(this.subAcerCategories);
      },
      error: (error: any) => {
        console.error('Error fetching categories: ', error);
      }
    });
  }
  getSubLenovoCategories(parentId:number) {
    this.categoryService.getSubCategories(parentId).subscribe({
      next: (subcategories: Category[]) => {
        debugger
        this.subLenovoCategories = subcategories;
        console.log(this.subLenovoCategories);
      },
      error: (error: any) => {
        console.error('Error fetching categories: ', error);
      }
    });
  }
  getSubHpCategories(parentId:number) {
    this.categoryService.getSubCategories(parentId).subscribe({
      next: (subcategories: Category[]) => {
        debugger
        this.subHpCategories = subcategories;
        console.log(this.subHpCategories);
      },
      error: (error: any) => {
        console.error('Error fetching categories: ', error);
      }
    });
  }

    // Hàm gọi khi hover vào danh mục cha
    onCategoryHover(parentId: number) {
      this.getSubDellCategories(parentId);  // Gọi danh mục con theo parentId
    }

  selectCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.selectedCategoryName = categoryId === 0 ? 'Tất cả' : this.categories.find(c => c.id === categoryId)?.name || '';
    this.onCategoryChange();
    this.router.navigate(['/']);
  }

  //Search
  onSearch() {
    this.sharedService.updateKeyword(this.keyword);
  }

  expandSearch() {
    this.isExpanded = true;
  }

  collapseSearch() {
    this.isExpanded = false;
  }

  //hàm xử lý sự kiện khi người dùng bấm vào sản phẩm
  onProductClick(productId:number){
    debugger
    //điều hướng đến trang product-detail với productId là tham số
    this.router.navigate(['/products',productId]);
  }

}
