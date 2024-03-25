import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {TokenService} from "../../services/token.service";
import {TokenModel} from "../../models/tokenModel";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-update',
  standalone: true,
    imports: [
        MatButton,
        NgxSpinnerModule,
        RouterLink
    ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {

  constructor(private tokenService: TokenService, private spinner: NgxSpinnerService) {
  }

  /**
   * access the authorized endpoint and request recalculation
   * TODO: if server sends 401 token expired response. Refresh the token
   */
  public recalculate() {
    const token = localStorage.getItem('token') ?? "";
    this.spinner.show().then();
    this.tokenService.calculateTokenSupply(token)
      .subscribe((token: TokenModel) => {
        this.spinner.hide().then();
      });
  }
}
