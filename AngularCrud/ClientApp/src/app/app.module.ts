//Render
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/general/login/login.component';
import { HomeEstudiantesComponent } from './components/estudiantes/home/home-estudiantes.component';
import { SideBarComponent } from './components/general/sideBar/sidebar.component';

//Prime Ng

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { RegistroComponent } from './components/general/registro/registro.component';
import { CommonModule } from '@angular/common';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { AgendamientosComponent } from './components/estudiantes/agendamientos/agendamientos.component';
import { MisCitasComponent } from './components/estudiantes/misCitas/mis-citas.component';
import { homeDocenteComponent } from './components/docentes/home/home-docente.component';
import { AsignaturasComponent } from './components/docentes/asignaturas/asignaturas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeEstudiantesComponent,
    SideBarComponent,
    AgendamientosComponent,
    MisCitasComponent,
    homeDocenteComponent,
    AsignaturasComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    ToastModule,
    ToggleButtonModule,
    PasswordModule,
    TableModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: '', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'estudiantes/home', component: HomeEstudiantesComponent },
      { path: 'estudiantes/agendamientos', component: AgendamientosComponent },
      { path: 'estudiantes/mis-citas', component: MisCitasComponent },
      { path: 'docentes/home', component: homeDocenteComponent },
      { path: 'docentes/asignatura', component: AsignaturasComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
