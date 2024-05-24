# Asesorias IUPB

## Descripción

**Asesorias IUPB** es una aplicación web de prueba desarrollada para gestionar asesorías académicas en la Universidad Pascual Bravo. La aplicación está construida con .NET Core en el backend y Angular en el frontend, permitiendo a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las asesorías.

## Características

- **Gestión de Asesorías**: Permite crear, leer, actualizar y eliminar asesorías.
- **Interfaz de Usuario Intuitiva**: Utiliza Angular para proporcionar una experiencia de usuario fluida y receptiva.
- **Autenticación y Autorización**: Implementa mecanismos de autenticación y autorización.
- **API RESTful**: Proporciona una API RESTful para interactuar con la base de datos.
- **ORM Ligero con Dapper**: Utiliza Dapper para el acceso eficiente a la base de datos.

## Requisitos

- .NET Core SDK 7.0 o superior
- Node.js 18.x o superior
- Angular CLI
- SQL Server

## Instalación

## Clonar el Repositorio

```sh
git clone https://github.com/DanielDiax/Asesorias-IUPB.git
cd Asesorias-IUPB
```

## Configuración del Backend

- **Navega al directorio del proyecto .NET:** cd AngularCrud
- **Restaura las dependencias de NuGet:** dotnet restore
- **Configura la cadena de conexión a tu base de datos en appsettings.json:**

```sh
{
  "ConnectionStrings": {
    "LocalServer": "Data Source=TU_SERVIDOR;Initial Catalog=UIPascualBravo;Integrated Security=True;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
  "AllowedHosts": "*"
}

```

- **Inicia el proyecto desde visual studio 2022**

## Configuración del Frontend

- **Navega al directorio del frontend Angular:** cd ClientApp
- **Instala las dependencias de npm:** npm install o puedes haceerlo con npm i
- **Inicia la aplicación frontend:** ng serve -o, o puedes utilizar ng s -o

## Uso de la App

- **Abre tu navegador y navega a http://localhost:4200 para ver la aplicación en acción. El backend de la aplicación estará disponible en la dirección http://localhost:5196/

## Estructura del Proyecto

- AngularCrud/: Contiene el proyecto .NET Core
- AngularCrud/ClientApp/: Contiene el proyecto Angular
- AngularCrud/Controllers/: Contiene los controladores de la API
- AngularCrud/Models/: Contiene los modelos de datos
- AngularCrud/Services/: Contiene los servicios para el acceso a datos usando Dapper

  ## Contribución
  
  1. Haz un fork del proyecto.
  2. Crea una rama para tu nueva característica (git checkout -b feature/nueva-caracteristica).
  3. Realiza tus cambios y haz commit (git commit -am 'Agregar nueva característica').
  4. Envía tus cambios al repositorio remoto (git push origin feature/nueva-caracteristica).
  5. Abre un Pull Request.

## Contacto
- **Autor:** Daniel Diaz
- **Email:** jdanieldiax@gmail.com || jose.diaz773@pascualbravo.edu.co
- **GitHub:** DanielDiax
