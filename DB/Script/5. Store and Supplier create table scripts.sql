USE [HMS]
GO

/****** Object:  Table [dbo].[StoreDepartment]    Script Date: 7/22/2016 10:07:47 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[StoreDepartment](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[StoreId] [bigint] NOT NULL,
	[DepartmentId] [bigint] NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_StoreDepartment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO







/****** Object:  Table [dbo].[Store]    Script Date: 7/22/2016 10:07:47 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Store](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NOT NULL,
	[Address] [nvarchar](max) NOT NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[Fax] [nvarchar](20) NULL,
	[Email] [nvarchar](100) NULL,
	[StoreKeeperId] [bigint] NOT NULL,
	[LineManagerId] [bigint] NOT NULL,
	[UserId] [bigint] NOT NULL,
	[ParentStoreId] [bigint] NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_T_Store] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO








/****** Object:  Table [dbo].[Supplier]    Script Date: 7/22/2016 10:07:47 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Supplier](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ContactId] [bigint] NOT NULL,
	[Notes] [nvarchar](max) NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_Supplier] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO









/****** Object:  Table [dbo].[ItemSupplier]    Script Date: 7/22/2016 10:07:47 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ItemSupplier](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ItemId] [bigint] NOT NULL,
	[SupplierId] [bigint] NOT NULL,
	[ListPrice] [decimal](18, 0) NOT NULL,
	[BuyPrice] [decimal](18, 0) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_ProductSupplier] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[StoreDepartment] ADD  CONSTRAINT [DF_StoreDepartment_Active]  DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[Store] ADD  CONSTRAINT [DF_Store_Active]  DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[Supplier] ADD  CONSTRAINT [DF_Supplier_Active]  DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[ItemSupplier] ADD  CONSTRAINT [DF_ProductSupplier_Active]  DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[StoreDepartment]  WITH CHECK ADD  CONSTRAINT [FK_StoreDepartment_Department] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Department] ([Id])
GO

ALTER TABLE [dbo].[StoreDepartment] CHECK CONSTRAINT [FK_StoreDepartment_Department]
GO

ALTER TABLE [dbo].[StoreDepartment]  WITH CHECK ADD  CONSTRAINT [FK_StoreDepartment_Store] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Store] ([Id])
GO

ALTER TABLE [dbo].[StoreDepartment] CHECK CONSTRAINT [FK_StoreDepartment_Store]
GO

ALTER TABLE [dbo].[Store]  WITH CHECK ADD  CONSTRAINT [FK_Store_Contact] FOREIGN KEY([StoreKeeperId])
REFERENCES [dbo].[Contact] ([Id])
GO

ALTER TABLE [dbo].[Store] CHECK CONSTRAINT [FK_Store_Contact]
GO

ALTER TABLE [dbo].[Store]  WITH CHECK ADD  CONSTRAINT [FK_Store_Contact1] FOREIGN KEY([LineManagerId])
REFERENCES [dbo].[Contact] ([Id])
GO

ALTER TABLE [dbo].[Store] CHECK CONSTRAINT [FK_Store_Contact1]
GO

ALTER TABLE [dbo].[Store]  WITH CHECK ADD  CONSTRAINT [FK_Store_Store] FOREIGN KEY([ParentStoreId])
REFERENCES [dbo].[Store] ([Id])
GO

ALTER TABLE [dbo].[Store] CHECK CONSTRAINT [FK_Store_Store]
GO

ALTER TABLE [dbo].[Supplier]  WITH CHECK ADD  CONSTRAINT [FK_Supplier_Supplier] FOREIGN KEY([ContactId])
REFERENCES [dbo].[Contact] ([Id])
GO

ALTER TABLE [dbo].[Supplier] CHECK CONSTRAINT [FK_Supplier_Supplier]
GO

ALTER TABLE [dbo].[ItemSupplier]  WITH CHECK ADD  CONSTRAINT [FK_ItemSupplier_Item] FOREIGN KEY([ItemId])
REFERENCES [dbo].[Item] ([Id])
GO

ALTER TABLE [dbo].[ItemSupplier] CHECK CONSTRAINT [FK_ItemSupplier_Item]
GO

ALTER TABLE [dbo].[ItemSupplier]  WITH CHECK ADD  CONSTRAINT [FK_ItemSupplier_Supplier] FOREIGN KEY([SupplierId])
REFERENCES [dbo].[Supplier] ([Id])
GO

ALTER TABLE [dbo].[ItemSupplier] CHECK CONSTRAINT [FK_ItemSupplier_Supplier]
GO





/************* MeasurementUnit **************/


