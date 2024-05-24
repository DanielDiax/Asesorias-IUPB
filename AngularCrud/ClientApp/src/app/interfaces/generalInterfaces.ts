export interface IDatosUsuarioModel {
  idRows?: number;
  nombre: string;
  segNombre: string;
  apellido: string;
  segApellido: string;
  edad: number;
  dni: string;
  correoElectronico: string;
  contrasena?: string;
  activo?: boolean;
  perfil: number;
}
