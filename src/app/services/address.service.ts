import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IAddress } from '../models/address';
import { IGenericResponse } from '../models/generic-response';
import { IInsertResponse } from '../models/insert-response';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  apiUrl:string = API_URL

  constructor(protected httpClient: HttpClient) { }

  getAddressByID(id:string){
    return this.httpClient
      .get<IAddress>(
       `${this.apiUrl}/direccion/`+id
      )
  }

  createAdress(request: IAddress) {
    return this.httpClient
      .put<IInsertResponse>(
       `${this.apiUrl}/direccion/`,
       request
      )
  }

  updateAddress(request: IAddress) {
    return this.httpClient
      .post<IGenericResponse>(
       `${this.apiUrl}/direccion/`,
       request
      )
  }

  deleteUser(id:string) {
    return this.httpClient
      .delete<IGenericResponse>(
       `${this.apiUrl}/direccion/`+id
      )
  }

}
