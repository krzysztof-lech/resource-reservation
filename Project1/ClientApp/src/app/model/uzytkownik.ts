import { Injectable } from "@angular/core";

@Injectable()
export class Uzytkownik {
    public id: number;
    public imie: string;
    public nazwisko: string;
    public login: string;
    public haslo: string;
    public admin: number;
}