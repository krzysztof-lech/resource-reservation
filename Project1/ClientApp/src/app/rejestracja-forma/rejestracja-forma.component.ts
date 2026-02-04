import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Uzytkownik } from "../model/uzytkownik";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
    templateUrl: "rejestracja-forma.component.html"
})
export class RejestracjaFormaComponent {

    public uzytkownik: Uzytkownik;
    public powtorz_haslo: string;
    public komunikat: string;
    public submitted: boolean;
 
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
        this.uzytkownik = new Uzytkownik();
        this.submitted = false;
    }

    zapiszUzytkownika(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            if (this.uzytkownik.haslo != this.powtorz_haslo)
                this.komunikat = "Niewłaściwe potwórzenie hasła"
            else {
                this.http.get<Uzytkownik[]>(this.baseUrl + 'api/uzytkownik/' + this.uzytkownik.login).subscribe(result => {
                    if (result.length > 0) {
                        this.komunikat = "Istnieje już użytkownik z wprowadzonym loginem";
                    }
                    else {
                        this.komunikat = null;
                        if (this.uzytkownik.login == "admin")
                            this.uzytkownik.admin = 1;
                        else
                            this.uzytkownik.admin = 0;
                        this.submitted = false;

                        this.http.post<Uzytkownik>(this.baseUrl + 'api/uzytkownik', this.uzytkownik).subscribe(data => {
                            this.router.navigate(['/login-forma']);
                        })
                    }
                }, error => console.error(error));

            }


        }
    }

}