BEGIN TRANSACTION
GO
ALTER TABLE dbo.MeasurementUnit SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.ItemReorder
	DROP CONSTRAINT FK_Item_T_ItemReorder
GO
ALTER TABLE dbo.Item SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.ItemReorder
	DROP CONSTRAINT DF_ItemReorder_Active
GO
CREATE TABLE dbo.Tmp_ItemReorder
	(
	Id bigint NOT NULL IDENTITY (1, 1),
	ReorderLevel int NOT NULL,
	ReorderQuantity int NOT NULL,
	MeasurementUnitId bigint NOT NULL,
	ShelfName nvarchar(200) NOT NULL,
	ItemID bigint NOT NULL,
	UserId bigint NULL,
	Active bit NOT NULL
	)  ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_ItemReorder SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_ItemReorder ADD CONSTRAINT
	DF_ItemReorder_Active DEFAULT ((0)) FOR Active
GO
SET IDENTITY_INSERT dbo.Tmp_ItemReorder ON
GO
IF EXISTS(SELECT * FROM dbo.ItemReorder)
	 EXEC('INSERT INTO dbo.Tmp_ItemReorder (Id, ReorderLevel, ReorderQuantity, ShelfName, ItemID, UserId, Active)
		SELECT Id, ReorderLevel, ReorderQuantity, ShelfName, ItemID, UserId, Active FROM dbo.ItemReorder WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_ItemReorder OFF
GO
DROP TABLE dbo.ItemReorder
GO
EXECUTE sp_rename N'dbo.Tmp_ItemReorder', N'ItemReorder', 'OBJECT' 
GO
ALTER TABLE dbo.ItemReorder ADD CONSTRAINT
	PK_T_ItemReorder PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.ItemReorder ADD CONSTRAINT
	FK_Item_T_ItemReorder FOREIGN KEY
	(
	ItemID
	) REFERENCES dbo.Item
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.ItemReorder ADD CONSTRAINT
	FK_ItemReorder_MeasurementUnit FOREIGN KEY
	(
	MeasurementUnitId
	) REFERENCES dbo.MeasurementUnit
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT









/****** Object:  Table [dbo].[PurchaseRequisition]    Script Date: 7/22/2016 10:34:15 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PurchaseRequisition](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[RequisitionDate] [datetime] NOT NULL,
	[RequisitionBy] [bigint] NOT NULL,
	[Purpose] [nvarchar](200) NOT NULL,
	[Note] [nvarchar](max) NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_PurchaseRequisition] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO









/****** Object:  Table [dbo].[RequisitionStatus]    Script Date: 7/22/2016 10:34:15 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RequisitionStatus](
	[Id] [bigint] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_RequisitionStatus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO








/****** Object:  Table [dbo].[ItemRequisition]    Script Date: 7/22/2016 11:38:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ItemRequisition](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ItemId] [bigint] NOT NULL,
	[Quantity] [int] NOT NULL,
	[MeasurementUnitId] [bigint] NOT NULL,
	[RequisitionStatusId] [bigint] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_ItemRequisition] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ItemRequisition] ADD  CONSTRAINT [DF_ItemRequisition_Active]  DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[ItemRequisition]  WITH CHECK ADD  CONSTRAINT [FK_ItemRequisition_Item] FOREIGN KEY([ItemId])
REFERENCES [dbo].[Item] ([Id])
GO

ALTER TABLE [dbo].[ItemRequisition] CHECK CONSTRAINT [FK_ItemRequisition_Item]
GO

ALTER TABLE [dbo].[ItemRequisition]  WITH CHECK ADD  CONSTRAINT [FK_ItemRequisition_MeasurementUnit] FOREIGN KEY([MeasurementUnitId])
REFERENCES [dbo].[MeasurementUnit] ([Id])
GO

ALTER TABLE [dbo].[ItemRequisition] CHECK CONSTRAINT [FK_ItemRequisition_MeasurementUnit]
GO

ALTER TABLE [dbo].[ItemRequisition]  WITH CHECK ADD  CONSTRAINT [FK_ItemRequisition_RequisitionStatus] FOREIGN KEY([RequisitionStatusId])
REFERENCES [dbo].[RequisitionStatus] ([Id])
GO

ALTER TABLE [dbo].[ItemRequisition] CHECK CONSTRAINT [FK_ItemRequisition_RequisitionStatus]
GO





/******************** PurchaseRequisition add column - UserId *******************/

BEGIN TRANSACTION
GO
ALTER TABLE dbo.PurchaseRequisition
	DROP CONSTRAINT FK_PurchaseRequisition_User
GO
ALTER TABLE dbo.[User] SET (LOCK_ESCALATION = TABLE)
GO
COMMIT
BEGIN TRANSACTION
GO
ALTER TABLE dbo.PurchaseRequisition
	DROP CONSTRAINT DF_PurchaseRequisition_Active
GO
CREATE TABLE dbo.Tmp_PurchaseRequisition
	(
	Id bigint NOT NULL IDENTITY (1, 1),
	RequisitionDate datetime NOT NULL,
	RequisitionBy bigint NOT NULL,
	Purpose nvarchar(200) NOT NULL,
	Note nvarchar(MAX) NULL,
	UserId bigint NOT NULL,
	Active bit NOT NULL
	)  ON [PRIMARY]
	 TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE dbo.Tmp_PurchaseRequisition SET (LOCK_ESCALATION = TABLE)
GO
ALTER TABLE dbo.Tmp_PurchaseRequisition ADD CONSTRAINT
	DF_PurchaseRequisition_Active DEFAULT ((1)) FOR Active
GO
SET IDENTITY_INSERT dbo.Tmp_PurchaseRequisition ON
GO
IF EXISTS(SELECT * FROM dbo.PurchaseRequisition)
	 EXEC('INSERT INTO dbo.Tmp_PurchaseRequisition (Id, RequisitionDate, RequisitionBy, Purpose, Note, Active)
		SELECT Id, RequisitionDate, RequisitionBy, Purpose, Note, Active FROM dbo.PurchaseRequisition WITH (HOLDLOCK TABLOCKX)')
GO
SET IDENTITY_INSERT dbo.Tmp_PurchaseRequisition OFF
GO
DROP TABLE dbo.PurchaseRequisition
GO
EXECUTE sp_rename N'dbo.Tmp_PurchaseRequisition', N'PurchaseRequisition', 'OBJECT' 
GO
ALTER TABLE dbo.PurchaseRequisition ADD CONSTRAINT
	PK_PurchaseRequisition PRIMARY KEY CLUSTERED 
	(
	Id
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

GO
ALTER TABLE dbo.PurchaseRequisition ADD CONSTRAINT
	FK_PurchaseRequisition_User FOREIGN KEY
	(
	RequisitionBy
	) REFERENCES dbo.[User]
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
ALTER TABLE dbo.PurchaseRequisition ADD CONSTRAINT
	FK_PurchaseRequisition_User1 FOREIGN KEY
	(
	UserId
	) REFERENCES dbo.[User]
	(
	Id
	) ON UPDATE  NO ACTION 
	 ON DELETE  NO ACTION 
	
GO
COMMIT








/****** Object:  Table [dbo].[PurchaseOrder]    Script Date: 7/22/2016 11:05:15 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PurchaseOrder](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[SubStoreId] [bigint] NOT NULL,
	[Date] [datetime] NOT NULL,
	[SupplierId] [bigint] NOT NULL,
	[ApprovedBy] [bigint] NOT NULL,
	[UserId] [bigint] NOT NULL,
	[PurchaseRequisitionId] [bigint] NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_PurchaseOrder] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[PurchaseOrder] ADD  CONSTRAINT [DF_PurchaseOrder_Active]  DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[PurchaseOrder]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseOrder_PurchaseRequisition] FOREIGN KEY([PurchaseRequisitionId])
REFERENCES [dbo].[PurchaseRequisition] ([Id])
GO

ALTER TABLE [dbo].[PurchaseOrder] CHECK CONSTRAINT [FK_PurchaseOrder_PurchaseRequisition]
GO

ALTER TABLE [dbo].[PurchaseOrder]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseOrder_Store] FOREIGN KEY([SubStoreId])
REFERENCES [dbo].[Store] ([Id])
GO

ALTER TABLE [dbo].[PurchaseOrder] CHECK CONSTRAINT [FK_PurchaseOrder_Store]
GO

ALTER TABLE [dbo].[PurchaseOrder]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseOrder_Supplier] FOREIGN KEY([SupplierId])
REFERENCES [dbo].[Supplier] ([Id])
GO

ALTER TABLE [dbo].[PurchaseOrder] CHECK CONSTRAINT [FK_PurchaseOrder_Supplier]
GO

ALTER TABLE [dbo].[PurchaseOrder]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseOrder_User] FOREIGN KEY([ApprovedBy])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[PurchaseOrder] CHECK CONSTRAINT [FK_PurchaseOrder_User]
GO

ALTER TABLE [dbo].[PurchaseOrder]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseOrder_User1] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[PurchaseOrder] CHECK CONSTRAINT [FK_PurchaseOrder_User1]
GO









/****** Object:  Table [dbo].[PurchaseOrderDetail]    Script Date: 7/22/2016 11:46:18 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PurchaseOrderDetail](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[PurchaseOrderId] [bigint] NOT NULL,
	[ItemId] [bigint] NOT NULL,
	[RequiredQuantity] [int] NOT NULL,
	[MeasurementUnitId] [bigint] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_PurchaseIndent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[PurchaseOrderDetail] ADD  CONSTRAINT [DF_PurchaseIndent_Active]  DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[PurchaseOrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseOrderDetail_Item] FOREIGN KEY([ItemId])
REFERENCES [dbo].[Item] ([Id])
GO

ALTER TABLE [dbo].[PurchaseOrderDetail] CHECK CONSTRAINT [FK_PurchaseOrderDetail_Item]
GO

ALTER TABLE [dbo].[PurchaseOrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseOrderDetail_MeasurementUnit] FOREIGN KEY([MeasurementUnitId])
REFERENCES [dbo].[MeasurementUnit] ([Id])
GO

ALTER TABLE [dbo].[PurchaseOrderDetail] CHECK CONSTRAINT [FK_PurchaseOrderDetail_MeasurementUnit]
GO

ALTER TABLE [dbo].[PurchaseOrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseOrderDetail_PurchaseOrder] FOREIGN KEY([PurchaseOrderId])
REFERENCES [dbo].[PurchaseOrder] ([Id])
GO

ALTER TABLE [dbo].[PurchaseOrderDetail] CHECK CONSTRAINT [FK_PurchaseOrderDetail_PurchaseOrder]
GO








/****** Object:  Table [dbo].[PurchaseInvoice]    Script Date: 7/22/2016 11:30:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PurchaseInvoice](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Date] [datetime] NOT NULL,
	[AccountNumber] [nvarchar](100) NOT NULL,
	[SupplierId] [bigint] NOT NULL,
	[InvoiceTotal] [decimal](18, 0) NOT NULL,
	[CurrencyId] [bigint] NOT NULL,
	[JournalNumber] [nvarchar](50) NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_PurchaseInvoice] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO








/****** Object:  Table [dbo].[Currency]    Script Date: 7/22/2016 11:30:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Currency](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[CurrencyName] [nvarchar](50) NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK_Currency] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[PurchaseInvoice] ADD  CONSTRAINT [DF_PurchaseInvoice_Active]  DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[Currency] ADD  CONSTRAINT [DF_Currency_Active]  DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[PurchaseInvoice]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseInvoice_Currency] FOREIGN KEY([CurrencyId])
REFERENCES [dbo].[Currency] ([Id])
GO

ALTER TABLE [dbo].[PurchaseInvoice] CHECK CONSTRAINT [FK_PurchaseInvoice_Currency]
GO

ALTER TABLE [dbo].[PurchaseInvoice]  WITH CHECK ADD  CONSTRAINT [FK_PurchaseInvoice_Supplier] FOREIGN KEY([SupplierId])
REFERENCES [dbo].[Supplier] ([Id])
GO

ALTER TABLE [dbo].[PurchaseInvoice] CHECK CONSTRAINT [FK_PurchaseInvoice_Supplier]
GO


