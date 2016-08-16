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