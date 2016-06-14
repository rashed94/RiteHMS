USE [HMS]
GO

/****** Object:  Table [dbo].[Appointment]    Script Date: 6/14/2016 11:37:59 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Appointment](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[StartTime] [time](7) NOT NULL,
	[EndTime] [time](7) NOT NULL,
	[Active] [bit] NOT NULL CONSTRAINT [DF_AppointmentConfig_Active]  DEFAULT ((1)),
 CONSTRAINT [PK_AppointmentConfig] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[ServiceProviderAppointment]    Script Date: 6/14/2016 11:37:59 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ServiceProviderAppointment](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[AppointmentDate] [datetime] NOT NULL,
	[ServiceProviderId] [bigint] NOT NULL,
	[AppointmentId] [bigint] NOT NULL,
	[PatientId] [bigint] NULL,
	[AppointmentAllowed] [bit] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_ServiceProviderAppointment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ServiceProviderAppointment] ADD  CONSTRAINT [DF_ServiceProviderAppointment_AppointmentDate]  DEFAULT (getdate()) FOR [AppointmentDate]
GO

ALTER TABLE [dbo].[ServiceProviderAppointment] ADD  CONSTRAINT [DF_ServiceProviderAppointment_AppointmentAllowed]  DEFAULT ((1)) FOR [AppointmentAllowed]
GO

ALTER TABLE [dbo].[ServiceProviderAppointment] ADD  CONSTRAINT [DF_ServiceProviderAppointment_Active]  DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[ServiceProviderAppointment]  WITH CHECK ADD  CONSTRAINT [FK_ServiceProviderAppointment_Appointment] FOREIGN KEY([AppointmentId])
REFERENCES [dbo].[Appointment] ([Id])
GO

ALTER TABLE [dbo].[ServiceProviderAppointment] CHECK CONSTRAINT [FK_ServiceProviderAppointment_Appointment]
GO

ALTER TABLE [dbo].[ServiceProviderAppointment]  WITH CHECK ADD  CONSTRAINT [FK_ServiceProviderAppointment_Patient] FOREIGN KEY([PatientId])
REFERENCES [dbo].[Patient] ([Id])
GO

ALTER TABLE [dbo].[ServiceProviderAppointment] CHECK CONSTRAINT [FK_ServiceProviderAppointment_Patient]
GO

ALTER TABLE [dbo].[ServiceProviderAppointment]  WITH CHECK ADD  CONSTRAINT [FK_ServiceProviderAppointment_ServiceProvider] FOREIGN KEY([ServiceProviderId])
REFERENCES [dbo].[ServiceProvider] ([Id])
GO

ALTER TABLE [dbo].[ServiceProviderAppointment] CHECK CONSTRAINT [FK_ServiceProviderAppointment_ServiceProvider]
GO

