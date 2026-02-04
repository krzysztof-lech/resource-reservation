import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Kategoria } from "../model/kategoria";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
    templateUrl: "kategoria-forma.component.html"
})
export class KategoriaFormaComponent {

    public kategoria: Kategoria;
    private zapisano: boolean = false;
    public edycja: boolean = false;
    private id: string;



    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
        private route: ActivatedRoute, private router: Router) {
        this.edycja = route.snapshot.params["mode"] == "edit";
        if (this.edycja) {
            this.id = route.snapshot.params["id"];
            http.get<Kategoria>(baseUrl + 'api/kategorie/' + this.id).subscribe(result => {
                this.kategoria = result;
            }, error => console.error(error));

        }
        else {
            this.kategoria = new Kategoria();
        }
    }

    zapiszKategorie(form: NgForm) {

        this.http.post<Kategoria>(this.baseUrl + 'api/kategorie', this.kategoria).subscribe(data => {
            this.zapisano = true;
            this.router.navigate(['/kategorie-lista']);
        })


    }

    usunKategorie() {

        this.http.delete<Kategoria>(this.baseUrl + 'api/kategorie/' + this.id).subscribe(data => {
            this.zapisano = true;
            this.router.navigate(['/kategorie-lista']);
        })


    }


}
