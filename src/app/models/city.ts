import { District } from "./district";

export interface City {
    Id: string;
    Name: string;
    Districts: District[];
  }