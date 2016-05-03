using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using HMS.DAL;
using HMS.Model.Core;
using HMS.DAL.Repository;

namespace HMS.Controllers
{
    public class ContactController : Controller
    {
        //private Repository<Contact> _Repository;
        private ContactRepository _Repository;

        public ContactController()
        {
             //_Repository = new Repository<Contact>(new Context());
            _Repository = new ContactRepository(new Context());
        }

        // GET: Contacts/GetContacts
        public JsonResult GetContacts()
        {
            List<Contact> contacts = _Repository.GetByQuery().ToList();
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

        // GET: Contacts/GetContactById/5
        public JsonResult GetContactById(long? id)
        {
            if (id == null)
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest), JsonRequestBehavior.AllowGet);
            }
            Contact contact = _Repository.GetById(id.Value);
            if (contact == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }
            return Json(contact, JsonRequestBehavior.AllowGet);
        }

        // GET: Contacts/GetContactByPhone/phoneNumber/01833353657
        public JsonResult GetContactByPhone(string phoneNumber)
        {
            if (string.IsNullOrEmpty(phoneNumber))
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.BadRequest), JsonRequestBehavior.AllowGet);
            }
            Contact contact = _Repository.GetByPhoneNumber(phoneNumber);
            if (contact == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }
            return Json(contact, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult CreateContact(Contact contact)
        {
            if (ModelState.IsValid)
            {
                _Repository.Insert(contact);
                _Repository.SaveChanges();
            }
            return Json(contact, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult UpdateContact(Contact contact)
        {
            if (ModelState.IsValid)
            {
                _Repository.Entry(contact).State = EntityState.Modified;
                _Repository.SaveChanges();
            }
            return Json(contact, JsonRequestBehavior.AllowGet);
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
                _Repository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
