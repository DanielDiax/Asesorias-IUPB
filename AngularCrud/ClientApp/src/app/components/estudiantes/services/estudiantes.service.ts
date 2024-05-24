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
}
