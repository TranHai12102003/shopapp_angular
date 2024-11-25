import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/registerdto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { UserResponse } from '../responses/user/user.response';
import { District } from '../models/district';
import { City } from '../models/city';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  constructor(private http: HttpClient) { }
  private createHeaders(): HttpHeaders{
    return new HttpHeaders({'Content-Type': 'application/json','Accept-Language':'vi'});
  }
  private apiConfig={
    headers: this.createHeaders(),
  }


  register(registerDTO:RegisterDTO):Observable<any>{
    return this.http.post(this.apiRegister,registerDTO,this.apiConfig)
  }

  login(loginDTO:LoginDTO):Observable<any>{
    return this.http.post(this.apiLogin,loginDTO,this.apiConfig)
  }

  getUserDetails(token:string){
    return this.http.post(this.apiUserDetail,{
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  saveUserResponseToLocalStorage(userResponse?:UserResponse){
    try{
      debugger
      if(userResponse == null || !userResponse){//nếu userResponse = null hoặc undefind
          return;
      }
//Hàm JSON.stringify() chuyển đổi đối tượng userResponse thành một chuỗi JSON để có thể lưu trữ trong localStorage
      const userResponseJson = JSON.stringify(userResponse);
      //Dòng này lưu chuỗi JSON đã chuyển đổi vào localStorage với khóa (key) là 'user'
      localStorage.setItem('user',userResponseJson);
      console.log('User Response saved to local storage.');
    }
    catch(error){
      console.error('Error saving user response to local storage:',error);
    }
  }

  getUserResponseFromLocalStorage():UserResponse | null{
    try{
      //Dòng này sử dụng hàm localStorage.getItem() để lấy dữ liệu đã được lưu trong localStorage với khóa 'user'
      const userResponseJson = localStorage.getItem('user');
      if(userResponseJson == null || userResponseJson == undefined){
        return null;
      }
  //Nếu dữ liệu tồn tại (không phải null hoặc undefined),
  // chuỗi JSON sẽ được chuyển đổi ngược lại thành đối tượng JavaScript thông qua hàm JSON.parse().
  // Dấu chấm than ! sau userResponseJson dùng để báo với TypeScript rằng biến này chắc chắn không phải là null
  // tại thời điểm này.
      const userResponse = JSON.parse(userResponseJson!);
      console.log('User response retrieved from local storage.!');
      return userResponse;
    }
    catch(error){
      console.error('Error retrieving user response from local storage:',error);
      return null;
    }
  }

  removeUserFromLocalStorage():void{
    try {
      localStorage.removeItem('user');
      alert('Bạn đã đăng xuất tài khoản khỏi hệ thống');
    } catch (error) {
      alert('Bạn chưa đăng nhập tài khoản vào hệ thống');
    }
  }

  updateUserDetail(token: string, updateUserDTO: UpdateUserDTO) {
    debugger
    let userResponse = this.getUserResponseFromLocalStorage();        
    return this.http.put(`${this.apiUserDetail}/${userResponse?.id}`,updateUserDTO,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
  }
  

}
