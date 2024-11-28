import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SliderDTO } from "src/app/dtos/slider/slider.dto";
import { environment } from "src/app/environments/environment";
import { Category } from "src/app/models/category";
import { Product } from "src/app/models/product";
import { ProductService } from "src/app/services/product.service";
import { SliderService } from "src/app/services/slider.service";

@Component({
    selector:'app-add-slider',
    templateUrl:'./insert.slider.admin.component.html',
    styleUrls:['./insert.slider.admin.component.scss'],
})
export class InsertSliderComponent implements OnInit{
  insertSliderDTO:SliderDTO={
    title:'',
    image_url:'',
    link_type:'all_products',
    category_id:null,
    product_id:null
  };
  imageFile: File | null=null;
  constructor(
    private sliderService:SliderService,
    private router:Router
  ){}

  //Xử lý khi người dùng chọn ảnh
  onFileChange(event:any){
    const file=event.target.files[0];
    if(file){
      this.imageFile=file;
    }
  }

  //Gửi dữ liệu để tạo slider
  insertSlider(){
    this.sliderService.insertSlider(this.insertSliderDTO).subscribe({
      next:(slider)=>{
        if(this.imageFile){
          const formData=new FormData();
          formData.append('file',this.imageFile);
          this.sliderService.uploadImage(slider.id,formData).subscribe({
            next:()=>{
              alert("Thêm thành công slider");
              this.router.navigate(["/admin"])
            },
            error:(error)=>{
              console.error('Lỗi upload ảnh',error);
            },
          });
        }
      },
      error:(error)=>{
        console.error("Lỗi thêm slider",error);
        alert("Thêm slider lỗi");
      },
    });
  }

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
    


      
}