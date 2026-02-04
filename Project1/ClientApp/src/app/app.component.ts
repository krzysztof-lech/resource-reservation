import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';
    public zalogowano: boolean;
    public nazwisko: string;
    public imie: string;
    public uzytkownik_id: number;
    public admin: number;

    constructor() {
        this.zalogowano = false;
        this.admin = 0;
    }

   public zaloguj(_nazwisko:string, _imie:string, _uzytkownik_id:number, _admin:number) {
       this.zalogowano = true;
       this.nazwisko = _nazwisko;
       this.imie = _imie;
       this.uzytkownik_id = _uzytkownik_id;
       this.admin = _admin;
    }
}
