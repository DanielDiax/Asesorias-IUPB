import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { firstValueFrom } from 'rxjs';
import { IDatosUsuarioModel } from 'src/app/interfaces/generalInterfaces';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { EstudiantesService } from '../services/estudiantes.service';
import { IDatosCitasEstudianteModel } from '../interfaces/interfaces-estudiantes';

@Component({
  selector: 'mis-citas-root',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css'],
  providers: [MessageService],
})
export class MisCitasComponent implements OnInit {
  //Variables
  nombreEstudiante: string = '';
  idCitaSeleccionada: number = 0;
  datosEstudiante: IDatosUsuarioModel;
  datosCitas: IDatosCitasEstudianteModel[] = [];
  //Booleanos
  usuarioLogueado: boolean = false;
  verTablaCitas: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private estudiantesService: EstudiantesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.datosEstudiante = this.localStorageService.getLocalStorage();

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
        this.consultarCitas();
      } else {
        location.href = '';
      }
    }
  }

  async consultarCitas() {
    try {
      this.datosCitas = [];
      const response = await firstValueFrom(
        this.estudiantesService.consultarCitas(this.datosEstudiante.idRows)
      );
      if (response.length > 0) {
        this.datosCitas = response;
        console.log(this.datosCitas);
      } else {
        this.messageService.add({
          severity: 'info',
          summary: '¡Sin citas!',
          detail: 'No tienes ninguna cita asignada por el momento',
        });
      }
    } catch (error) {
      console.error(new Error(error));
    }
  }

  preguntarEliminacion(idCita) {
    this.idCitaSeleccionada = idCita;
    this.messageService.add({
      key: 'p',
      severity: 'warn',
      summary: '¡Elimanar!',
      detail: 'Esta a punto de eliminar su cita, ¿Esta seguro?',
      life: 20000,
    });
  }

  async eliminarCita(opcion: number) {
    try {
      this.messageService.clear();
      if (opcion == 1) {
        const respoonse = await firstValueFrom(
          this.estudiantesService.eliminarCita(this.idCitaSeleccionada)
        );
        if (respoonse == 'Se ha eliminado la cita') {
          this.messageService.add({
            severity: 'info',
            summary: '¡Cita Eliminada!',
            detail: respoonse,
          });
        }
      } else {
        this.messageService.add({
          severity: 'info',
          summary: '¡Vale!',
          detail: 'No eliminaremos la cita',
        });
      }
    } catch (error) {
      console.error(new Error(error));
    } finally {
      setTimeout(() => {
        this.consultarCitas();
      }, 200);
    }
  }
}
