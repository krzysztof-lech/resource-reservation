import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Uzytkownik } from "../model/uzytkownik";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
    templateUrl: "uzytkownik-forma.component.html"
})
export class UzytkownikFormaComponent {

    public uzytkownik: Uzytkownik;
    private zapisano: boolean = false;
    private usuwanie: boolean = false;
    public edycja: boolean = false;
    public admin: boolean = false;
    private id: string;



    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
        private route: ActivatedRoute, private router: Router) {
        this.edycja = route.snapshot.params["mode"] == "edit";
        if (this.edycja) {
            this.id = route.snapshot.params["id"];
            http.get<Uzytkownik>(baseUrl + 'api/uzytkownik/' + this.id+'/login').subscribe(result => {
                this.uzytkownik = result;
                this.admin = this.uzytkownik.admin == 1;
            }, error => console.error(error));

        }
        else {
            this.uzytkownik = new Uzytkownik();
        }
    }

    zapiszUzytkownik(form: NgForm) {
        if (!this.usuwanie) {
            this.uzytkownik.admin = this.admin ? 1 : 0;

            this.http.post<Uzytkownik>(this.baseUrl + 'api/uzytkownik', this.uzytkownik).subscribe(data => {
                this.zapisano = true;
                this.router.navigate(['/uzytkownicy-lista']);
            })


        }


    }

    usunUzytkownik() {
        this.usuwanie = true;

        this.http.delete<Uzytkownik>(this.baseUrl + 'api/uzytkownik/' + this.id).subscribe(data => {
            this.zapisano = true;
            this.router.navigate(['/uzytkownicy-lista']);
        })


    }


}
