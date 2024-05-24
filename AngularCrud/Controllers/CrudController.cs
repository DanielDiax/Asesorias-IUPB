﻿using AngularCrud.Dapper.Interfaces;
using AngularCrud.Models.Set;
using AngularCrud.Services;

using Microsoft.AspNetCore.Mvc;

using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AngularCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CrudController : Controller
    {
        private readonly IDapperLocalServer dapperLocalServer;
        private CrudServices crudServices;


        public CrudController(IDapperLocalServer _dapperLocalServer)
        {
            dapperLocalServer = _dapperLocalServer;
            crudServices = new CrudServices(_dapperLocalServer);
        }

        [HttpGet("[action]/{userEmail}/{password}")]
        public IActionResult Login(string userEmail, string password)
        {
            try
            {
                var response = crudServices.Login(userEmail, password);
                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("[action]")]
        public IActionResult RegistrarUsuario([FromBody] SetDatosUsuarioModel setDatos)
        {
            try
            {
                var response = crudServices.RegistrarUsuario(setDatos);
                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("[action]")]
        public IActionResult AsesoriasDisponibles()
        {
            try
            {
                var response = crudServices.AsesoriasDisponibles();
                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("[action]/{idAsesoria}/{idEstudiante}")]
        public IActionResult CrearCita(int idAsesoria, int idEstudiante)
        {
            try
            { 
                var response = crudServices.CrearCita(idAsesoria, idEstudiante);
                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("[action]/{idEstudiante}")]
        public IActionResult ConsultarCitas(int idEstudiante)
        {
            try
            {
                var response = crudServices.ConsultarCitas(idEstudiante);
                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("[action]/{idCita}")]
        public IActionResult EliminarCita(int idCita)
        {
            try
            {
                var response = crudServices.EliminarCita(idCita);
                return Ok(response);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
