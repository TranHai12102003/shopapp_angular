import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { District } from '../models/district';  // Đảm bảo rằng bạn có model District
// import { Ward } from '../models/Ward';  // Đảm bảo rằng bạn có model Ward
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  // Lấy danh sách tỉnh/thành phố
  getCities(): Observable<City[]> {
    return this.http.get<City[]>('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
  }

  // Lấy danh sách quận/huyện theo ID tỉnh/thành phố
  getDistricts(provinceId: number): Observable<District[]> {
    return this.http.get<District[]>(`https://partner.viettelpost.vn/v2/categories/listDistrict?provinceId=${provinceId}`);
  }

  // Lấy danh sách phường/xã theo ID quận/huyện
//   getWards(districtId: number): Observable<Ward[]> {
//     return this.http.get<Ward[]>(`https://partner.viettelpost.vn/v2/categories/listWards?districtId=${districtId}`);
//   }
}
