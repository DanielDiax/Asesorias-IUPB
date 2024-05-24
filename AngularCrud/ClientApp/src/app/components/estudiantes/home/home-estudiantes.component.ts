import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from '../../../services/localStorage.service';
import { IDatosUsuarioModel } from 'src/app/interfaces/generalInterfaces';
import { EstudiantesService } from '../services/estudiantes.service';
import { IAsesoriasDisponibles } from '../interfaces/interfaces-estudiantes';

@Component({
  selector: 'home-estudiantes-root',
  templateUrl: './home-estudiantes.component.html',
  styleUrls: ['./home-estudiantes.component.css'],
  providers: [MessageService],
})
export class HomeEstudiantesComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private serviciosEstuduante: EstudiantesService,
    private messageService: MessageService
  ) {}

  //Variables
  nombreEstudiante: string;

  datosEstudiante: IDatosUsuarioModel;
  datosAsesorias: IAsesoriasDisponibles[] = [];

  //Booleanos
  verTablaAsesorias: boolean = false;

  ngOnInit(): void {
    this.datosEstudiante = this.localStorageService.getLocalStorage();
    console.log(this.datosEstudiante, 'Datos Estudiante');

    if (this.datosEstudiante === undefined || this.datosEstudiante === null) {
      this.messageService.add({
        severity: 'error',
        summary: '¡Espera!',
        detail: 'No tienes acceso a esta página',
      });

      setTimeout(() => {
        location.href = 'login';
      }, 1500);
    } else {
      if (this.datosEstudiante.perfil == 1) {
        this.messageService.add({
          severity: 'success',
          summary: '¡Bienvenido!',
          detail:
            'Acceso concedido para el estudiante: ' +
            this.datosEstudiante.nombre +
            ' ' +
            this.datosEstudiante.apellido,
        });
        this.nombreEstudiante =
          this.datosEstudiante.nombre +
          ' ' +
          this.datosEstudiante.segNombre +
          ' ' +
          this.datosEstudiante.apellido +
          ' ' +
          this.datosEstudiante.segApellido;
        this.asesoriasDisponibles();
      } else {
        location.href = '';
      }
    }
  }

  async asesoriasDisponibles() {
    try {
      const respuesta: IAsesoriasDisponibles[] = await this.serviciosEstuduante
        .asesoriasDisponibles()
        .toPromise();
      console.log(respuesta);

      if (respuesta.length > 0) {
        this.datosAsesorias = respuesta;
        this.verTablaAsesorias = true;
      }
    } catch (error) {
      console.error(new Error(error));
    }
  }
}
