import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { LoginResponse } from 'src/app/responses/user/login.response';
import { TokenService } from 'src/app/services/token.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/models/role';
import { UserResponse } from 'src/app/responses/user/user.response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm!: NgForm;

  //login user
  phoneNumber: string = '0382417920';
  password: string = '123456';

  //login admin

  roles: Role[] = []; //Mảng Role
  rememberMe: boolean = true;
  selectedRole: Role | undefined; //Biến để lưu giá trị được chọn từ dropdown
  userResponse?: UserResponse;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService
  ) {}

  onPhoneNumberChange() {
    console.log(`Phone typed: ${this.phoneNumber}`);
    //số điện thoại phải lớn hơn 6 kí tự
  }

  ngOnInit() {
    debugger;
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        debugger;
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger;
        console.error('Erorr getting roles: ', error);
      },
    });
  }

  login() {
    const message = `phone: ${this.phoneNumber}` + `password: ${this.password}`;
    // alert(message);
    debugger;
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1,
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        //muốn sử dụng các token trong các API thì sẽ gắn token vào header trên đường truyền dữ liệu
        debugger;
        const { token } = response;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
          this.userService.getUserDetails(token).subscribe({//trả về userDetails
            next: (response: any) => {
              //cách 1
              debugger;
              this.userResponse={
                id:response.id,
                fullname: response.fullname,
                phone_number:response.phone_number,
                address: response.address,
                is_active: response.is_active,
                date_of_birth: new Date(response.date_of_birth),
                facebook_account_id: response.facebook_account_id,
                google_account_id: response.google_account_id,
                role: response.role,

                //cách 2 nếu như chỉ thay đổi 1 trường dữ liệu dùng cách 2 sẽ nhanh hơn
                //...response,
                //date_of_birth:new Date(response.date_of_birth),
              };
                //Xử lí kết quả trả về khi đăng nhập thành công
                this.userService.saveUserResponseToLocalStorage(this.userResponse);
                if(this.userResponse?.role.name == "admin"){
                  this.router.navigate(['/admin']);
                }else if(this.userResponse?.role.name == "user"){
                  this.router.navigate(['/']);
                }
            },
            complete: () => {
              debugger;
            },
            error: (error: any) => {
              alert(`Cannot login, error: ${error.error}`);
            },
          });
        }
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        alert(`Cannot login, error: ${error.error}`);
      },
    });
  }
}
