import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IDatosUsuarioModel } from 'src/app/interfaces/generalInterfaces';
import { GeneralService } from 'src/app/services/general.service';
import { LocalStorageService } from '../../../services/localStorage.service';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  title = 'app';
  userEmail: string = '';
  passWord: string = '';

  //Booleanos
  viewEmailSmallText: boolean = false;
  viewPassWordSmallText: boolean = false;

  //Interfaces
  datosUsuarios: IDatosUsuarioModel[] = [];

  constructor(
    private messageService: MessageService,
    private generalServices: GeneralService,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    try {
      let datos = this.localStorageService.getLocalStorage();

      if (datos.perfil == 1) {
        location.href = 'estudiantes/home';
      } else if (datos.perfil == 0) {
        location.href = 'docentes/home';
      }
    } catch (error) {
      console.error(new Error(error));
    }
  }

  login() {
    this.userEmail == '' ? (this.viewEmailSmallText = true) : false;
    this.passWord == '' ? (this.viewPassWordSmallText = true) : false;
    if (this.userEmail == '' || this.passWord == '') {
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'Debes escribir usuario y contraseña',
      });
    } else {
      this.generalServices
        .login(this.userEmail, this.passWord)
        .subscribe((response) => {
          console.log(response, 'Datos de usuario'); //Por eliminar

          if (response[0].idRows != 0) {
            this.datosUsuarios = response;
            this.messageService.add({
              severity: 'success',
              summary: '!Acceso concedido¡',
              detail: 'Usuario y contraseña coinciden',
            });

            this.localStorageService.setLocalStorage(
              response[0].idRows,
              response[0].nombre,
              response[0].segNombre,
              response[0].apellido,
              response[0].segApellido,
              response[0].dni,
              response[0].correoElectronico,
              response[0].perfil
            );

            setTimeout(() => {
              if ((response[0].perfil = 1)) {
                location.href = 'estudiantes/home';
              } else {
                location.href = '';
              }
            }, 500);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: '!Espera¡',
              detail: 'Usuario o contraseña errados',
            });
          }
        });
    }
  }

  redireccionar() {
    location.href = '/registro';
  }
}
