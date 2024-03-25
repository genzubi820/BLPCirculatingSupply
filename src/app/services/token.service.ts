import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenModel} from "../models/tokenModel";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = 'https://localhost:8081/api'; // should be in env files. simplified here
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': '*/*' })
  };

  constructor(private httpService: HttpClient) { }

  /**
   * Get token information from server
   * TODO: handle error scenarios. e.g. trying to get info before calculating supply
   */
  public getTokenInfo(): Observable<TokenModel> {
    return this.httpService.get<TokenModel>(this.apiUrl + '/getInfo', this.httpOptions);
  }

  /**
   * request server to calculate the circulating supply of BLP Token
   * @param token
   */
  public calculateTokenSupply(token: string) {
    const headers = {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': '*/*'};
    const options = {
      headers: new HttpHeaders(headers)
    }
    return this.httpService.get<TokenModel>(this.apiUrl + '/calculateSupply', options);
  }
}
