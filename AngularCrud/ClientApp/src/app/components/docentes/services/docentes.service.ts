import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAsignaturas } from '../interfaces/docentesInterfaces';

@Injectable({
  providedIn: 'root',
})
export class DocentesService {
  constructor(private http: HttpClient) {}

  guardarAsignatura(
    perfil: number,
    asignatura: string,
    idAsignatura: number
  ): Observable<string> {
    return this.http.get<string>(
      environment.url +
        'Crud/GuardarAsignatura/' +
        perfil +
        '/' +
        asignatura +
        '/' +
        idAsignatura,
      { responseType: 'text' as 'json' }
    );
  }

  consultarAsignaturas(): Observable<IAsignaturas[]> {
    return this.http.get<IAsignaturas[]>(
      environment.url + 'Crud/ConsultarAsignaturas/'
    );
  }

  eliminarAsignatura(idAsignatura: number): Observable<string> {
    return this.http.get<string>(
      environment.url + 'Crud/EliminarAsignatura/' + idAsignatura,
      {
        responseType: 'text' as 'json',
      }
    );
  }
}
