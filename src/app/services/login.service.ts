import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginModel} from "../models/login.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:8081/api'; // should be in env files. simplified here
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': '*/*' })
  };
  constructor(private httpService: HttpClient) { }

  /**
   * make the login call to server
   * @param loginModel
   */
  public login(loginModel: LoginModel): Observable<{token: string}> {
    return this.httpService.post<{token: string}>(this.apiUrl + '/login', loginModel, this.httpOptions);
  }
}
