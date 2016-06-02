using HMS.DAL.Repository;
using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HMS.View.Controllers
{
    public class ConfigurationController : Controller
    {
        public ConfigurationController()
        {

        }

        public JsonResult GetServiceProviderTypes()
        {
            using (Repository<ServiceProviderType> repo = new Repository<ServiceProviderType>())
            {
                List<ServiceProviderType> providerTypes = repo.GetByQuery().ToList();

                List<ServiceProviderType> cProviderTypes = new List<ServiceProviderType>();
                providerTypes.ForEach(p => cProviderTypes.Add(new ServiceProviderType { Id = p.Id, Name = p.Name }));

                return Json(cProviderTypes, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetServiceProviderByType(int type)
        {
            using (Repository<ServiceProvider> repo = new Repository<ServiceProvider>())
            {
                List<ServiceProvider> providers = repo.GetByQuery(p => p.ServiceProviderTypeId == type).ToList();

                List<ServiceProvider> cProviders = new List<ServiceProvider>();
                providers.ForEach(p => 
                {
                    ServiceProvider sp = new ServiceProvider { Id = p.Id, Code = p.Code, Speciality = p.Speciality, AssignedToAllUsers = p.AssignedToAllUsers };
                    sp.Contact = new Contact { Id = p.Contact.Id, City = p.Contact.City, Country = p.Contact.Country, Email = p.Contact.Email, Fax = p.Contact.Fax, FirstName = p.Contact.FirstName, IsCompany = p.Contact.IsCompany, LastName = p.Contact.LastName, PhoneNumber = p.Contact.PhoneNumber, Photo = p.Contact.Photo, Street = p.Contact.Street, WebSite = p.Contact.WebSite, Zip = p.Contact.Zip };
                    sp.Department = new Department { Id = p.Department.Id, Name = p.Department.Name};
                    cProviders.Add(sp);
                });

                return Json(cProviders, JsonRequestBehavior.AllowGet);
            }
        }
    }
}