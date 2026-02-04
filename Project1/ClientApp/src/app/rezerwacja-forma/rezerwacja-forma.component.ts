import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Zasob } from "../model/zasob";
import { Czas } from "../model/czas";
import { Dzien } from "../model/dzien";
import { Rezerwacja } from "../model/rezerwacja";
import { RezerwacjaInfo } from "../model/rezerwacjainfo";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { AppComponent } from '../app.component';


@Component({
    templateUrl: "rezerwacja-forma.component.html"
})
export class RezerwacjaFormaComponent {

    public dni_tyg:string[] =[ "Pn", "Wt", "Sr", "Cz", "Pt", "Sb", "N" ];
    public zasob: Zasob;
    public rezerwacjaInfo: RezerwacjaInfo[];
    private zapisano: boolean = false;
    private id: string;
    public terminy: Czas[];
    public dni: Dzien[];
    public liczba_dni: number = 7;
    public liczba_terminow: number;
    public dlugosc_min: number = 15;
    public dzisiaj: number;
    public teraz: number;
    public czas_od: Czas = { godz: 8, min: 0 };
    public czas_do: Czas = { godz: 16, min: 0 };
    public rezerwacje: number[][];
    public rezTablica: RezDzien[];
    public poczatekTygodnia: Date;
    public alokuj = true;


    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
        private route: ActivatedRoute, private router: Router, private appComponent: AppComponent) {
        this.id = route.snapshot.params["id"];
        this.dni = new Array(this.liczba_dni);
        this.poczatekTygodnia = new Date();
        this.poczatekTygodnia.setDate(this.poczatekTygodnia.getDate() - this.poczatekTygodnia.getDay() + 1);
        this.wczytaj_rezerwacje();

    }

    private wczytaj_rezerwacje() {
        this.wyznacz_dni();
        var dt = new Date();
        this.dzisiaj = dt.getFullYear() * 10000 + (dt.getMonth() + 1) * 100 + dt.getDate();
        this.teraz = this.dzisiaj * 10000 + dt.getHours() * 100 + dt.getMinutes();
        this.http.get<Zasob>(this.baseUrl + 'api/zasob/' + this.id).subscribe(result => {
            this.zasob = result;
            this.dlugosc_min = this.zasob.interwal;
            this.czas_od.godz - this.zasob.godz_od;
            this.czas_od.min = this.zasob.min_od;
            this.czas_do.godz = this.zasob.godz_do;
            this.czas_do.min = this.zasob.min_do;
            this.http.get<RezerwacjaInfo[]>(this.baseUrl + 'api/rezerwacja/' + this.zasob.id + ' / ' + this.dni[0].rok + ' / ' + this.dni[0].mies + ' / ' + this.dni[0].dz + ' / ' +
                this.dni[this.liczba_dni - 1].rok + '/' + this.dni[this.liczba_dni - 1].mies + '/' + this.dni[this.liczba_dni - 1].dz).subscribe(result => {
                    this.rezerwacjaInfo = result;
                    this.wyznacz_terminy();
                    this.ustaw_tablice();
                    this.ustaw_rezerwacje();
                    this.alokuj = false;
                }, error => console.error(error));
        }, error => console.error(error));
    }

    private wyznacz_terminy() {
        var czas_od = this.czas_od.godz * 60 + this.czas_od.min;
        var czas_do = this.czas_do.godz * 60 + this.czas_do.min;
        this.liczba_terminow = (czas_do - czas_od) / this.dlugosc_min;
        if (this.alokuj) {
            this.terminy = new Array(this.liczba_terminow);
        }     
        var czas = czas_od;
        for (var i = 0; i < this.liczba_terminow; i++) {
            if (this.alokuj) {
                this.terminy[i] = new Czas();
            }         
            this.terminy[i].godz = Math.floor(czas / 60);
            this.terminy[i].min = czas % 60;
            czas = czas + this.dlugosc_min;
        }
    }

    private wyznacz_dni() {
        var dzien = new Date(this.poczatekTygodnia);
        for (var i = 0; i < this.liczba_dni; i++) {
            this.dni[i] = new Dzien();
            this.dni[i].dz = dzien.getDate();
            this.dni[i].mies = dzien.getMonth()+1;
            this.dni[i].rok = dzien.getFullYear();
            dzien.setDate(dzien.getDate() + 1);
        }
    }

    private ustaw_tablice() {
        this.rezTablica = Array(this.liczba_dni);
        for (var i = 0; i < this.liczba_dni; i++) {
            this.rezTablica[i] = new RezDzien();
            this.rezTablica[i].rok = this.dni[i].rok;
            this.rezTablica[i].mies = this.dni[i].mies;
            this.rezTablica[i].dz = this.dni[i].dz;
            this.rezTablica[i].data = this.dni[i].rok * 10000 + this.dni[i].mies * 100 + this.dni[i].dz;
            this.rezTablica[i].rezTermin = Array(this.liczba_terminow);
            for (var j = 0; j < this.liczba_terminow; j++) {
                this.rezTablica[i].rezTermin[j] = new RezTermin();
                this.rezTablica[i].rezTermin[j].godz = this.terminy[j].godz;
                this.rezTablica[i].rezTermin[j].min = this.terminy[j].min;
                this.rezTablica[i].rezTermin[j].czas = this.rezTablica[i].data * 10000 + this.terminy[j].godz * 100 + this.terminy[j].min;
            }
        }
    }
    private ustaw_rezerwacje() {
        var liczba_rezerwacji = this.rezerwacjaInfo.length;
        for (var i = 0; i < liczba_rezerwacji; i++) {
            for (var j = 0; j < this.liczba_dni; j++) {
                if (this.rezTablica[j].rok == this.rezerwacjaInfo[i].rezerwacja.rok
                    && this.rezTablica[j].mies == this.rezerwacjaInfo[i].rezerwacja.mies
                    && this.rezTablica[j].dz == this.rezerwacjaInfo[i].rezerwacja.dz) {
                    for (var k = 0; k < this.liczba_terminow; k++) {
                        if (this.rezTablica[j].rezTermin[k].godz == this.rezerwacjaInfo[i].rezerwacja.godz
                            && this.rezTablica[j].rezTermin[k].min == this.rezerwacjaInfo[i].rezerwacja.min) {
                            this.rezTablica[j].rezTermin[k].uzytkownik = this.rezerwacjaInfo[i].uzytkownik.nazwisko;
                            this.rezTablica[j].rezTermin[k].uzytkownik_id = this.rezerwacjaInfo[i].uzytkownik.id;
                            this.rezTablica[j].rezTermin[k].id = this.rezerwacjaInfo[i].rezerwacja.id;
                            break;
                        }
                    }
                    break;
                }
            }

        }


    }

    nastepnyTydzien() {
        this.poczatekTygodnia.setDate(this.poczatekTygodnia.getDate()+7);
        this.wczytaj_rezerwacje();

    }

    aktualnyTydzien() {
        this.poczatekTygodnia = new Date();
        this.poczatekTygodnia.setDate(this.poczatekTygodnia.getDate() - this.poczatekTygodnia.getDay() + 1);
        this.wczytaj_rezerwacje();

    }

    poprzedniTydzien() {
        this.poczatekTygodnia.setDate(this.poczatekTygodnia.getDate()-7);
        this.wczytaj_rezerwacje();

    }

    czy_mozna_rezerwowac(dzien: Dzien, termin: Czas, dz_index: number, tr_index: number) {
        if (!this.rezTablica[dz_index].rezTermin[tr_index].uzytkownik && this.rezTablica[dz_index].rezTermin[tr_index].czas >= this.teraz)
            return true;
        else
            return false;
    }

    czy_mozna_anulowac(dzien: Dzien, termin: Czas, dz_index: number, tr_index: number) {
        if (this.rezTablica[dz_index].rezTermin[tr_index].uzytkownik && this.rezTablica[dz_index].rezTermin[tr_index].czas >= this.teraz) {
            if (this.appComponent.admin == 1 || this.rezTablica[dz_index].rezTermin[tr_index].uzytkownik_id == this.appComponent.uzytkownik_id)
                return true;
        }
        return false;
    }

    rezerwujZasob(dzien: Dzien, termin: Czas, dz_index: number, tr_index: number) {

        if (this.rezTablica[dz_index].rezTermin[tr_index].uzytkownik == null) {
            this.rezTablica[dz_index].rezTermin[tr_index].uzytkownik = this.appComponent.nazwisko;
            this.rezTablica[dz_index].rezTermin[tr_index].uzytkownik_id = this.appComponent.uzytkownik_id;
            this.rezTablica[dz_index].rezTermin[tr_index].id = 0;
            var rezerwacja = new Rezerwacja();
            rezerwacja.id = 0;
            rezerwacja.uzytkownik_id = this.appComponent.uzytkownik_id;
            rezerwacja.zasob_id = this.zasob.id;
            rezerwacja.rok = dzien.rok;
            rezerwacja.mies = dzien.mies;
            rezerwacja.dz = dzien.dz;
            rezerwacja.godz = termin.godz;
            rezerwacja.min = termin.min;
            
            this.http.post<Rezerwacja>(this.baseUrl + 'api/rezerwacja', rezerwacja).subscribe(data => {
                this.zapisano = true;
                this.http.get<Rezerwacja[]>(this.baseUrl + 'api/rezerwacja/' + this.zasob.id + '/' + dzien.rok + '/' + dzien.mies + '/' + dzien.dz
                    + '/' + termin.godz + '/' + termin.min).subscribe(result => {
                        this.rezTablica[dz_index].rezTermin[tr_index].id = result[0].id;
                    }, error => console.error(error));
            });

            
        }
        else {
            this.http.delete<Zasob>(this.baseUrl + 'api/rezerwacja/' + this.rezTablica[dz_index].rezTermin[tr_index].id).subscribe(data => {
                this.zapisano = true;
                this.rezTablica[dz_index].rezTermin[tr_index].uzytkownik = null;
                this.rezTablica[dz_index].rezTermin[tr_index].uzytkownik_id = 0;
                this.rezTablica[dz_index].rezTermin[tr_index].id = 0;
            })
            
        }





    }


}

@Injectable()
export class RezTermin {
    public godz: number;
    public min: number;
    public uzytkownik: string;
    public uzytkownik_id: number;
    public id: number;
    public czas: number;
}

@Injectable()
export class RezDzien {
    public rok: number;
    public mies: number;
    public dz: number;
    public data: number;
    public rezTermin: RezTermin[];
}
