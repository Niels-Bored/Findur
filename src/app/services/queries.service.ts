import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IState } from '../models/state';
import { IBreed } from '../models/breed';
import { IStatus } from '../models/status';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  apiUrl:string = API_URL

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
