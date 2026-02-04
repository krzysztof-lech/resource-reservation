import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kategoria } from "../model/kategoria";
import { Router } from '@angular/router';

@Component({
    selector: 'app-kategorie',
    templateUrl: './kategorie-lista.component.html'
})
export class KategorieListaComponent {
    public kategorieLista: Kategoria[];

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
        http.get<Kategoria[]>(baseUrl + 'api/kategorie').subscribe(result => {
            this.kategorieLista = result;
        }, error => console.error(error));
    }

    public pokazKategorie(kategoria: Kategoria) {
        var id = kategoria.id;
        this.router.navigate(['/kategoria-forma/edit', id]);
    }

}

