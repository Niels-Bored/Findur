import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IPet } from '../models/pet';
import { IGenericResponse } from '../models/generic-response';
import { IInsertResponse } from '../models/insert-response';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  apiUrl:string = API_URL

  constructor(protected httpClient: HttpClient) { }

  getPets(){
    return this.httpClient
      .get<IPet[]>(
       `${this.apiUrl}/mascotas/`
      )
  }

  getPetByID(id:string){
    return this.httpClient
      .get<IPet>(
       `${this.apiUrl}/mascota/`+id
      )
  }

  createPet(request: IPet) {
    return this.httpClient
      .put<IInsertResponse>(
       `${this.apiUrl}/mascota/`,
       request
      )
  }

  updatePet(request: IPet) {
    return this.httpClient
      .post<IGenericResponse>(
       `${this.apiUrl}/mascota/`,
       request
      )
  }

  deletePet(id:string) {
    return this.httpClient
      .delete<IGenericResponse>(
       `${this.apiUrl}/mascota/`+id
      )
  }
}
