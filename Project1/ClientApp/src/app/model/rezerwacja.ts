import { Injectable } from "@angular/core";

@Injectable()
export class Rezerwacja {
    public id: number;
    public uzytkownik_id: number;
    public zasob_id: number;
    public rok: number;
    public mies: number;
    public dz: number;
    public godz: number;
    public min: number;
}