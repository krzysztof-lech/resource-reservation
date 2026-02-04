import { Injectable } from "@angular/core";
import { Rezerwacja } from "../model/rezerwacja";
import { Uzytkownik } from "../model/uzytkownik";

@Injectable()
export class RezerwacjaInfo {
    public rezerwacja: Rezerwacja;
    public uzytkownik: Uzytkownik;

}