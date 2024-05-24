import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IDatosUsuarioModel } from 'src/app/interfaces/generalInterfaces';
import { GeneralService } from 'src/app/services/general.service';
import { LocalStorageService } from '../../../services/localStorage.service';

@Component({
  selector: 'registro-app',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [MessageService],
})
export class RegistroComponent {
  //Booleanos
  verErrorNombre: boolean = false;
  verErrorApellido: boolean = false;
  verErrorEdad: boolean = false;
  verErrorDni: boolean = false;
  verErrorEmail: boolean = false;
  verErrorValidadorEmail: boolean = false;
  verErrorContrasena: boolean = false;
  verErrorValidadorContrasena: boolean = false;

  validadorCorreo: boolean = false;
  validadorContrasena: boolean = false;

  registroForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private generalService: GeneralService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      segNombre: [''],
      apellido: ['', [Validators.required]],
      segApellido: [''],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      validarEmail: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      validarContrasena: ['', [Validators.required]],
      perfil: [true],
    });
  }

  //#region Funciones de guardado de usuarios
  validarCampos(): boolean {
    let validadorCorreo = this.validarCoincidenciaCorreo();
    let validadorContrasena = this.validarCoincidenciaContrasena();

    if (this.registroForm.get('nombre')?.value == '') {
      this.verErrorNombre = true;
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'Debes agregar tu nombre',
      });
      return true;
    }
    if (this.registroForm.get('apellido')?.value == '') {
      this.verErrorApellido = true;
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'Debes agregar tu apellido',
      });
      return true;
    }
    if (this.registroForm.get('dni')?.value == '') {
      this.verErrorDni = true;
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'Debes agregar tu dni',
      });
      return true;
    }
    if (this.registroForm.get('edad')?.value == '') {
      this.verErrorEdad = true;
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'Debes agregar tu edad',
      });
      return true;
    }
    if (this.registroForm.get('email')?.value == '') {
      this.verErrorEmail = true;
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'Debes agregar tu correo electronico',
      });
      return true;
    }
    if (this.registroForm.get('validarEmail')?.value == '') {
      this.verErrorValidadorEmail = true;
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'Debes validar tu correo electrónico primero',
      });
      return true;
    }
    if (this.registroForm.get('contrasena')?.value == '') {
      this.verErrorContrasena = true;
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'Debes agregar tu contraseña',
      });
      return true;
    }
    if (this.registroForm.get('validarContrasena')?.value == '') {
      this.verErrorValidadorContrasena = true;
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'Debes agregar tu contraseña',
      });
      return true;
    }
    if (validadorContrasena == false || validadorCorreo == false) {
      return true;
    } else {
      return false;
    }
  }

  validarCoincidenciaCorreo(): boolean {
    if (
      this.registroForm.get('email')?.value !=
      this.registroForm.get('validarEmail')?.value
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'El correo no coincide',
      });
      return false;
    } else {
      return true;
    }
  }

  validarCoincidenciaContrasena(): boolean {
    if (
      this.registroForm.get('contrasena')?.value !=
      this.registroForm.get('validarContrasena')?.value
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '!Espera¡',
        detail: 'Las contraseñas no coinciden',
      });
      return false;
    } else {
      return true;
    }
  }

  registrarUsuario() {
    let validadorCampos = this.validarCampos();

    if (validadorCampos == false) {
      try {
        let body: IDatosUsuarioModel = {
          idRows: 0,
          nombre: this.registroForm.get('nombre')?.value,
          segNombre: this.registroForm.get('segNombre')?.value,
          apellido: this.registroForm.get('apellido')?.value,
          segApellido: this.registroForm.get('segApellido')?.value,
          edad: parseInt(this.registroForm.get('edad')?.value),
          dni: this.registroForm.get('dni')?.value,
          correoElectronico: this.registroForm.get('email')?.value,
          contrasena: this.registroForm.get('contrasena')?.value,
          activo: true,
          perfil: this.registroForm.get('perfil')?.value,
        };

        this.generalService
          .registrarUsuario(body)
          .subscribe((response: number) => {
            if (response == 0) {
              this.messageService.add({
                severity: 'success',
                summary: '!Muy Bien¡',
                detail:
                  'El registro del profesor se ha completado correctamente',
              });
            } else if (response == 1) {
              this.messageService.add({
                severity: 'success',
                summary: '!Muy Bien¡',
                detail:
                  'El registro del estudiante se ha completado correctamente',
              });
            } else {
              this.messageService.add({
                severity: 'warn',
                summary: '!Espera¡',
                detail: 'Este correo electronico ya existe',
              });
            }
          });
        console.log(body);
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: '!Ups¡',
          detail: 'un Error ha ocurrido a la hora de guardar los datos' + error,
        });
      } finally {
        setTimeout(() => {
          this.registroForm.reset();
        }, 500);
      }
    }
  }
  //#endregion

  redireccionar() {
    location.href = '/login';
  }

  guardarNuevoUsuario() {}
}
