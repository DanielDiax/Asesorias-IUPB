import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { IDatosUsuarioModel } from 'src/app/interfaces/generalInterfaces';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './home-docente.component.html',
  styleUrls: ['./home-docente.component.css'],
  providers: [MessageService],
})
export class homeDocenteComponent implements OnInit {
  nombreDocente = '';
  datosDocente: IDatosUsuarioModel;
  usuarioLogueado: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
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
          detail:
            'Acceso concedido para el docente: ' +
            this.datosDocente.nombre +
            ' ' +
            this.datosDocente.apellido,
        });
        this.nombreDocente =
          this.datosDocente.nombre +
          ' ' +
          this.datosDocente.segNombre +
          ' ' +
          this.datosDocente.apellido +
          ' ' +
          this.datosDocente.segApellido;
      } else {
        location.href = 'estudiantes/home';
      }
    }
  }
}
