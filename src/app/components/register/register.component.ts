import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/registerdto';
import { LocationService } from 'src/app/services/location.service';
import { HttpClient } from '@angular/common/http';
import { City } from 'src/app/models/city';
import { District } from 'src/app/models/district';
import { Ward } from 'src/app/models/ward';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  //khai báo các biến liên quan đến các trường dữ liệu trong form
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;

  cities: City[];
  districts: District[] ;
  wards: Ward[] ;
  fullAddress: string ;
  
  selectedCityId: string | null;
  selectedDistrictId: string | null ;
  selectedWard: string | null ;

  constructor(private router: Router,
    private userService: UserService,
    private locationService: LocationService,
    private http: HttpClient)
    {
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = true;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18)
    ;
    this.cities = [];
    this.districts = [];
    this.wards = [];
    this.fullAddress = "";
    
    this.selectedCityId = null;
    this.selectedDistrictId = null;
    this.selectedWard= null;
    //inject
  }
  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.locationService.getCities()
      .subscribe({
        next: (data) => {
          debugger
          this.cities = data;
          console.log(this.cities)
        },
        error: (error) => {
          console.error('Error fetching cities:', error);
        }
      });
  }

  onCityChange() {
    debugger
    this.selectedDistrictId = null;
    this.wards = [];
    console.log("Selected City ID:", this.selectedCityId); // Kiểm tra giá trị ID
    const selectedCity = this.cities.find(city => city.Id === this.selectedCityId);
    console.log("Selected City:", selectedCity); // Kiểm tra thành phố được chọn
    this.districts = selectedCity ? selectedCity.Districts : [];
    this.updateFullAddress();
  }

  onDistrictChange() {
    debugger
    this.wards = [];
    const selectedDistrict = this.districts.find(district => district.Id === this.selectedDistrictId);
    this.wards = selectedDistrict ? selectedDistrict.Wards : [];
    this.updateFullAddress();

  }

  updateFullAddress() {
    const city = this.cities.find(c => c.Id === this.selectedCityId)?.Name || '';
    const district = this.districts.find(d => d.Id === this.selectedDistrictId)?.Name || '';
    const ward = this.wards.find(w => w.Id === this.selectedWard)?.Name || '';
    
    this.fullAddress = `${ward}, ${district}, ${city}`;
  }

  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
    //số điện thoại phải lớn hơn 6 kí tự
  }
  register() {
    const message =
      `phone: ${this.phoneNumber}` +
      `password: ${this.password}` +
      `retypePassword: ${this.retypePassword}` +
      `fullName: ${this.fullName}` +
      `address: ${this.address}` +
      `isAccepted: ${this.isAccepted}` +
      `dateOfBirth: ${this.dateOfBirth}`;
    // alert(message);
    const registerDTO:RegisterDTO = {
      "fullname": this.fullName,
      "phone_number": this.phoneNumber,
      "address": this.fullAddress,
      "password": this.password,
      "retype_password": this.retypePassword,
      "date_of_birth": this.dateOfBirth,
      "facebook_account_id": 0,
      "google_account_id": 0,
      "role_id": 1,
    };
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger;
        //Xử lí kết quả trả về khi đăng nhập thành công
        this.router.navigate(['/login']);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        alert(`Cannot register, error: ${error.error}`)
      }
    })
  }
  //kiểm tra mật khẩu và mật khẩu gõ lại
  checkPasswordsMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({
        passwordMismatch: true,
      });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }
  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      if (age < 18) {
        this.registerForm.form.controls['dateOfBirth'].setErrors({
          invalidAge: true,
        });
      } else {
        this.registerForm.form.controls['dateOfBirth'].setErrors(null);
      }
    }
  }
}
