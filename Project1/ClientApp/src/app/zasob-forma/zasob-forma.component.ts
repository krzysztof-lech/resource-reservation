import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Zasob } from "../model/zasob";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
     templateUrl: "zasob-forma.component.html"
})
export class ZasobFormaComponent {

    public zasob: Zasob;
    private zapisano: boolean = false;
    public edycja: boolean = false;
    public usuwanie:boolean = false;
    private id: string;
    public submitted: boolean;
    public komunikat: string;
  
 

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
        private route: ActivatedRoute, private router: Router)
    {
        this.submitted = false;
        this.komunikat = null;
        
        this.edycja = route.snapshot.params["mode"] == "edit";
        if (this.edycja) {
            this.id = route.snapshot.params["id"];
            http.get<Zasob>(baseUrl + 'api/zasob/'+this.id).subscribe(result => {
                this.zasob = result;
            }, error => console.error(error));
           
        }
        else {
            this.zasob = new Zasob();
            this.zasob.id = 0;
            this.zasob.interwal = 30;
            this.zasob.godz_od = 8;
            this.zasob.min_od = 0;
            this.zasob.godz_do = 16;
            this.zasob.min_do = 0;
        }
    }

    zapiszZasob(form: NgForm) {
        this.submitted = true;
        if (!this.usuwanie && form.valid) {
            if (this.zasob.interwal < 10 || this.zasob.interwal > 120)
                this.komunikat = "Interwal powinnien być z przedziału 10-120"
            else if (this.zasob.godz_od < 0 || this.zasob.godz_od > 23 || this.zasob.godz_do < 0 || this.zasob.godz_do > 23
                || this.zasob.min_od < 0 || this.zasob.min_od > 59 || this.zasob.min_do < 0 || this.zasob.min_do > 59)
                this.komunikat = "Niepoprawne godziny/minuty dostępności";
            else {
                this.submitted = false;
                this.komunikat = null;
                this.http.post<Zasob>(this.baseUrl + 'api/zasob', this.zasob).subscribe(data => {
                    this.zapisano = true;
                    this.router.navigate(['/zasoby-lista']);
                }, error => console.error(error));
            }

        }
    
    }

    usunZasob() {
        this.usuwanie = true;

        this.http.delete<Zasob>(this.baseUrl + 'api/zasob/' + this.id).subscribe(data => {
            this.zapisano = true;
            
            this.router.navigate(['/zasoby-lista']);
        })
        


    }


}
