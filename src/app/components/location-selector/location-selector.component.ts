import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent implements OnInit {
  cities: City[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  fullAddress: string = '';
  
  selectedCityId: string | null = null;
  selectedDistrictId: string | null = null;
  selectedWard: string | null = null;
  
  constructor(private http: HttpClient) {} // Inject HttpClient

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.http.get<City[]>('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .subscribe({
        next: (data) => {
          debugger
          this.cities = data;
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
    const selectedCity = this.cities.find(city => city.Id === this.selectedCityId);
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
}
