using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using HMS.Model.Core;
using HMS.DAL.Repository;
using Newtonsoft.Json;
using System;
using System.Web;
using Newtonsoft.Json.Linq;
using System.Collections;
using System.Configuration;

namespace HMS.Controllers
{
    public class ContactController : BaseController
    {
        //private Repository<Contact> _Repository;
        //private ContactRepository _Repository;

        public ContactController()
        {
             //_Repository = new Repository<Contact>(new Context());
            //_Repository = new ContactRepository(new Context());
        }

        // GET: Contacts/GetContacts
        public JsonResult GetContacts()
        {
            using (ContactRepository repository = new ContactRepository())
            {
                List<Contact> contacts = repository.GetByQuery().ToList();
                if (contacts == null)
                {
                    return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
                }

                List<Contact> onlyContacts = new List<Contact>();
                contacts.ForEach(c => onlyContacts.Add(new Contact
                {
                    Id = c.Id,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    PhoneNumber = c.PhoneNumber,
                    Email = c.Email,
                    City = c.City,
                    Country = c.Country,
                    Fax = c.Fax,
                    Street = c.Street,
                    IsCompany = c.IsCompany,
                    Active = c.Active,
                    Photo = c.Photo,
                    WebSite = c.WebSite,
                    Zip = c.Zip
                }));

                return Json(onlyContacts, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Contacts/GetContactById/5
        public JsonResult GetContactById(long? id)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest), JsonRequestBehavior.AllowGet);
            }
            using (ContactRepository repository = new ContactRepository())
            {
                Contact c = repository.GetById(id.Value);
                if (c == null)
                {
                    return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
                }
                return Json(new Contact
                {
                    Id = c.Id,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    PhoneNumber = c.PhoneNumber,
                    Email = c.Email,
                    City = c.City,
                    Country = c.Country,
                    Fax = c.Fax,
                    Street = c.Street,
                    IsCompany = c.IsCompany,
                    Active = c.Active,
                    Photo = c.Photo,
                    WebSite = c.WebSite,
                    Zip = c.Zip
                }, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Contacts/GetContactByPhone/phoneNumber/01833353657
        public JsonResult GetContactByPhone(string phoneNumber)
        {
            if (string.IsNullOrEmpty(phoneNumber))
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest), JsonRequestBehavior.AllowGet);
            }
            using (ContactRepository repository = new ContactRepository())
            {
                Contact contact = repository.GetByPhoneNumber(phoneNumber);
                if (contact == null)
                {
                    return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
                }
                return Json(contact, JsonRequestBehavior.AllowGet);
            }
        }

        [System.Web.Mvc.HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult CreateContact(Contact contact)
        {
            if (ModelState.IsValid)
            {
                using (ContactRepository repository = new ContactRepository())
                {
                    contact.UserId = GetLoggedinUserInfo().UserId;
                    repository.Insert(contact);
                }
            }
            return Json(contact, JsonRequestBehavior.AllowGet);
        }

        [System.Web.Mvc.HttpPost]
        public JsonResult UploadImage()
        {
            var fName = "";
            if (Request.Files.Count > 0)
            {
                HttpPostedFileBase file = Request.Files[0];
                fName = Path.Combine(_PhotoLocation, string.Format("{0}{1}", Request.Form["Id"], Path.GetExtension(file.FileName)));
                file.SaveAs(fName);
            }
            return Json(new
            {
                FileName = fName
            });
        }

        [System.Web.Mvc.HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult UpdateContact(Contact contact, string filePath)
        {
            if (ModelState.IsValid)
            {
                using (ContactRepository repository = new ContactRepository())
                {
                    if (!string.IsNullOrEmpty(filePath))
                    {
                        contact.Photo = Path.GetFileName(filePath);
                    }
                    contact.UserId = GetLoggedinUserInfo().UserId;
                    repository.Update(contact);
                }
            }
            return Json("Success");
        }

        //public JsonResult Delete(long? id)
        //{
        //    if (id == null)
        //    {
        //        return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest));
        //    }
        //    Contact contact = _Repository.GetById(id);
        //    if (contact == null)
        //    {
        //        return Json(HttpNotFound());
        //    }
        //    _Repository.Delete(contact);

        //    return Json("Entity deleted");
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                //_Repository.Dispose();
            }
            base.Dispose(disposing);
        }
    }

    class UploadObject
    {
        public string FilePath { get; set; }
        public Contact Contact { get; set; }
    }
}
