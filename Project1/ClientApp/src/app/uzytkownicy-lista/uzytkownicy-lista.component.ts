import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Uzytkownik } from "../model/uzytkownik";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './uzytkownicy-lista.component.html'
})
export class UzytkownicyListaComponent {
    public uzytkownicyLista: Uzytkownik[];

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private route: ActivatedRoute) {
        http.get<Uzytkownik[]>(baseUrl + 'api/uzytkownik').subscribe(result => {
            this.uzytkownicyLista = result;
        }, error => console.error(error));
    }

    public pokazUzytkownik(uzytkownik: Uzytkownik) {
        var id = uzytkownik.id;
        this.router.navigate(['/uzytkownik-forma/edit', id]);
    }

}