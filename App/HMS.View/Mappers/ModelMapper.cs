using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HMS.View.Mappers
{
    public class ModelMapper
    {

        public static User MapToClient(User user)
        {
            User singleUser = new User
            {
                Id = user.Id,
                UserName=user.UserName,
                Contact=user.Contact!=null ? MapToClient(user.Contact) :null

            };

            return singleUser;
        }

        public static ItemCategory MapToClient(ItemCategory category)
        {
            ItemCategory onlyCategory = new ItemCategory()
            {
                Id=category.Id,
                Name=category.Name
            };
            return onlyCategory;
        }

        public static Item MapToClient(Item item)
        {
            Item onlyItem = new Item()
            {
                Id = item.Id,
                Name = item.Name,
                GenericName = item.GenericName,
                Code = item.Code,
                ItemTypeId = item.ItemTypeId,
                MedicalTypeId = item.MedicalTypeId,
                ItemCategoryId = item.ItemCategoryId,
                ItemCategory = item.ItemCategory != null ? MapToClient(item.ItemCategory) : null,
                MeasurementUnitId = item.MeasurementUnitId,
                SalePrice = item.SalePrice,
                BuyPrice = item.BuyPrice,
                ServiceProviderId = item.ServiceProviderId,
                ReferralAllowed = item.ReferralAllowed,
                DefaultReferrarFee = item.DefaultReferrarFee,
                Description = item.Description,
                UserId = item.UserId,
                LabReportGroupId = item.LabReportGroupId,
                Active = item.Active

            };
            return onlyItem;
        }

        public static InvestigationReagent MapToClient(InvestigationReagent reagent)
        {
            InvestigationReagent investiGationReagent = new InvestigationReagent()
            {
                Id = reagent.Id,
                InvestigationId = reagent.InvestigationId,
                ReagentId = reagent.ReagentId,
                Reagent = reagent.Reagent != null ? MapToClient(reagent.Reagent) : null,

                Quantity=reagent.Quantity

            };
            return investiGationReagent;
        }

        public static StoreType MapToClient(StoreType storeType)
        {
            StoreType singleStoreType = new StoreType()
            {
                Id=storeType.Id,
                Name=storeType.Name

            };
            return singleStoreType;
        }

        public static List<StoreLineManager> MapToClient(List<StoreLineManager> listStoreLineManager)
        {
            List<StoreLineManager> onlyStoreLineManagers = new List<StoreLineManager>();

            listStoreLineManager.ForEach(s => 
            {
                if (s.Active == true)
                {
                    StoreLineManager singleStoreLineManager = ModelMapper.MapToClient(s);
                    onlyStoreLineManagers.Add(singleStoreLineManager);
                }
            });

            return onlyStoreLineManagers;
        }
        public static Shelf MapToClient(Shelf shelf)
        {

            Shelf onlyShelf = new Shelf
            {
                Id=shelf.Id,
                Name=shelf.Name

            };

            return onlyShelf;

        }

        public static Bin MapToClient(Bin bin)
        {

            Bin onlybin = new Bin
            {
                Id = bin.Id,
                Name = bin.Name

            };

            return onlybin;

        }

        public static List<InventoryItem> MapToClient(List<InventoryItem> inventoryItems)
        {
            List<InventoryItem> onlyInventory = new List<InventoryItem>();

            inventoryItems.ForEach(i =>
            {
                InventoryItem inventoryItem = ModelMapper.MapToClient(i);
                onlyInventory.Add(inventoryItem);
            });
            return onlyInventory;
        }

        public static InventoryItem MapToClient(InventoryItem inventoryItem)
        {

            InventoryItem onluInventoryItem = new InventoryItem
            {
                Id = inventoryItem.Id,
                InventoryId = inventoryItem.InventoryId,
                StoreId=inventoryItem.StoreId,
                Quantity=inventoryItem.Quantity,
                MeasurementUnitId=inventoryItem.MeasurementUnitId,
                ExpiryDate=inventoryItem.ExpiryDate,
                BuyPrice=inventoryItem.BuyPrice,
                ModifiedDate=inventoryItem.ModifiedDate,
                Active=inventoryItem.Active,
                UserId=inventoryItem.UserId

            };

            return onluInventoryItem;

        }


        public static Inventory MapToClientWithItem(Inventory inventory)
        {
            Inventory singleInventory = new Inventory{

                Id=inventory.Id,
                ItemID=inventory.ItemID,
                Item = inventory.Item != null ? MapToClient(inventory.Item) : null,
                StoreID=inventory.StoreID,
                Quantity=inventory.Quantity,
                ReorderLevel=inventory.ReorderLevel,
                ShelfId=inventory.ShelfId,
                Shelf = inventory.Shelf != null ? MapToClient(inventory.Shelf) : null,
                BinId=inventory.BinId,
                Bin = inventory.Bin != null ? MapToClient(inventory.Bin) : null,
                MeasurementUnitId=inventory.MeasurementUnitId,
                LastModifiedDate=inventory.LastModifiedDate,
               // InventoryItems = inventory.InventoryItems != null ? MapToClient(inventory.InventoryItems) : null

               
               

            };

            return singleInventory;


        }

        public static Inventory MapToClient(Inventory inventory)
        {
            Inventory singleInventory = new Inventory
            {

                Id = inventory.Id,
                ItemID = inventory.ItemID,
               // Item = inventory.Item != null ? MapToClient(inventory.Item) : null,
                StoreID = inventory.StoreID,
                Quantity = inventory.Quantity,
                ReorderLevel = inventory.ReorderLevel,
                ShelfId = inventory.ShelfId,
                Shelf = inventory.Shelf != null ? MapToClient(inventory.Shelf) : null,
                BinId = inventory.BinId,
                Bin = inventory.Bin != null ? MapToClient(inventory.Bin) : null,
                MeasurementUnitId = inventory.MeasurementUnitId,
                LastModifiedDate = inventory.LastModifiedDate,
                // InventoryItems = inventory.InventoryItems != null ? MapToClient(inventory.InventoryItems) : null




            };

            return singleInventory;


        }
        public static ItemRequisition MapToClient(ItemRequisition itemReq)
        {
            ItemRequisition onlyItemRequisition = new ItemRequisition()
            {
                Id=itemReq.Id,
                ItemId =itemReq.ItemId,
                InventoryId=itemReq.InventoryId,
                RequisitionId=itemReq.RequisitionId,
                ApprovedBy =itemReq.ApprovedBy,
                ApprovalDate =itemReq.ApprovalDate,
                Quantity =itemReq.Quantity,
                MeasurementUnitId= itemReq.MeasurementUnitId,
                RequisitionStatusId =itemReq.RequisitionStatusId,
                UserId=itemReq.UserId,
                Item = itemReq.Item != null ? MapToClient(itemReq.Item) : null,
                Inventory = itemReq.Inventory != null ? MapToClient(itemReq.Inventory) : null


            };
            return onlyItemRequisition;
        }

        public static ItemRequisition MapToClientWithoutInventory(ItemRequisition itemReq)
        {
            ItemRequisition onlyItemRequisition = new ItemRequisition()
            {
                Id = itemReq.Id,
                ItemId = itemReq.ItemId,
                InventoryId=itemReq.InventoryId,
                RequisitionId = itemReq.RequisitionId,
                ApprovedBy = itemReq.ApprovedBy,
                ApprovalDate = itemReq.ApprovalDate,
                Quantity = itemReq.Quantity,
                MeasurementUnitId = itemReq.MeasurementUnitId,
                RequisitionStatusId = itemReq.RequisitionStatusId,
                UserId=itemReq.UserId,
                Item = itemReq.Item != null ? MapToClient(itemReq.Item) : null


            };

            return onlyItemRequisition;
        }


        public static Requisition MapToClient(Requisition req)
        {

            Requisition requisition = new Requisition()
            {
                Id=req.Id,
                RequisitionDate=req.RequisitionDate,
                RequisitionBy=req.RequisitionBy,
                Purpose=req.Purpose,
                ToStoreId=req.ToStoreId,
                FromStoreId=req.FromStoreId,
                IsSubStoreRequisition = req.IsSubStoreRequisition,
                Note=req.Note,
                IsOpen=req.IsOpen,
                UserId=req.UserId,
                Active=req.Active,
                ItemRequisitions = req.ItemRequisitions != null ? MapToClient(req.ItemRequisitions) : null,

            };
            return requisition;

        }

        public static Requisition MapToClientWithoutItemRequisition(Requisition req)
        {

            Requisition requisition = new Requisition()
            {
                Id = req.Id,
                RequisitionDate = req.RequisitionDate,
                RequisitionBy = req.RequisitionBy,
                Purpose = req.Purpose,
                ToStoreId = req.ToStoreId,
                ToStore = req.ToStore != null ? MapToClient(req.ToStore) : null,
                FromStoreId = req.FromStoreId,
                FromStore = req.FromStore != null ? MapToClient(req.FromStore) : null,
                IsSubStoreRequisition = req.IsSubStoreRequisition,
                Note = req.Note,
                IsOpen = req.IsOpen,
                UserId = req.UserId,
                Active = req.Active,
                //ItemRequisitions = req.ItemRequisitions != null ? MapToClient(req.ItemRequisitions) : null,
                //ItemRequisitions = req.ItemRequisitions != null ? MapToClient(req.ItemRequisitions) : null,

            };
            return requisition;

        }


        public static List<ItemRequisition> MapToClient(List<ItemRequisition> itemRequisition)
        {
            List<ItemRequisition> onlyitemRequisition = new List<ItemRequisition>();

            itemRequisition.ForEach(i =>
            {
                ItemRequisition itemReq = ModelMapper.MapToClient(i);
                onlyitemRequisition.Add(itemReq);
            });

            return onlyitemRequisition;
         }
        



        public static Item MapToClientWithRequisition(Item item)
        {
            Item onlyItem = new Item()
            {
                Id = item.Id,
                Name = item.Name,
                GenericName = item.GenericName,
                Code = item.Code,
                ItemTypeId = item.ItemTypeId,
                MedicalTypeId = item.MedicalTypeId,
                ItemCategoryId = item.ItemCategoryId,
                ItemRequisition = item.ItemRequisition != null ? MapToClient(item.ItemRequisition) : null,
                MeasurementUnitId = item.MeasurementUnitId,
                SalePrice = item.SalePrice,
                BuyPrice = item.BuyPrice,
                ServiceProviderId = item.ServiceProviderId,
                ReferralAllowed = item.ReferralAllowed,
                DefaultReferrarFee = item.DefaultReferrarFee,
                Description = item.Description,
                UserId = item.UserId,
                LabReportGroupId = item.LabReportGroupId,
                Active = item.Active

            };
            return onlyItem;
        }


        public static Inventory MapToClientWithItemAndRequisition(Inventory inventory)
        {
            Inventory singleInventory = new Inventory
            {

                Id = inventory.Id,
                ItemID = inventory.ItemID,
                Item = inventory.Item != null ? MapToClientWithRequisition(inventory.Item) : null,
                StoreID = inventory.StoreID,
                Quantity = inventory.Quantity,
                ReorderLevel = inventory.ReorderLevel,
                ShelfId = inventory.ShelfId,
                Shelf = inventory.Shelf != null ? MapToClient(inventory.Shelf) : null,
                BinId = inventory.BinId,
                Bin = inventory.Bin != null ? MapToClient(inventory.Bin) : null,
                MeasurementUnitId = inventory.MeasurementUnitId,
                LastModifiedDate = inventory.LastModifiedDate,
                // InventoryItems = inventory.InventoryItems != null ? MapToClient(inventory.InventoryItems) : null




            };

            return singleInventory;

        }

  

        public static Inventory MapToClientWithoutItem(Inventory inventory)
        {
            Inventory singleInventory = new Inventory
            {

                Id = inventory.Id,
                ItemID = inventory.ItemID,
                //Item = inventory.Item != null ? MapToClient(inventory.Item) : null,
                StoreID = inventory.StoreID,
                Quantity = inventory.Quantity,
                ReorderLevel = inventory.ReorderLevel,
                ShelfId = inventory.ShelfId,
                Shelf = inventory.Shelf != null ? MapToClient(inventory.Shelf) : null,
                BinId = inventory.BinId,
                Bin = inventory.Bin != null ? MapToClient(inventory.Bin) : null,
                MeasurementUnitId = inventory.MeasurementUnitId,
                LastModifiedDate = inventory.LastModifiedDate

            };

            return singleInventory;


        }

        public static Store MapToClient(Store store)
        {
            Store singleStore = new Store
            {
                Id=store.Id,
                Name=store.Name,
                Address=store.Address,
                PhoneNumber=store.PhoneNumber,
                Fax=store.Fax,
                Email=store.Email,
                StoreKeeperId=store.StoreKeeperId,
                StoreKeeper=store.StoreKeeper!=null ? MapToClient(store.StoreKeeper):null,
                ParentStoreId=store.ParentStoreId,
                ParentStore = store.ParentStore != null ? MapToClient(store.ParentStore) : null,
                StoreTypeId=store.StoreTypeId,
                StoreType=store.StoreType!=null? MapToClient( store.StoreType):null,
                StoreLineManagers=store.StoreLineManagers!=null ? MapToClient(store.StoreLineManagers):null
          

            };

            return singleStore;
        }

        public static StoreLineManager MapToClient(StoreLineManager lineManager)
        {
            StoreLineManager singleLineManager = new StoreLineManager
            {
                Id = lineManager.Id,
                StoreId = lineManager.StoreId,
                LineManagerId = lineManager.LineManagerId,
                LineManagerUser = lineManager.LineManagerUser != null ? MapToClient(lineManager.LineManagerUser) : null
            };
            return singleLineManager;
        }

        public static ServiceProvider MapToClient(ServiceProvider serviceProvider)
        {
            ServiceProvider mappedServiceProvider = new ServiceProvider {
                Id = serviceProvider.Id,
                Code = serviceProvider.Code,
                Title=serviceProvider.Title,
                AssignedToAllUsers = serviceProvider.AssignedToAllUsers,
                Active = serviceProvider.Active,
                ContactId = serviceProvider.ContactId,
                Contact = MapToClient(serviceProvider.Contact),
                DepartmentId = serviceProvider.DepartmentId,
                Department = serviceProvider.Department != null ? MapToClient(serviceProvider.Department) : null,
                Description = serviceProvider.Description,
                IsReferer = serviceProvider.IsReferer,
                ServiceProviderTypeId = serviceProvider.ServiceProviderTypeId,
                ServiceProviderType = serviceProvider.ServiceProviderType != null ? MapToClient(serviceProvider.ServiceProviderType) : null,
                Speciality = serviceProvider.Speciality
            };
            return mappedServiceProvider;
        }

        public static Contact MapToClient(Contact contact)
        {
            Contact mappedContact = new Contact {
                Id = contact.Id,
                Active = contact.Active,
                City = contact.City,
                Country = contact.Country,
                Email = contact.Email,
                Fax = contact.Fax,
                FirstName = contact.FirstName,
                Gender = contact.Gender,
                IsCompany = contact.IsCompany,
                LastName = contact.LastName,
                PhoneNumber = contact.PhoneNumber,
                Photo = contact.Photo,
                Street = contact.Street,
                WebSite = contact.WebSite,
                Zip = contact.Zip
            };
            return mappedContact;
        }

        public static Department MapToClient(Department department)
        {
            Department mappedDepartment = new Department {
                Active = department.Active,
                Id = department.Id,
                Name = department.Name
            };
            return mappedDepartment;
        }

        public static ServiceProviderType MapToClient(ServiceProviderType serviceProviderType)
        {
            ServiceProviderType mappedServiceProviderType = new ServiceProviderType
            {
                Active = serviceProviderType.Active,
                Id = serviceProviderType.Id,
                Name = serviceProviderType.Name
            };
            return mappedServiceProviderType;
        }

        public static Appointment MapToClient(Appointment appointment)
        {
            Appointment mappedAppointment = new Appointment
            {
                Id = appointment.Id,
                Active = appointment.Active,
                EndTime = appointment.EndTime,
                Name = appointment.Name,
                StartTime = appointment.StartTime
            };
            return mappedAppointment;
        }

        public static Patient MapToClient(Patient patient)
        {
            Patient mappedPatient = new Patient
            {
                Active = patient.Active,
                BloodGroup = patient.BloodGroup,
                City = patient.City,
                Country = patient.Country,
                DOB = patient.DOB,
                Email = patient.Email,
                FatherName = patient.FatherName,
                FirstName = patient.FirstName,
                Gender = patient.Gender,
                Id = patient.Id,
                LastName = patient.LastName,
                NationalId = patient.NationalId,
                Occupation = patient.Occupation,
                PhoneNumber = patient.PhoneNumber,
                Photo = patient.Photo,
                Street = patient.Street,
                Zip = patient.Zip
            };
            return mappedPatient;
        }

        public static ServiceProviderAppointment MapToClient(ServiceProviderAppointment serviceProviderAppointment)
        {
            ServiceProviderAppointment mappedServiceProviderAppointment = new ServiceProviderAppointment
            {
                Id = serviceProviderAppointment.Id,
                AppointmentAllowed = serviceProviderAppointment.AppointmentAllowed,
                AppointmentDate = serviceProviderAppointment.AppointmentDate,
                Patient = serviceProviderAppointment.Patient != null ? MapToClient(serviceProviderAppointment.Patient) : null,
                Appointment = serviceProviderAppointment.Appointment != null ? MapToClient(serviceProviderAppointment.Appointment) : null,
                ServiceProvider = serviceProviderAppointment.ServiceProvider != null ? MapToClient(serviceProviderAppointment.ServiceProvider) : null
            };
            return mappedServiceProviderAppointment;
        }
    }
}