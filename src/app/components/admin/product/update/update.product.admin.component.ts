import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ProductDTO } from "src/app/dtos/product/insert.product.dto";
import { ProductUpdateDTO } from "src/app/dtos/product/update.product.attribute";
import { Attribute } from "src/app/models/attribute";
import { Category } from "src/app/models/category";
import { Product } from "src/app/models/product";
import { AttributeService } from "src/app/services/attribute.service";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";

@Component({
    selector:'app-update-product',
    templateUrl:'./update.product.admin.component.html',
    styleUrls:['./update.product.admin.component.scss'],
})
export class UpdateProductComponent implements OnInit{
  productForm!: FormGroup;
  categories: Category[] = [];
  attributes: Attribute[] = []; // Lấy danh sách thuộc tính từ backend
  productId!:number;
  updatedProduct:Product = {} as Product
  public Editor = ClassicEditor;
  updateProductDTO:ProductDTO={
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
    private router :Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
        // Lấy ID sản phẩm từ URL
        this.productId = Number(this.route.snapshot.paramMap.get("id"));

        // Lấy thông tin sản phẩm hiện tại
        this.getProductById(this.productId);

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
            this.updateProductDTO.product_attributes.push({
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
  // getProductById(id:number){
  //   this.productService.getProductById(id).subscribe({
  //       next:(product:Product)=>{
  //           console.log("Thông tin sản sản phẩm:",product);
  //           this.updateProductDTO={
  //               name:product.name,
  //               price:product.price,
  //               thumbnail:product.thumbnail,
  //               description:product.description,
  //               category_id:product.category_id,
  //               product_attributes:product.product_attributes.map((pa)=>({
  //                   attribute_id:pa.attribute_id,
  //                   value:pa.value,
  //               })),
  //           };
  //           console.log("Danh sách product_attributes sau khi load:", this.updateProductDTO.product_attributes);
  //       },
  //       error:(errror:any)=>{
  //           console.error("Lỗi khi lấy sản phẩm",errror)
  //       },
  //   });
  // }

  // getProductById(id: number) {
  //   this.productService.getProductById(id).subscribe({
  //     next: (product: Product) => {
  //       console.log("Thông tin sản phẩm:", product);
  
  //       // Gán thông tin sản phẩm vào DTO
  //       this.updateProductDTO = {
  //         name: product.name,
  //         price: product.price,
  //         thumbnail: product.thumbnail,
  //         description: product.description,
  //         category_id: product.category_id,
  //         product_attributes: product.product_attributes.map((pa) => ({
  //           attribute_id: pa.id,
  //           value: pa.value,
  //         })),
  //       };
  //       console.log("Danh sách product_attributes sau khi load:", this.updateProductDTO.product_attributes);

  
  //       // // Nếu sản phẩm không có thuộc tính, lấy từ danh sách thuộc tính chung
  //       // if (this.updateProductDTO.product_attributes.length === 0) {
  //       //   this.getAllAtrributes();
  //       // }
  //     },
  //     error: (error: any) => {
  //       console.error("Lỗi khi lấy sản phẩm", error);
  //     },
  //   });
  // }
  getProductById(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product: Product) => {
        console.log("Thông tin sản phẩm:", product);
  
        // Chỉ lấy những thuộc tính có giá trị hợp lệ
        this.updateProductDTO = {
          name: product.name,
          price: product.price,
          thumbnail: product.thumbnail,
          description: product.description,
          category_id: product.category_id,
          product_attributes:product.product_attributes
        };
        console.log("Danh sách product_attributes sau khi load:", this.updateProductDTO.product_attributes);
      },
      error: (error: any) => {
        console.error("Lỗi khi lấy sản phẩm", error);
      },
    });
  }
  

  updateProduct() {
    console.log("Dữ liệu cập nhật:", this.updateProductDTO);
    this.productService.updateProduct(this.productId, this.updateProductDTO).subscribe({
      next: (product:ProductDTO) => {
        console.log("Sản phẩm đã được cập nhật:", product);
        alert("Cập nhật sản phẩm thành công");
        this.router.navigate(["/admin"]);
      },
      error: (error: any) => {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        alert("Lỗi khi cập nhật sản phẩm");
      },
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