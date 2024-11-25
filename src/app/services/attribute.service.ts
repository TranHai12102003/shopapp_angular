import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Attribute } from "../models/attribute";

@Injectable({
    providedIn: 'root',
  })
  export class AttributeService {
    private apiUrl = `${environment.apiBaseUrl}/attributes`;
  
    constructor(private http: HttpClient) {}
  
    getAttributes(): Observable<Attribute[]> {
      return this.http.get<Attribute[]>(this.apiUrl);
    }
  }
  