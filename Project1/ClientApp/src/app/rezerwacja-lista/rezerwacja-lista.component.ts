import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Zasob } from "../model/zasob";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-zasoby',
    templateUrl: './rezerwacja-lista.component.html'
})
export class RezerwacjaListaComponent {
    public zasobyLista: Zasob[];

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private route: ActivatedRoute) {
        http.get<Zasob[]>(baseUrl + 'api/zasob').subscribe(result => {
            this.zasobyLista = result;
        }, error => console.error(error));
     }

    public pokazZasob(zasob: Zasob) {
        var id = zasob.id;
        this.router.navigate(['/rezerwacja-forma', id]);
    }

}

