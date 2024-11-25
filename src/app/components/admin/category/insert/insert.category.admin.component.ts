import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { InsertCategoryDTO } from "src/app/dtos/category/insert.category.dto";
import { UpdateCategoryDTO } from "src/app/dtos/category/update.category.dto";
import { Category } from "src/app/models/category";
import { ApiResponse } from "src/app/responses/apiResponse";
import { CategoryService } from "src/app/services/category.service";

@Component({
    selector:'app-insert-category',
    templateUrl:'./insert.category.admin.component.html',
    styleUrls:['./insert.category.admin.component.scss'],

})

export class InsertCategoryAdminComponent implements OnInit{
    categories: Category[]=[];
    categoryId:number =0;
    insertCategoryDTO:InsertCategoryDTO={
        name:'',
        parent_id:null
    }
    constructor(private categoryService:CategoryService,
                private router:Router,
            private activatedRoute:ActivatedRoute){}
    ngOnInit(): void {
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
    insertCategory(){
        this.categoryService.insertCategory(this.insertCategoryDTO).subscribe({
            next:(respone)=>{
                debugger
                alert('Thêm danh mục thành công');
                this.router.navigate(['/admin']);
            },
            error:(error)=>{
                alert(error.error);
                console.error('Lỗi thêm danh mục:',error);
            }
        });
    }
      
}