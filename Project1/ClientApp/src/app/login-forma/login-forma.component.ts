import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Uzytkownik } from "../model/uzytkownik";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
    templateUrl: "login-forma.component.html",
    selector: 'login-forma',
})
export class LoginFormaComponent {

    public uzytkownik: Uzytkownik;
    public komunikat: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
        private route: ActivatedRoute, private router: Router, private appComponent: AppComponent) {
        this.uzytkownik = new Uzytkownik();
        this.komunikat = null;
    }

    zaloguj() {
        this.http.get<Uzytkownik[]>(this.baseUrl + 'api/uzytkownik/' + this.uzytkownik.login).subscribe(result => {
            if (result.length>0) {
                if (result[0].haslo == this.uzytkownik.haslo) {
                    this.appComponent.zaloguj(result[0].nazwisko, result[0].imie, result[0].id, result[0].admin);
                    this.komunikat = null;
                }
                else
                    this.komunikat = "Niepoprawne hasło"
            }
            else
                this.komunikat = "Niepoprawny login"

        }, error => console.error(error));

    }

    zalogowano() {
        return this.appComponent.zalogowano;
    }
    
        

}
