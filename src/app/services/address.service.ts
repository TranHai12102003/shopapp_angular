import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiKey = 'YOUR_API_KEY'; // Thay YOUR_API_KEY bằng key từ dịch vụ API (Google, hoặc dịch vụ khác)
  private apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${this.apiKey}&input=`;

  constructor(private http: HttpClient) {}

  // Hàm tìm kiếm địa chỉ dựa trên từ khóa nhập vào
  searchAddress(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${query}`);
  }
}
