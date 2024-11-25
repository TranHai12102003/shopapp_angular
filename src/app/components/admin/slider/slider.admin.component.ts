import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-slider-admin',
    templateUrl:'./slider.admin.component.html',
    styleUrls:['./slider.admin.component.scss']
})
export class SliderAdminComponent implements OnInit{
    constructor(private router:Router){}
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    
}