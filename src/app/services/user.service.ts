import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ILoginRequest } from '../models/login-request';
import { IUser } from '../models/user';
import { ILoginResponse } from '../models/login-response';
import { IGenericResponse } from '../models/generic-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string = "25.72.113.58:5000"

  constructor(protected httpClient: HttpClient) { }

  login(request: ILoginRequest) {
    return this.httpClient
      .post<ILoginResponse>(
       `${this.apiUrl}/usuario/login/`,
       request
      )
  }

  getUsers(){
    return this.httpClient
      .get<IUser[]>(
       `${this.apiUrl}/usuarios/`
      )
  }

  getUserByID(id:string){
    return this.httpClient
      .get<IUser>(
       `${this.apiUrl}/usuario/`+id
      )
  }

  createUser(request: IUser) {
    return this.httpClient
      .put<IGenericResponse>(
       `${this.apiUrl}/usuario/`,
       request
      )
  }

  updateUser(request: IUser) {
    return this.httpClient
      .post<IGenericResponse>(
       `${this.apiUrl}/usuario/`,
       request
      )
  }

  deleteUser(id:string) {
    return this.httpClient
      .delete<IGenericResponse>(
       `${this.apiUrl}/usuario/`+id
      )
  }

}