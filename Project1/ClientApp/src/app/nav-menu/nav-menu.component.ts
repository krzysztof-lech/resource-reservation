import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    isExpanded = false;

    public constructor(private appComponent: AppComponent, private router: Router) {

    }

    zalogowano() {
        return this.appComponent.zalogowano;
    }

    czy_admin() {
        return this.appComponent.admin == 1 && this.appComponent.zalogowano;
    }

    wyloguj() {
        this.appComponent.zalogowano = false;
        this.appComponent.admin = 0;
    }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
