using HMS.DAL.Repository;
using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;
using System.IO;

namespace HMS.Controllers
{
    public class ConfigurationController : BaseController
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

        public JsonResult GetDepartments()
        {
            using (Repository<Department> repo = new Repository<Department>())
            {
                IList<Department> departments = (IList<Department>)repo.GetByQuery();
                IList<Department> mappedDepartments = new List<Department>();
                departments.ToList().ForEach(d => mappedDepartments.Add(new Department { Id = d.Id, Name = d.Name }));
                return Json(mappedDepartments, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult SaveServiceProvider(ServiceProvider serviceProvider)
        {
            using (Repository<ServiceProvider> repo = new Repository<ServiceProvider>())
            {
                if (Request.Files.Count > 0)
                {
                    HttpPostedFileBase file = Request.Files[0];
                    string fileName = string.Concat(Guid.NewGuid().ToString(), Path.GetExtension(file.FileName));
                    string fileNameWithPath = Path.Combine(_PhotoLocation, fileName);
                    file.SaveAs(fileNameWithPath);
                    if (serviceProvider.Contact.Photo != null)
                    {
                        System.IO.File.Delete(Path.Combine(_PhotoLocation, serviceProvider.Contact.Photo));
                    }
                    serviceProvider.Contact.Photo = fileName;
                }

                if (serviceProvider.Id == 0)
                {
                    serviceProvider = repo.Insert(serviceProvider);
                }
                else
                {
                    if (serviceProvider.Contact.Id != 0 && serviceProvider.ContactId == 0)
                    {
                        serviceProvider.ContactId = serviceProvider.Contact.Id;
                    }
                    serviceProvider = repo.Update(serviceProvider);
                }
                repo.Commit();

                return Json(serviceProvider, JsonRequestBehavior.AllowGet);
            }
        }
    }
}