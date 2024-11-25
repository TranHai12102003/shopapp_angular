import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber,     
} from 'class-validator';

export class InsertCategoryDTO {    
    @IsString()
    @IsNotEmpty()
    name: string;
    parent_id:number|null;
            
    constructor(data: any) {
        this.name = data.name;  
        this.parent_id=data.parent_id;  
    }
}