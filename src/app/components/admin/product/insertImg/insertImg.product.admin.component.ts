import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductImage } from "src/app/models/product.image";
import { ProductService } from "src/app/services/product.service";

@Component({
    selector:'app-add-productImg',
    templateUrl:'./insertImg.product.admin.component.html',
    styleUrls:['./insertImg.product.admin.component.scss'],
})

export class InsertProductImg implements OnInit {
    productId:number=0;
    selectedFiles:FileList | null =null;
    productImages:ProductImage[]=[];
    constructor(private route:ActivatedRoute,
        private productService :ProductService
    ){}
    ngOnInit(): void {
         // Lấy ID sản phẩm từ URL
         this.productId = Number(this.route.snapshot.paramMap.get("id"));
    }
    // Phương thức để xử lý khi người dùng chọn file
    onFileChange(event: any): void {
        this.selectedFiles = event.target.files;  // Lấy danh sách tệp được chọn
    }
    // Phương thức để gửi ảnh lên server
    insertProductImgs(): void {
        if (this.selectedFiles && this.selectedFiles.length > 0) {
            const formData = new FormData();
            
            // Thêm tất cả các tệp vào FormData
            Array.from(this.selectedFiles).forEach(file => {
                formData.append('files', file, file.name);  // Thêm mỗi tệp vào FormData
            });

            // Thêm productId vào FormData
            formData.append('productId', this.productId.toString());

            // Gửi dữ liệu lên server
            this.productService.insertProductImg(this.productId, formData).subscribe({
                next: (response) => {
                    console.log('Response:', response);
                    alert("Thêm ảnh cho sản phẩm thành công");
                    this.productImages = response;  // Cập nhật danh sách hình ảnh nếu có
                },
                error: (err) => {
                    console.error('Error:', err);
                }
            });
        } else {
            alert("Vui lòng chọn ít nhất một tệp ảnh.");
        }
    }


}