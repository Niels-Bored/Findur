import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IMail } from '../models/mail';
import { IGenericResponse } from '../models/generic-response';
import { API_URL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {

  apiUrl:string = API_URL

  constructor(protected httpClient: HttpClient) { }

  sendMail(request: IMail) {
    return this.httpClient
      .post<IGenericResponse>(
       `${this.apiUrl}/sendmail/`,
       request
      )
  }
}
