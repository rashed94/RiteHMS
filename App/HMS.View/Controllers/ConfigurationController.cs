using HMS.DAL.Repository;
using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;
using System.IO;
using HMS.View.Mappers;

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
                    ServiceProvider sp = ModelMapper.MapToClient(p);
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


                serviceProvider.Department = null;
                serviceProvider.ServiceProviderType = null;
                if (serviceProvider.Id == 0)
                {
                    serviceProvider = repo.Insert(serviceProvider);
                }
                else
                {
                    serviceProvider = repo.Update(serviceProvider);
                }
                repo.Commit();

                return Json(ModelMapper.MapToClient(serviceProvider), JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult DeleteServiceProvider(int Id)
        {
            using (Repository<ServiceProvider> repo = new Repository<ServiceProvider>())
            {
                repo.DeleteByID(Id, GetLoggedinUserInfo().UserId);
            }
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDoctorsByDepartment(int departmentId, int serviceProviderType)
        {
            using (Repository<ServiceProvider> repo = new Repository<ServiceProvider>())
            {
                List<ServiceProvider> providers = repo.GetByQuery(p => (p.ServiceProviderTypeId == serviceProviderType && p.DepartmentId == departmentId)).ToList();

                List<ServiceProvider> cProviders = new List<ServiceProvider>();
                providers.ForEach(p => 
                {
                    ServiceProvider sp = ModelMapper.MapToClient(p);
                    cProviders.Add(sp);
                });

                return Json(cProviders, JsonRequestBehavior.AllowGet);
            }
        }
    }
}