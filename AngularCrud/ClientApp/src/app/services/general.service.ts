import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDatosUsuarioModel } from '../interfaces/generalInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  login(userEmail: string, password: string) {
    return this.http.get<IDatosUsuarioModel[]>(
      environment.url + 'Crud/Login/' + userEmail + '/' + password
    );
  }

  registrarUsuario(body: IDatosUsuarioModel): Observable<number> {
    return this.http.post<number>(
      environment.url + 'Crud/RegistrarUsuario/',
      body
    );
  }
}
