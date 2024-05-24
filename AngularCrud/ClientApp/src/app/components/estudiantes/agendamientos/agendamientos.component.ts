import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from '../../../services/localStorage.service';
import { IDatosUsuarioModel } from 'src/app/interfaces/generalInterfaces';
import { EstudiantesService } from '../services/estudiantes.service';
import { IAsesoriasDisponibles } from '../interfaces/interfaces-estudiantes';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'agendamientos-root',
  templateUrl: './agendamientos.component.html',
  styleUrls: ['./agendamientos.component.css'],
  providers: [MessageService],
})
export class AgendamientosComponent implements OnInit {
  //Variables
  nombreEstudiante: string;

  datosEstudiante: IDatosUsuarioModel;
  datosAsesorias: IAsesoriasDisponibles[] = [];
  asesoriaSeleccionada: IAsesoriasDisponibles;

  //Booleanos
  verTablaAsesorias: boolean = false;
  verBotonCrearCita: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private estudiantesService: EstudiantesService,
    private messageService: MessageService
  ) {}

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
        this.consultarAsesoriasDisponibles();
      } else {
        location.href = '';
      }
    }
  }

  async consultarAsesoriasDisponibles() {
    try {
      const respuesta: IAsesoriasDisponibles[] = await firstValueFrom(
        this.estudiantesService.asesoriasDisponibles()
      );

      if (respuesta.length > 0) {
        this.datosAsesorias = respuesta;
        this.verTablaAsesorias = true;
      }
    } catch (error) {
      console.error(new Error(error));
    }
  }

  filaSeleccionada() {
    this.verBotonCrearCita = true;
  }

  async crearCita() {
    try {
      let idAsesoria: number = this.asesoriaSeleccionada.idAsesoria;
      let idEstudiante: number = this.datosEstudiante.idRows;
      const response = await firstValueFrom(
        this.estudiantesService.crearCita(idAsesoria, idEstudiante)
      );
      if (response == 'Se ha agendado la cita') {
        this.messageService.add({
          severity: 'success',
          summary: '¡Muy bien!',
          detail: response,
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡Espera!',
          detail: response,
        });
      }
    } catch (error) {
      console.error(new Error(error));
    }
  }
}
