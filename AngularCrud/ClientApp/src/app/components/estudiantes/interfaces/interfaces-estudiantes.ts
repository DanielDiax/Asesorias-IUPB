export interface IAsesoriasDisponibles {
  idAsesoria: number;
  fechaAsesoria: Date;
  horaInicio: string;
  horaFin: string;
  nombre: string;
  apellido: string;
  asesoria: string;
}

export interface IDatosCitasEstudianteModel {
  idCita: number;
  fechaAsesoria: Date;
  horaInicio: string;
  horaFin: string;
  nombreDocente: string;
  apellidoDocente: string;
  asignatura: string;
}
