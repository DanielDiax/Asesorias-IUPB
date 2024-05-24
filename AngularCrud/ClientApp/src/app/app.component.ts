import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/localStorage.service';
import { firstValueFrom } from 'rxjs';
import { IDatosUsuarioModel } from './interfaces/generalInterfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';
  userData: IDatosUsuarioModel;
  usuarioLogueado: boolean = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.consultarData();
  }

  async consultarData() {
    try {
      this.userData = await this.localStorageService.getLocalStorage();
      console.log(this.userData, 'Data en AppComponent');

      if (this.userData) {
        this.usuarioLogueado = true;
      } else {
        this.usuarioLogueado = false;
      }
    } catch (error) {
      console.error(new Error(error));
    }
  }
}
