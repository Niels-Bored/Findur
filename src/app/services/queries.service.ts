import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IState } from '../models/state';
import { IGenericResponse } from '../models/generic-response';


@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  apiUrl:string = "25.72.113.58:5000"

  constructor(protected httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient
      .get<IState[]>(
       `${this.apiUrl}/estados/`
      )
  }
}
