import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ZasobyListaComponent } from './zasoby-lista/zasoby-lista.component';
import { ZasobFormaComponent } from './zasob-forma/zasob-forma.component';
import { UzytkownicyListaComponent } from './uzytkownicy-lista/uzytkownicy-lista.component';
import { UzytkownikFormaComponent } from './uzytkownik-forma/uzytkownik-forma.component';
import { RezerwacjaFormaComponent } from './rezerwacja-forma/rezerwacja-forma.component';
import { RezerwacjaListaComponent } from './rezerwacja-lista/rezerwacja-lista.component';
import { LoginFormaComponent } from './login-forma/login-forma.component';
import { RejestracjaFormaComponent } from './rejestracja-forma/rejestracja-forma.component';
import { KategorieListaComponent } from './kategorie-lista/kategorie-lista.component';
import { KategoriaFormaComponent } from './kategoria-forma/kategoria-forma.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ZasobyListaComponent,
    ZasobFormaComponent,
    UzytkownicyListaComponent,
    UzytkownikFormaComponent,
    RezerwacjaFormaComponent,
    RezerwacjaListaComponent,
    LoginFormaComponent,
    RejestracjaFormaComponent,
    KategorieListaComponent,
    KategoriaFormaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginFormaComponent, pathMatch: 'full' },
      { path: 'zasoby-lista', component: ZasobyListaComponent },
      { path: 'zasob-forma/:mode/:id', component: ZasobFormaComponent },
      { path: 'zasob-forma/:mode', component: ZasobFormaComponent },
      { path: 'rezerwacja-lista', component: RezerwacjaListaComponent },
      { path: 'rezerwacja-forma/:id', component: RezerwacjaFormaComponent },
      { path: 'uzytkownicy-lista', component: UzytkownicyListaComponent },
      { path: 'uzytkownik-forma/:mode/:id', component: UzytkownikFormaComponent },
      { path: 'uzytkownik-forma/:mode', component: UzytkownikFormaComponent },
      { path: 'login-forma', component: LoginFormaComponent },
      { path: 'rejestracja-forma', component: RejestracjaFormaComponent },
      { path: 'kategorie-lista', component: KategorieListaComponent },
      { path: 'kategoria-forma/:mode/:id', component: KategoriaFormaComponent },
      { path: 'kategoria-forma/:mode', component: KategoriaFormaComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
