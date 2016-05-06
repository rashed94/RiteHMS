using HMS.DAL;
using HMS.DAL.Repository;
using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        log4net.ILog logger = log4net.LogManager.GetLogger("Logger");

        using (Context context = new Context())
        {
            InitData(context);

            IRepository<ServiceProvider> serviceProviderRepo = new Repository<ServiceProvider>(context);
            ContactRepository contactRepo = new ContactRepository(context);
            IRepository<Department> departmentRepo = new Repository<Department>(context);
            IRepository<ServiceProviderType> serviceProviderTypeRepo = new Repository<ServiceProviderType>(context);

            serviceProviderRepo.Insert(new ServiceProvider
            {
                Code = "SP1",
                Contact = contactRepo.GetByPhoneNumber("01833353657"),
                Department = departmentRepo.GetFirst(d => d.Name == "ENT"),
                ServiceProviderType = serviceProviderTypeRepo.GetFirst(d => d.Name == "Doctor"),
                IsReferer = true,
                Speciality = "Paediatritian"
            });
            context.SaveChanges();

            logger.Debug("All data insertion completed.");
        }
    }

    private static void InitData(Context context)
    {
        Repository<Department> deptRepo = new Repository<Department>(context);
        Repository<ServiceProviderType> serviceProviderTypeRepo = new Repository<ServiceProviderType>(context);
        Repository<Item> itemRepo = new Repository<Item>(context);

        Repository<ItemCategory> itemCategoryRepo = new Repository<ItemCategory>(context);
        Repository<MedicalType> medicalTypeRepo = new Repository<MedicalType>(context);
        Repository<MeasurementUnit> measurementUnitRepo = new Repository<MeasurementUnit>(context);
        Repository<ItemType> itemTypeRepo = new Repository<ItemType>(context);

        Repository<PatientService> patientServiceRepo = new Repository<PatientService>(context);
        Repository<ServiceProvider> serviceProvidereRepo = new Repository<ServiceProvider>(context);
        Repository<Patient> patientRepo = new Repository<Patient>(context);
        Repository<Contact> contactRepo = new Repository<Contact>(context);

        deptRepo.DeleteAll();
        serviceProviderTypeRepo.DeleteAll();
        itemRepo.DeleteAll();
        itemCategoryRepo.DeleteAll();
        medicalTypeRepo.DeleteAll();
        measurementUnitRepo.DeleteAll();
        itemTypeRepo.DeleteAll();
        patientServiceRepo.DeleteAll();
        serviceProvidereRepo.DeleteAll();
        patientRepo.DeleteAll();
        contactRepo.DeleteAll();

        context.SaveChanges();


        var entDepartment = new Department { Name = "ENT" };
        deptRepo.Insert(entDepartment);
        deptRepo.Insert(new Department { Name = "Dermatology" });
        deptRepo.Insert(new Department { Name = "Cosmetology" });
        deptRepo.Insert(new Department { Name = "Diabetology" });
        deptRepo.Insert(new Department { Name = "Gastroentrology" });
        deptRepo.Insert(new Department { Name = "Medicine" });
        deptRepo.Insert(new Department { Name = "Nephrology" });
        deptRepo.Insert(new Department { Name = "Neurology" });
        deptRepo.Insert(new Department { Name = "Nutririon & Dietetics" });
        deptRepo.Insert(new Department { Name = "Gynecology" });
        deptRepo.Insert(new Department { Name = "Oncology" });
        deptRepo.Insert(new Department { Name = "Paediatrics" });
        deptRepo.Insert(new Department { Name = "Urology" });

        var doctorServiceProvider = new ServiceProviderType { Name = "Doctor" };
        serviceProviderTypeRepo.Insert(doctorServiceProvider);
        serviceProviderTypeRepo.Insert(new ServiceProviderType { Name = "Surgeon" });
        serviceProviderTypeRepo.Insert(new ServiceProviderType { Name = "Anesthetist" });
        serviceProviderTypeRepo.Insert(new ServiceProviderType { Name = "Nurse" });

        var drugMedicalType = new MedicalType { Name = "Drug" };
        medicalTypeRepo.Insert(drugMedicalType);
        medicalTypeRepo.Insert(new MedicalType { Name = "Treatment" });
        medicalTypeRepo.Insert(new MedicalType { Name = "Laboratory Test" });
        medicalTypeRepo.Insert(new MedicalType { Name = "Surgery" });
        medicalTypeRepo.Insert(new MedicalType { Name = "Inpatient Accomodation" });

        var aiItemCategory = new ItemCategory { Name = "Anti-Inflammatory", MedicalType = drugMedicalType };
        itemCategoryRepo.Insert(aiItemCategory);
        itemCategoryRepo.Insert(new ItemCategory { Name = "Antihistamine", MedicalType = drugMedicalType });

        var boxMeasUnit = new MeasurementUnit { Name = "Box" };
        measurementUnitRepo.Insert(boxMeasUnit);
        measurementUnitRepo.Insert(new MeasurementUnit { Name = "File" });
        measurementUnitRepo.Insert(new MeasurementUnit { Name = "Inch" });
        measurementUnitRepo.Insert(new MeasurementUnit { Name = "Kg" });

        var inventoryItemType = new ItemType { Name = "Inventory" };
        itemTypeRepo.Insert(inventoryItemType);
        itemTypeRepo.Insert(new ItemType { Name = "Service" });

        itemRepo.Insert(new Item
        {
            Name = "Napa Extend",
            MedicalType = drugMedicalType,
            ItemType = inventoryItemType,
            BuyPrice = 10,
            SalePrice = 14.5M,
            Code = "P001",
            GenericName = "Paracetamol",
            ItemCategory = new ItemCategory { Name = "CAT-1", MedicalType = drugMedicalType },
            MeasurementUnit = boxMeasUnit
        });

        Contact muzahid = new Contact { FirstName = "Muzahidul", LastName = "Islam", PhoneNumber = "01833353657", Email = "mailmuzahid@gmail.com", City = "Dhaka" };
        Contact rashed = new Contact { FirstName = "Rashidul", LastName = "Alam", PhoneNumber = "017xxxxxxx", Email = "rashed94@gmail.com", City = "Dhaka" };
        Contact kashpia = new Contact { FirstName = "Kashpia", LastName = "Naharin", PhoneNumber = "0171xxxxxx", Email = "kashpia@gmail.com", City = "Feni" };
        contactRepo.Insert(muzahid);
        contactRepo.Insert(rashed);
        contactRepo.Insert(kashpia);

        //db.ServiceProviders.Add(new ServiceProvider
        //{
        //    Contact = muzahid,
        //    Department = entDepartment,
        //    AssignedToAllUsers = true,
        //    Code = "D001",
        //    IsReferer = false,
        //    Speciality = "Surgery",
        //    ServiceProviderType = doctorServiceProvider
        //});

        patientRepo.Insert(new Patient
        {
            FirstName = "Masum",
            LastName = "Ahammed",
            Gender = true,
            NationalId = "269321844923",
            PhoneNumber = "01713738465",
            Occupation = "Service",
            Email = "masum.ahammed@gmail.com",
            FatherName = "ABC Ahammed",
            DOB = new DateTime(1980, 6, 21),
            City = "Dhaka",
            Country = "Bangladesh",
            BloodGroup = "O+",
            Street = "Mohammadia Housing Society",
            Zip = "1207"
        });

        context.SaveChanges();
    }
}