import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Slider } from 'src/app/models/slider';
import { SliderService } from 'src/app/services/slider.service';
import { environment } from 'src/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  sliders:Slider[]=[];
  currentPage: number = 0;
  pageSize: number = 10; // Số lượng sản phẩm mỗi trang
  selectedProducts: Product[] = []; // Lưu trữ sản phẩm được trả về từ slider
  selectedProductDetail: Product | null = null; // Chi tiết sản phẩm nếu chọn slider kiểu Product

  constructor(
    private sliderService: SliderService,
    private router: Router,
    private http: HttpClient,
  ){}
  ngOnInit() {
    this.getSliders(1,100);
  }

  getSliders(page: number, limit: number){
    debugger
    this.sliderService.getSliders(page,limit).subscribe({
      next:(sliders:Slider[])=>{
        debugger
        sliders.forEach((slider: Slider) => {
          debugger
          slider.imageUrl = `${environment.apiBaseUrl}/sliders/images/${slider.imageUrl}`;
        });
        this.sliders=sliders;
      },
      complete:()=>{
        debugger;
      },
      error: (error: any) => {
        debugger
        console.error('Error fetching sliders: ', error);
      }
    })
  }

  onSliderClick(slider: Slider): void {
    // Gọi hàm handleSliderAction từ service khi click vào slider
    this.sliderService.handleSliderAction(slider).subscribe(response => {
      if (slider.linkType === 'category') {
        this.selectedProducts = response; // Gán danh sách sản phẩm nếu slider là CATEGORY
        this.selectedProductDetail = null;
        // this.router.navigate(['/products',productId]);
      } else if (slider.linkType === 'product') {
        this.selectedProductDetail = response; // Gán chi tiết sản phẩm nếu slider là PRODUCT
        this.selectedProducts = [];
        this.router.navigate(['/products',slider.productId]);
        
      } else if(slider.linkType === 'all_products'){
        this.selectedProducts = response;
        this.selectedProductDetail = null;
        this.router.navigate(['/products']);
      }
    }, error => {
      console.error('Error handling slider action', error);
    });
  }
  
}
