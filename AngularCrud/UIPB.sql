CREATE DATABASE UIPascualBravo
GO
USE UIPascualBravo
GO
/****** Object:  Table [dbo].[tbl_Asesorias]    Script Date: 10/05/2024 7:42:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Asesorias](
	[IdRows] [int] IDENTITY(1,1) NOT NULL,
	[IdRowAsignaturaInt] [int] NOT NULL,
	[HoraInicioAsesoria] [datetime] NOT NULL,
	[HoraFinAsesoria] [datetime] NOT NULL,
	[FechaAsesoria] [datetime] NOT NULL,
	[Tema] [varchar](200) NULL,
 CONSTRAINT [PK_tbl_Asesorias] PRIMARY KEY CLUSTERED 
(
	[IdRows] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Asignaturas]    Script Date: 10/05/2024 7:42:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Asignaturas](
	[IdRows] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](200) NOT NULL,
 CONSTRAINT [PK_blt_Asignaturas] PRIMARY KEY CLUSTERED 
(
	[IdRows] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_AsignaturasIntermedia]    Script Date: 10/05/2024 7:42:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_AsignaturasIntermedia](
	[IdRows] [int] IDENTITY(1,1) NOT NULL,
	[IdRowDocente] [int] NOT NULL,
	[IdRowAsignatura] [int] NOT NULL,
 CONSTRAINT [PK_tbl_AsignaturasIntermedia] PRIMARY KEY CLUSTERED 
(
	[IdRows] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_CitasEstudiantes]    Script Date: 10/05/2024 7:42:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_CitasEstudiantes](
	[IdRow] [int] IDENTITY(1,1) NOT NULL,
	[IdRowEstudiante] [int] NOT NULL,
	[IdAsesoria] [int] NOT NULL,
 CONSTRAINT [PK_tbl_CitasEstudiantes] PRIMARY KEY CLUSTERED 
(
	[IdRow] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Docentes]    Script Date: 10/05/2024 7:42:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Docentes](
	[IdRows] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[SegNombre] [varchar](50) NULL,
	[Apellido] [varchar](50) NOT NULL,
	[SegApellido] [varchar](50) NULL,
	[Edad] [int] NOT NULL,
	[DNI] [varchar](30) NOT NULL,
	[CorreoElectronico] [varchar](200) NOT NULL,
	[Contrasena] [varchar](50) NOT NULL,
	[Activo] [bit] NOT NULL,
	[Perfil] [int] NOT NULL,
 CONSTRAINT [PK_tbl_Docentes] PRIMARY KEY CLUSTERED 
(
	[IdRows] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Estudiantes]    Script Date: 10/05/2024 7:42:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Estudiantes](
	[IdRows] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[SegNombre] [varchar](50) NULL,
	[Apellido] [varchar](50) NOT NULL,
	[SegApellido] [varchar](50) NULL,
	[Edad] [int] NOT NULL,
	[DNI] [varchar](50) NOT NULL,
	[CorreoElectronico] [varchar](200) NOT NULL,
	[Contrasena] [varchar](50) NOT NULL,
	[Activo] [bit] NOT NULL,
	[Perfil] [int] NOT NULL,
 CONSTRAINT [PK_tbl_Estudiantes] PRIMARY KEY CLUSTERED 
(
	[IdRows] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tbl_Docentes] ADD  CONSTRAINT [DF_tbl_Docentes_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[tbl_Estudiantes] ADD  CONSTRAINT [DF_tbl_Estudiantes_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[tbl_Asesorias]  WITH CHECK ADD  CONSTRAINT [FK_tbl_Asesorias_tbl_AsignaturasIntermedia] FOREIGN KEY([IdRowAsignaturaInt])
REFERENCES [dbo].[tbl_AsignaturasIntermedia] ([IdRows])
GO
ALTER TABLE [dbo].[tbl_Asesorias] CHECK CONSTRAINT [FK_tbl_Asesorias_tbl_AsignaturasIntermedia]
GO
ALTER TABLE [dbo].[tbl_AsignaturasIntermedia]  WITH CHECK ADD  CONSTRAINT [FK_tbl_AsignaturasIntermedia_blt_Asignaturas] FOREIGN KEY([IdRowAsignatura])
REFERENCES [dbo].[tbl_Asignaturas] ([IdRows])
GO
ALTER TABLE [dbo].[tbl_AsignaturasIntermedia] CHECK CONSTRAINT [FK_tbl_AsignaturasIntermedia_blt_Asignaturas]
GO
ALTER TABLE [dbo].[tbl_AsignaturasIntermedia]  WITH CHECK ADD  CONSTRAINT [FK_tbl_AsignaturasIntermedia_tbl_Docentes] FOREIGN KEY([IdRowDocente])
REFERENCES [dbo].[tbl_Docentes] ([IdRows])
GO
ALTER TABLE [dbo].[tbl_AsignaturasIntermedia] CHECK CONSTRAINT [FK_tbl_AsignaturasIntermedia_tbl_Docentes]
GO
ALTER TABLE [dbo].[tbl_CitasEstudiantes]  WITH CHECK ADD  CONSTRAINT [FK_tbl_CitasEstudiantes_tbl_Asesorias] FOREIGN KEY([IdAsesoria])
REFERENCES [dbo].[tbl_Asesorias] ([IdRows])
GO
ALTER TABLE [dbo].[tbl_CitasEstudiantes] CHECK CONSTRAINT [FK_tbl_CitasEstudiantes_tbl_Asesorias]
GO
ALTER TABLE [dbo].[tbl_CitasEstudiantes]  WITH CHECK ADD  CONSTRAINT [FK_tbl_CitasEstudiantes_tbl_Estudiantes] FOREIGN KEY([IdRowEstudiante])
REFERENCES [dbo].[tbl_Estudiantes] ([IdRows])
GO
ALTER TABLE [dbo].[tbl_CitasEstudiantes] CHECK CONSTRAINT [FK_tbl_CitasEstudiantes_tbl_Estudiantes]
GO
/****** Object:  StoredProcedure [dbo].[Sp_AsesoriasPascualBravo]    Script Date: 10/05/2024 7:42:37 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Daniel Diaz
-- Create date: 20/03/2023
-- Description:	Contiene los Query para el proyecto de las asesorias en herramientas de programación 1
-- =============================================
CREATE PROCEDURE [dbo].[Sp_AsesoriasPascualBravo] 
	-- Add the parameters for the stored procedure here
	 @Accion varchar(50) = null
	,@IdDocente int = null
	,@IdEstudiante int = null
	,@IdAsesoria int = null
	,@IdCita int = null
	,@IdAsignatura int = null
	,@Perfil int = null
	,@Nombre varchar(50) = null
	,@SegNombre varchar(50) = null
	,@Apellido varchar(50) = null
	,@SegApellido varchar(50) = null
	,@Edad int = null
	,@DNI varchar(25) = null
	,@CorreoElectronico varchar(150) = null
	,@Contrasena varchar(100) = null
	,@IdRowAsignatura int = null
	,@IdRowAsignaturaInt int = null
	,@FechaAsesoria datetime = null
	,@HoraInicial datetime = null
	,@HoraFinal datetime = null
	,@Tema varchar(500) = null
	,@FechaInicial varchar(8) = null
	,@FechaFinal varchar(8) = null
	,@Asignatura varchar(50) = null

AS
BEGIN
	declare @mensaje varchar(50) = ''
	declare @pass varchar(50) = ''
	if(@Accion = 'GuardarPersona')
	begin
		if(@Perfil = 1)
			begin
				insert into tbl_Estudiantes
				(
					 Nombre
					,SegNombre
					,Apellido
					,SegApellido
					,Edad
					,DNI
					,CorreoElectronico
					,Contrasena
					,Activo
					,Perfil
				) Values
				(
					 @Nombre
					,@SegNombre
					,@Apellido
					,@SegApellido
					,@Edad
					,@DNI
					,@CorreoElectronico
					,@Contrasena
					,1
					,@Perfil
				)
			select 1
			end
			
		else
			begin
			insert into tbl_Docentes
				(
					 Nombre
					,SegNombre
					,Apellido
					,SegApellido
					,Edad
					,DNI
					,CorreoElectronico
					,Contrasena
					,Activo
					,Perfil
				) Values
				(
					 @Nombre
					,@SegNombre
					,@Apellido
					,@SegApellido
					,@Edad
					,@DNI
					,@CorreoElectronico
					,@Contrasena
					,1
					,@Perfil
				)
				select 0
			end
	end

	if(@Accion = 'ConsultarUsuario')
		begin
			if exists (select * from tbl_Estudiantes where CorreoElectronico = @CorreoElectronico)
				begin
					set @pass = (select Contrasena from tbl_Estudiantes where CorreoElectronico = @CorreoElectronico)
					if(@pass = @Contrasena)
						begin
							select * from tbl_Estudiantes where CorreoElectronico = @CorreoElectronico
						end
					else
						begin
							set @mensaje = 'La contraseña es incorrecta'
							select @mensaje as 'Mensaje'
						end
				end
			else
				begin
					if exists (select * from tbl_Docentes where CorreoElectronico = @CorreoElectronico)
				begin
					set @pass = (select Contrasena from tbl_Docentes where CorreoElectronico = @CorreoElectronico)
					if(@pass = @Contrasena)
						begin
							select * from tbl_Docentes where CorreoElectronico = @CorreoElectronico
						end
					else
						begin
							set @mensaje = 'La contraseña es incorrecta'
							select @mensaje as 'Mensaje'
						end
				end
			else
				begin
					set @mensaje = 'El usuario no existe'
					select @mensaje as 'Mensaje'
				end
				end
		
		end

		if(@Accion = 'CrearAsesoria')
		begin

			insert into tbl_Asesorias 
			(
			 IdRowAsignaturaInt
			,FechaAsesoria
			,HoraInicioAsesoria
			,HoraFinAsesoria
			,Tema
			)
			values

			(
			 @IdRowAsignaturaInt
			,@FechaAsesoria
			,@HoraInicial
			,@HoraFinal
			,@Tema
			)
			
		end

		if(@Accion = 'AsignaturasPorDocente')
		begin
			select 
				 tbl_AsignaturasIntermedia.IdRows				as IdAsignaturaInt
				,tbl_Docentes.Nombre							as Nombre
				,tbl_Docentes.Apellido							as Apellido
				,tbl_Asignaturas.Nombre							as Asignatura
			from tbl_Docentes 
				inner join tbl_AsignaturasIntermedia on tbl_AsignaturasIntermedia.IdRowDocente = tbl_Docentes.IdRows
				inner join tbl_Asignaturas on tbl_Asignaturas.IdRows = tbl_AsignaturasIntermedia.IdRowAsignatura
			where tbl_Docentes.IdRows = @IdDocente
		end

		if(@Accion = 'AsesoriasPorDocente')
		begin
			select 
				 tbl_Asesorias.IdRows									as idAsesoria
				,tbl_Asesorias.IdRowAsignaturaInt
				,tbl_Asesorias.FechaAsesoria
				,CONVERT(varchar,tbl_Asesorias.HoraInicioAsesoria,8)	as HoraInicio
				,CONVERT(varchar,tbl_Asesorias.HoraFinAsesoria,8)		as HoraFin
				,tbl_Docentes.Nombre
				,tbl_Docentes.Apellido
				,tbl_Asignaturas.Nombre									as Asesoria
			from tbl_Asesorias
			inner join tbl_AsignaturasIntermedia on tbl_Asesorias.IdRowAsignaturaInt = tbl_AsignaturasIntermedia.IdRows
			inner join tbl_Docentes on tbl_Docentes.IdRows = tbl_AsignaturasIntermedia.IdRowDocente
			inner join tbl_Asignaturas on tbl_Asignaturas.IdRows = tbl_AsignaturasIntermedia.IdRowAsignatura
			where tbl_Docentes.IdRows = @IdDocente 
			and convert(char(8), FechaAsesoria, 112) between convert(char(8), @FechaInicial, 112) and  convert(char(8), @FechaFinal, 112)
		end

		if(@Accion = 'AsesoriasDisponibles')
		begin
			select 
				 tbl_Asesorias.IdRows									as IdAsesoria
				,tbl_Asesorias.FechaAsesoria
				,CONVERT(varchar,tbl_Asesorias.HoraInicioAsesoria,8)	as HoraInicio
				,CONVERT(varchar,tbl_Asesorias.HoraFinAsesoria,8)		as HoraFin
				,tbl_Docentes.Nombre
				,tbl_Docentes.Apellido
				,tbl_Asignaturas.Nombre									as Asesoria
			from tbl_Asesorias	
			inner join tbl_AsignaturasIntermedia on tbl_Asesorias.IdRowAsignaturaInt = tbl_AsignaturasIntermedia.IdRows
			inner join tbl_Docentes on tbl_Docentes.IdRows = tbl_AsignaturasIntermedia.IdRowDocente
			inner join tbl_Asignaturas on tbl_Asignaturas.IdRows = tbl_AsignaturasIntermedia.IdRowAsignatura
		end

		if(@Accion = 'CrearCita')
		begin
			if not exists(select * from tbl_CitasEstudiantes where IdAsesoria = @IdAsesoria and IdRowEstudiante = @IdEstudiante)
				begin
					insert into tbl_CitasEstudiantes (IdAsesoria, IdRowEstudiante) values (@IdAsesoria, @IdEstudiante)
					set @mensaje = 'Se ha agendado la cita'
				end
			else
				begin
					set @mensaje = 'Ya ha agendado esta cita'
				end
			select @mensaje as 'Mensaje'
		end

		if(@Accion = 'ConsultarCitas')
		begin
			select 
				 tbl_CitasEstudiantes.IdRow								as IdCita
				,tbl_Asesorias.FechaAsesoria							as FechaAsesoria
				,CONVERT(varchar,tbl_Asesorias.HoraInicioAsesoria,8)	as HoraInicio
				,CONVERT(varchar,tbl_Asesorias.HoraFinAsesoria,8)		as HoraFin
				,tbl_Docentes.Nombre									as NombreDocente
				,tbl_Docentes.Apellido									as ApellidoDocente
				,tbl_Asignaturas.Nombre									as Asignatura
			from tbl_CitasEstudiantes 
				inner join tbl_Asesorias on tbl_CitasEstudiantes.IdAsesoria = tbl_Asesorias.IdRows
				inner join tbl_Estudiantes on tbl_CitasEstudiantes.IdRowEstudiante = tbl_Estudiantes.IdRows
				inner join tbl_AsignaturasIntermedia on tbl_Asesorias.IdRowAsignaturaInt = tbl_AsignaturasIntermedia.IdRows
				inner join tbl_Docentes on tbl_AsignaturasIntermedia.IdRowDocente = tbl_Docentes.IdRows
				inner join tbl_Asignaturas on tbl_AsignaturasIntermedia.IdRowAsignatura = tbl_Asignaturas.IdRows
			where tbl_Estudiantes.IdRows = @IdEstudiante
		end

		if(@Accion = 'EliminarCita')
		begin
			if exists (select * from tbl_CitasEstudiantes where IdRow = @IdCita)
				begin
					delete from tbl_CitasEstudiantes where IdRow = @IdCita
					set @mensaje = 'Se ha eliminado la cita'
					select @mensaje as 'Mensaje'
				end
		end

		if(@Accion = 'EliminarAsesoria')
		begin
			if exists (select * from tbl_Asesorias where IdRows = @IdAsesoria)
				begin
					delete from tbl_Asesorias where IdRows = @IdAsesoria
					set @mensaje = 'Se ha eliminado la Asesoria'
					select @mensaje as 'Mensaje'
				end
		end

		if(@Accion = 'AgregarAsignaturas')
		begin
			if not exists(select * from tbl_AsignaturasIntermedia where IdRowDocente = @IdDocente and IdRowAsignatura = @IdRowAsignatura)
				begin
					insert into tbl_AsignaturasIntermedia 
					(IdRowDocente
					,IdRowAsignatura)
					values
					(
					 @IdDocente
					,@IdRowAsignatura
					)
					set @mensaje = 'Materia agregada con exito'
				end
			else
			begin 
				set @mensaje = 'Ya ha agregado esta materia previamente'
			end
			select @mensaje as 'Mensaje'
		end

		if(@Accion = 'CrearAsignatura')
		begin
			if(@IdAsignatura = 0)
				begin
					if (@Perfil = 0)
						begin
							insert into tbl_Asignaturas (Nombre) values (@Asignatura)
							select 'Se ha insertado correctamente la asignatura'
						end
					else
						begin
							select 'Solo los docentes pueden crear asignaturas'
						end
				end
			else
				begin
					if (@Perfil = 0)
						begin
							update tbl_Asignaturas set Nombre = @Asignatura where IdRows = @IdAsignatura
							select 'Asignatura actualizada'
						end
					else
						begin
							select 'Solo los docentes pueden actualizar asignaturas'
						end
					
				end
		end

		if(@Accion = 'ConsultarAsignaturas')
			begin
				select 
					 IdRows
					,Nombre					as Asignatura
				from tbl_Asignaturas
			end

		if(@Accion = 'ElimiarAsignatura')
			begin
				if exists(select * from tbl_Asignaturas where IdRows = @IdAsignatura)
					begin
						delete from tbl_Asignaturas where IdRows = @IdAsignatura
						select 'Asignatura eliminada correctamente'
					end
				else
					begin
						select 'No esxiste la asignatura o ya fue eliminada'
					end
				
			end
END



/* 
	exec Sp_AsesoriasPascualBravo @Accion = 'ConsultarUsuario',@CorreoElectronico = 'jdanieldiax@gmail.com', @Contrasena = '123456'
	exec Sp_AsesoriasPascualBravo @Accion = 'ConsultarUsuario',@CorreoElectronico = 'jose.diaz@gmail.com', @Contrasena = '123456'
	exec Sp_AsesoriasPascualBravo @Accion = 'EliminarAsesoria', @IdAsesoria = 6

*/
