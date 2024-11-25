import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdateCategoryDTO } from "src/app/dtos/category/update.category.dto";
import { Category } from "src/app/models/category";
import { ApiResponse } from "src/app/responses/apiResponse";
import { CategoryService } from "src/app/services/category.service";

@Component({
    selector:'app-update-category',
    templateUrl:'./update.category.admin.component.html',
    styleUrls:['./update.category.admin.component.scss'],

})

export class UpdateCategoryAdminComponent implements OnInit{
    categories: Category[]=[];
    categoryId:number =0;
    updatedCategory: Category ={} as Category;
    constructor(private categoryService:CategoryService,
                private router:Router,
            private activatedRoute:ActivatedRoute){}
    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params=>{
            debugger
            this.categoryId=Number(params.get('id'));
            console.log('Category ID:', this.categoryId); 
            this.getCategoryById(this.categoryId);
        })
        this.getAllCategoires();
    }
    getAllCategoires(){
        debugger
        this.categoryService.getAllcategoriesNoPage().subscribe({
            next: (categories:any) => {
              debugger        
              this.categories = categories;
            },
            complete: () => {
              debugger;
            },
            error: (error: any) => {
              debugger;
              console.error('Không có danh mục', error);
            }
          });   
    }

    getCategoryById(id: number): void {
        this.categoryService.getCategoryId(id).subscribe({
          next: (response: any) => {
            console.log('API Response:',response);
            // Kiểm tra xem có dữ liệu trong response.data không
            if (response) {
              this.updatedCategory = response;  // Gán dữ liệu vào updatedCategory
            } else {
              console.error('Không có dữ liệu danh mục');
              alert('Không tìm thấy danh mục với ID này')
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error(error?.error?.message ?? '');
          }
        });
      }
      

    updateCategory():void{
        const updateCategoryDTO:UpdateCategoryDTO={
            name:this.updatedCategory.name,
            parent_id:this.updatedCategory.parent_id,
        }
        this.categoryService.updateCategoryId(this.updatedCategory.id, updateCategoryDTO).subscribe({
            next:(response:any)=>{
                debugger
            },
            complete:()=>{
                debugger
                alert("Cập nhật danh mục thành công");
                this.router.navigate(["/admin"]);
            },
            error:(error: HttpErrorResponse)=>{
                debugger
                console.error(error?.error?.message ?? '');
            }
        });
    }
}