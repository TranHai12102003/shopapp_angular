import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ProductDTO } from "src/app/dtos/product/insert.product.dto";
import { Attribute } from "src/app/models/attribute";
import { Category } from "src/app/models/category";
import { Product } from "src/app/models/product";
import { AttributeService } from "src/app/services/attribute.service";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";

@Component({
    selector:'app-add-product',
    templateUrl:'./insert.product.admin.component.html',
    styleUrls:['./insert.product.admin.component.scss'],
})
export class InsertProductComponent implements OnInit{
  productForm!: FormGroup;
  categories: Category[] = [];
  attributes: Attribute[] = []; // Lấy danh sách thuộc tính từ backend
  public Editor = ClassicEditor;
  insertProductDTO:ProductDTO={
    name: "",
    price: 0,
    thumbnail: "",
    description: "",
    category_id: 0,
    product_attributes: []
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private attributeService: AttributeService,
    private router :Router
  ) {}

  ngOnInit(): void {
    

    // Lấy danh sách danh mục
    this.getAllCategoires();

    // Lấy danh sách thuộc tính
    this.getAllAtrributes();
  }

  getAllCategoires(){
        debugger
        this.categoryService.getAllcategoriesNoPage().subscribe({
            next: (categories:any) => {
              debugger        
              console.log('Danh mục:',categories);
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
  getAllAtrributes(){
        debugger
        this.attributeService.getAttributes().subscribe({
            next: (attributes:any) => {
              console.log("Thuộc tính:",attributes)
              debugger        
              this.attributes = attributes;
              // Khởi tạo productAttributeDTOS dựa trên danh sách thuộc tính
            this.attributes.forEach((attribute) => {
              this.insertProductDTO.product_attributes.push({
                attribute_id: attribute.id,
                value: ''
              });
            });
            },
            complete: () => {
              debugger;
            },
            error: (error: any) => {
              debugger;
              console.error('Không có thuộc tính sản phẩm', error);
            }
          });   
    }
    insertProduct(){
      console.log('Dữ liệu gửi lên:', this.insertProductDTO);
      this.productService.addProduct(this.insertProductDTO).subscribe({
          next:(respone)=>{
              debugger
              console.log(respone);
              alert('Thêm sản phẩm thành công');
              this.router.navigate(['/admin']);
          },
          error:(error)=>{
            debugger
              alert(error.error);
              console.error('Lỗi thêm sản phẩm:',error);
          }
      });
  }
  

  // initAttributes() {
  //   const attributeArray = this.productForm.get(
  //     'productAttributeDTOS'
  //   ) as FormArray;

  //   this.attributes.forEach((attribute) => {
  //     attributeArray.push(
  //       this.fb.group({
  //         attributeId: [attribute.id, Validators.required],
  //         value: ['', Validators.required],
  //       })
  //     );
  //   });
  // }

  // onSubmit() {
  //   if (this.productForm.invalid) {
  //     return;
  //   }

  //   const productDTO = this.productForm.value;
  //   this.productService.addProduct(productDTO).subscribe({
  //     next: (response) => {
  //       console.log('Sản phẩm đã được thêm:', response);
  //     },
  //     error: (error) => {
  //       console.error('Lỗi khi thêm sản phẩm:', error);
  //     },
  //   });
  // }
    
}