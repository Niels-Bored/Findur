import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IState } from '../models/state';
import { IBreed } from '../models/breed';
import { IStatus } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  apiUrl:string = "25.72.113.58:3000"

  constructor(protected httpClient: HttpClient) { }

  getStates(){
    return this.httpClient
      .get<IState[]>(
       `${this.apiUrl}/estados/`
      )
  }
  getBreeds(){
    return this.httpClient
      .get<IBreed[]>(
       `${this.apiUrl}/razas/`
      )
  }
  getStatus(){
    return this.httpClient
      .get<IStatus[]>(
       `${this.apiUrl}/status/`
      )
  }
}
