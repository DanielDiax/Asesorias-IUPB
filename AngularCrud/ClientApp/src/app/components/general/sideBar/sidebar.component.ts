import { Component, OnInit, Renderer2 } from '@angular/core';
import { IDatosUsuarioModel } from 'src/app/interfaces/generalInterfaces';
import { LocalStorageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SideBarComponent implements OnInit {
  datosUsuario: IDatosUsuarioModel;

  //booleanos
  perfilEstudiante: boolean = false;
  perfilDocente: boolean = false;

  constructor(
    private renderer: Renderer2,
    private localStorageServices: LocalStorageService
  ) {}

  ngOnInit(): void {
    try {
      this.loadScript('assets/javascript/javascript.js');

      this.datosUsuario = this.localStorageServices.getLocalStorage();
      console.log(this.datosUsuario);
    } catch (error) {
      console.error(new Error(error));
    } finally {
      setTimeout(() => {
        this.validarPerfil();
      }, 500);
    }
  }

  loadScript(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      console.log(`Script ${src} loaded successfully.`);
    };
    script.onerror = () => {
      console.error(`Error loading script ${src}.`);
    };
    this.renderer.appendChild(document.body, script);
  }

  validarPerfil() {
    if (this.datosUsuario.perfil == 1) {
      this.perfilEstudiante = true;
      this.perfilDocente = false;
    } else {
      this.perfilEstudiante = false;
      this.perfilDocente = true;
    }
  }

  logout() {
    localStorage.clear();
    setTimeout(() => {
      location.href = '';
    }, 500);
  }
}
