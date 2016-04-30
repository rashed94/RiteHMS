﻿using DAL;
using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        InitData();
        //using (var db = new DAL.Context())
        //{
        //    var serviceProvider = new ServiceProvider
        //    {
        //        Code = "SP1",
        //        Contact = db.Contacts.FirstOrDefault(),
        //        Department = db.Departments.FirstOrDefault(),
        //        ServiceProviderType = db.ServiceProviderTypes.FirstOrDefault(),
        //        IsReferer = true,
        //        Speciality = "Pediatritian"
        //    };
        //    db.ServiceProviders.Add(serviceProvider);
        //    db.SaveChanges();

        //    var query = db.Contacts.OrderBy(c => c.FirstName);

        //    foreach (var item in query)
        //    {
        //        Console.WriteLine(item.FirstName);
        //    }

        //    Console.WriteLine("Press any key to exit...");
        //    Console.ReadKey();
        //}
    }

    private static void InitData()
    {
        using (var db = new DAL.Context())
        {
            DBUtils.Clear(db.Departments);
            DBUtils.Clear(db.ServiceProviderTypes);
            DBUtils.Clear(db.Items);

            DBUtils.Clear(db.ItemCategories);
            DBUtils.Clear(db.MedicalTypes);
            DBUtils.Clear(db.MeasurementUnits);
            DBUtils.Clear(db.ItemTypes);

            DBUtils.Clear(db.ServiceProviders);
            DBUtils.Clear(db.PatientServices);
            DBUtils.Clear(db.Patients);
            DBUtils.Clear(db.Contacts);

            var entDepartment = new Department { Name = "ENT" };
            db.Departments.Add(entDepartment);
            db.Departments.Add(new Department { Name = "Dermatology" });
            db.Departments.Add(new Department { Name = "Cosmetology" });
            db.Departments.Add(new Department { Name = "Diabetology" });
            db.Departments.Add(new Department { Name = "Gastroentrology" });
            db.Departments.Add(new Department { Name = "Medicine" });
            db.Departments.Add(new Department { Name = "Nephrology" });
            db.Departments.Add(new Department { Name = "Neurology" });
            db.Departments.Add(new Department { Name = "Nutririon & Dietetics" });
            db.Departments.Add(new Department { Name = "Gynecology" });
            db.Departments.Add(new Department { Name = "Oncology" });
            db.Departments.Add(new Department { Name = "Paediatrics" });
            db.Departments.Add(new Department { Name = "Urology" });

            var doctorServiceProvider = new ServiceProviderType { Name = "Doctor" };
            db.ServiceProviderTypes.Add(doctorServiceProvider);
            db.ServiceProviderTypes.Add(new ServiceProviderType { Name = "Surgeon" });
            db.ServiceProviderTypes.Add(new ServiceProviderType { Name = "Anesthetist" });
            db.ServiceProviderTypes.Add(new ServiceProviderType { Name = "Nurse" });

            var drugMedicalType = new MedicalType { Name = "Drug" };
            db.MedicalTypes.Add(drugMedicalType);
            db.MedicalTypes.Add(new MedicalType { Name = "Treatment" });
            db.MedicalTypes.Add(new MedicalType { Name = "Laboratory Test" });
            db.MedicalTypes.Add(new MedicalType { Name = "Surgery" });
            db.MedicalTypes.Add(new MedicalType { Name = "Inpatient Accomodation" });

            var aiItemCategory = new ItemCategory { Name = "Anti-Inflammatory", MedicalType = drugMedicalType };
            db.ItemCategories.Add(aiItemCategory);
            db.ItemCategories.Add(new ItemCategory { Name = "Antihistamine", MedicalType = drugMedicalType });

            var boxMeasUnit = new MeasurementUnit { Name = "Box" };
            db.MeasurementUnits.Add(boxMeasUnit);
            db.MeasurementUnits.Add(new MeasurementUnit { Name = "File" });
            db.MeasurementUnits.Add(new MeasurementUnit { Name = "Inch" });
            db.MeasurementUnits.Add(new MeasurementUnit { Name = "Kg" });

            var inventoryItemType = new ItemType { Name = "Inventory" };
            db.ItemTypes.Add(inventoryItemType);
            db.ItemTypes.Add(new ItemType { Name = "Service" });

            db.Items.Add(new Item
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
            db.Contacts.Add(muzahid);
            db.Contacts.Add(rashed);
            db.Contacts.Add(kashpia);

            db.ServiceProviders.Add(new ServiceProvider
            {
                Contact = muzahid,
                Department = entDepartment,
                AssignedToAllUsers = true,
                Code = "D001",
                IsReferer = false,
                Speciality = "Surgery",
                ServiceProviderType = doctorServiceProvider
            });

            db.Patients.Add(new Patient
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

            db.SaveChanges();
        }
    }
}