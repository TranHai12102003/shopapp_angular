import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/app/environments/environment";
import { Slider } from "src/app/models/slider";
import { SliderService } from "src/app/services/slider.service";

@Component({
    selector: 'app-slider-admin',
    templateUrl:'./slider.admin.component.html',
    styleUrls:['./slider.admin.component.scss']
})
export class SliderAdminComponent implements OnInit{
    sliders:Slider []=[];
    currentPage: number = 0;
    itemsPerPage: number = 12;
    pages: number[] = [];
    totalPages: number = 0;
    visiblePages: number[] = [];
    constructor(private router:Router, private sliderService:SliderService){}
    ngOnInit(): void {
        this.getAllSilders(this.currentPage,this.itemsPerPage)
    }
    
    getAllSilders(page: number, limit: number) {
        this.sliderService.getSliders(page, limit).subscribe({
          next: (response: any) => {
            response.forEach((slider:Slider)=>{
                slider.imageUrl=`${environment.apiBaseUrl}/sliders/images/${slider.imageUrl}`;
            });
            console.log('Response từ API:', response);
            this.sliders = response;
            this.totalPages = response.totalPages;
            this.visiblePages = this.generateVisiblePages(this.currentPage, this.totalPages);
          },
          error: (error: any) => {
            console.error('Lỗi khi lấy sliders:', error);
          },
        });
      }
      generateVisiblePages(currentPage: number, totalPages: number): number[] {
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
      
        if (endPage - startPage + 1 < maxVisiblePages) {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
      
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
      }
      
      onPageChange(page: number) {
        this.currentPage = page;
        this.getAllSilders(page - 1, this.itemsPerPage);
      }
    
      deleteSliderId(silder: Slider) {
        const confirmation = window.confirm('Bạn chắc chắn xóa slider này?');
        if (confirmation) {
          debugger;
          this.sliderService.deleteSlider(silder.id).subscribe({
            next: (respone) => {
              debugger;
              console.log('Xóa thành công');
              alert(respone);
              location.reload();
              // this.getAllCategoires(this.currentPage,this.itemsPerPage)
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
    
}