import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) {}

  // getAssets(): Observable<any> {
  //  return this.httpClient.get(`${environment.api}/selection`)
  // }

  // getSearchAssets(){
  //   this.httpClient.get(`${environment.api}/names`).subscribe((data) => {
  //     console.warn('names', data)
  //     return data
  //   })
  // }

}