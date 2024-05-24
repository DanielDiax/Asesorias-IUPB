import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { IDatosUsuarioModel } from 'src/app/interfaces/generalInterfaces';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { DocentesService } from '../services/docentes.service';
import { IAsignaturas } from '../interfaces/docentesInterfaces';

@Component({
  selector: 'app-root',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css'],
  providers: [MessageService],
})
export class AsignaturasComponent implements OnInit {
  //Variables generales
  nombreDocente: string = '';
  asignatura: string = '';
  idRowAsignatura: number = 0;

  //Interfaces
  datosDocente: IDatosUsuarioModel;
  asignaturas: IAsignaturas[] = [];
  asignaturaSeleccionada: IAsignaturas;

  //Booleanos
  usuarioLogueado: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private messageService: MessageService,
    private docentesServices: DocentesService
  ) {}

  ngOnInit(): void {
    try {
      this.datosDocente = this.localStorageService.getLocalStorage();

      if (this.datosDocente === undefined || this.datosDocente === null) {
        this.messageService.add({
          severity: 'error',
          summary: '¡Espera!',
          detail: 'No tienes acceso a esta página',
        });
        setTimeout(() => {
          location.href = 'login';
        }, 1500);
      } else {
        if (this.datosDocente.perfil == 0) {
          this.messageService.add({
            severity: 'success',
            summary: '¡Bienvenido!',
            detail: 'Acceso concedido para el docente',
          });
        } else {
          location.href = 'estudiantes/home';
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.consultarAsignaturas();
    }
  }

  async consultarAsignaturas() {
    try {
      const response = await firstValueFrom(
        this.docentesServices.consultarAsignaturas()
      );
      this.asignaturas = response;
    } catch (error) {
      console.error(new Error(error));
    }
  }

  filaSeleccionada() {
    console.log(this.asignaturaSeleccionada);
    this.asignatura = this.asignaturaSeleccionada.asignatura;
    this.idRowAsignatura = this.asignaturaSeleccionada.idRows;
  }

  preguntarEliminacion(idAsignatura) {
    this.idRowAsignatura = idAsignatura;
    this.messageService.add({
      key: 'p',
      severity: 'warn',
      summary: '¡Elimanar!',
      detail: 'Esta a punto de eliminar esta asignatura, ¿Esta seguro?',
      life: 20000,
    });
  }

  async guardarAsignatura() {
    try {
      if (this.asignatura == '') {
        this.messageService.add({
          severity: 'warn',
          summary: '¡Espera!',
          detail: 'Debe escribir el nombre de la asignatura',
        });
      } else {
        const response = await firstValueFrom(
          this.docentesServices.guardarAsignatura(
            this.datosDocente.perfil,
            this.asignatura,
            this.idRowAsignatura
          )
        );
        this.messageService.add({
          severity: 'success',
          summary: '¡Muy bien!',
          detail: response,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        this.reset();
        this.consultarAsignaturas();
      }, 200);
    }
  }

  async eliminarAsignatura(opcion) {
    try {
      this.messageService.clear();
      if (opcion == 1) {
        const response = await firstValueFrom(
          this.docentesServices.eliminarAsignatura(this.idRowAsignatura)
        );
        this.messageService.add({
          severity: 'success',
          summary: '¡eliminado!',
          detail: response,
        });
      } else {
        this.messageService.add({
          severity: 'info',
          summary: '¡Sin cambios!',
          detail: 'No eliminaremos la asignatura',
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        this.reset();
        this.consultarAsignaturas();
      }, 200);
    }
  }

  reset() {
    this.asignatura = '';
    this.idRowAsignatura = 0;
  }
}
