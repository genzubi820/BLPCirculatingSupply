import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        MatButton,
        RouterLink
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    constructor(private router: Router) {
    }

    /**
     * remove token and navigate to login page
     */
    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']).then();
    }
}
