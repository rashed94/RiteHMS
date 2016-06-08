using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HMS.View.Mappers
{
    public class ModelMapper
    {
        public static ServiceProvider MapToClient(ServiceProvider serviceProvider)
        {
            ServiceProvider mappedServiceProvider = new ServiceProvider {
                Id = serviceProvider.Id,
                Code = serviceProvider.Code,
                AssignedToAllUsers = serviceProvider.AssignedToAllUsers,
                Active = serviceProvider.Active,
                ContactId = serviceProvider.ContactId,
                Contact = MapToClient(serviceProvider.Contact),
                DepartmentId = serviceProvider.DepartmentId,
                Department = serviceProvider.Department != null ? MapToClient(serviceProvider.Department) : null,
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
    }
}