namespace AngularCrud.Models.Set
{
    public class SetDatosUsuarioModel
    {
        public int? IdRows { get; set; }
        public string Nombre { get; set; }
        public string? SegNombre { get; set; }
        public string Apellido { get; set; }
        public string? SegApellido { get; set; }
        public int Edad { get; set; }
        public string Dni { get; set; }
        public string CorreoElectronico { get; set; }
        public string Contrasena { get; set; }
        public bool Activo { get; set; }
        public bool Perfil { get; set; }
    }
}
