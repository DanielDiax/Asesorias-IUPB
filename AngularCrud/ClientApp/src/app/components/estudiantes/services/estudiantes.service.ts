import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAsesoriasDisponibles } from '../interfaces/interfaces-estudiantes';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  constructor(private http: HttpClient) {}

  asesoriasDisponibles() {
    return this.http.get<IAsesoriasDisponibles[]>(
      environment.url + 'Crud/AsesoriasDisponibles/'
    );
  }

  crearCita(idAsesoria: number, idEstudiante: number) {
    return this.http.get<string>(
      environment.url + 'Crud/CrearCita/' + idAsesoria + '/' + idEstudiante,
      { responseType: 'text' as 'json' }
    );
  }
}
