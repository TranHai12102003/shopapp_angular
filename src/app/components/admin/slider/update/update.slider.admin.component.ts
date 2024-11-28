import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SliderService } from 'src/app/services/slider.service';
import { SliderDTO } from 'src/app/dtos/slider/slider.dto';


@Component({
  selector: 'app-slider-update',
  templateUrl: './update.slider.admin.component.html',
  styleUrls: ['./update.slider.admin.component.scss']
})
export class UpdateSliderComponent implements OnInit {
  sliderForm!: FormGroup;
  sliderId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sliderService: SliderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sliderId = +this.route.snapshot.paramMap.get('id')!; // Lấy id từ URL

    // Khởi tạo form
    this.sliderForm = this.fb.group({
      title: ['', Validators.required],
      link_type: ['', Validators.required],
      category_id: [null],
      product_id: [null]
    });

    // Lấy dữ liệu slider hiện tại
    this.loadSlider();
  }

//   loadSlider(): void {
//     // Gọi API lấy slider theo ID (nếu bạn có hàm getSliderById)
//     // Đây là ví dụ giả định
//     this.sliderService.getSliderById(this.sliderId).subscribe({
//       next: (slider: SliderDTO) => {
//         this.sliderForm.patchValue(slider); // Gán giá trị vào form
//       },
//       error: (err) => {
//         console.error('Error loading slider:', err);
//       }
//     });
//   }
loadSlider(): void {
    this.sliderService.getSliderById(this.sliderId).subscribe({
      next: (slider: SliderDTO) => {
        // Gán dữ liệu từ API vào form
        this.sliderForm.patchValue({
          title: slider.title,
          link_type: slider.link_type,
          category_id: slider.category_id,
          product_id: slider.product_id
        });
      },
      error: (err) => {
        console.error('Error loading slider:', err);
        alert('Không tìm thấy slider với ID này!');
        // this.router.navigate(['/sliders']); // Điều hướng về trang danh sách nếu lỗi
      }
    });
  }

  onSubmit(): void {
    if (this.sliderForm.valid) {
      const sliderDTO: SliderDTO = this.sliderForm.value;
      this.sliderService.updateSlider(this.sliderId, sliderDTO).subscribe({
        next: (updatedSlider) => {
          alert('Cập nhật slider thành công!');
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          console.error('Error updating slider:', err);
        }
      });
    }
  }
}
