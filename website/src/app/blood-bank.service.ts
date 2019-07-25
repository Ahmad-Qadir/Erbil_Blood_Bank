import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBloodBank } from './blood';
import { Ipatient } from './patient';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodBankService {

  private _url: string = "http://192.168.100.107:3000";

  constructor(private http: HttpClient) { }


  getUsers(): Observable<IBloodBank[]> {
    return this.http.get<IBloodBank[]>(this._url + "/donor/shows");


  }
  getPatient(): Observable<Ipatient[]> {
    return this.http.get<Ipatient[]>(this._url + "/patient/shows");


  }

  deletePatient(_id): Observable<Ipatient[]>{
    return this.http.get<Ipatient[]>(this._url+"/patient/delete/"+_id);
  
    
  }
}
