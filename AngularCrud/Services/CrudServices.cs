using System.Data;

using AngularCrud.Dapper.Interfaces;
using AngularCrud.Models.Set;
using AngularCrud.Models.View;

using Dapper;

namespace AngularCrud.Services
{
    public class CrudServices
    {
        private IDapperLocalServer _localServer;

        public CrudServices(IDapperLocalServer  localServer)
        {
            _localServer = localServer;
        }

        /// <summary>
        /// Valida si el correo existe y que usuario es y si la contraseña coincide devuelve el usuario
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns>Debuelve un objeto que contiene la información del usuario</returns>
        public List<DatosUsuarioModelView> Login(string username, string password)
        {

            var parameter = new DynamicParameters();

            parameter.Add("@Accion", "ConsultarUsuario");
            parameter.Add("@CorreoElectronico", username);
            parameter.Add("@Contrasena", password);

            var response = _localServer.GetAll<DatosUsuarioModelView>($"Sp_AsesoriasPascualBravo", parameter, commandType: CommandType.StoredProcedure);

            return response;
        }

        /// <summary>
        /// Registra a un usuario nuevo
        /// </summary>
        /// <param name="setDatos"></param>
        /// <returns></returns>
        public int RegistrarUsuario(SetDatosUsuarioModel setDatos)
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Accion", "GuardarPersona");
            parameter.Add("@Nombre", setDatos.Nombre);
            parameter.Add("@SegNombre", setDatos.SegNombre);
            parameter.Add("@Apellido", setDatos.Apellido);
            parameter.Add("@SegApellido", setDatos.SegApellido);
            parameter.Add("@Edad", setDatos.Edad);
            parameter.Add("@DNI", setDatos.Dni);
            parameter.Add("@CorreoElectronico", setDatos.CorreoElectronico);
            parameter.Add("@Contrasena", setDatos.Contrasena);
            parameter.Add("@Perfil", setDatos.Perfil);

            var response = _localServer.Get<int>($"Sp_AsesoriasPascualBravo", parameter, commandType: CommandType.StoredProcedure);

            return response;
        }

        public List<AsesoriasDisponiblesModelView> AsesoriasDisponibles()
        {
            var parameter = new DynamicParameters();

            parameter.Add("@Accion", "AsesoriasDisponibles");
            var response = _localServer.GetAll<AsesoriasDisponiblesModelView>($"Sp_AsesoriasPascualBravo", parameter, commandType: CommandType.StoredProcedure);

            return response;
        }

        /// <summary>
        /// Con este servicio guardamos la nueva cita del estudiante
        /// </summary>
        /// <param name="idAsesoria"></param>
        /// <param name="idEstudiante"></param>
        /// <returns></returns>
        public string CrearCita(int idAsesoria,int idEstudiante)
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Accion", "CrearCita");
            parameter.Add("@IdAsesoria", idAsesoria);
            parameter.Add("@IdEstudiante", idEstudiante);

            var response = _localServer.Get<string>($"Sp_AsesoriasPascualBravo", parameter, commandType: CommandType.StoredProcedure);

            return response;
        }
    }
}
