using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HMS.Controllers
{
    public class HomeController : Controller
    {
        //internal static JsonNetMVCHelper.JsonHelper _JsonHelper = new JsonNetMVCHelper.JsonHelper();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult GetPersons()
        {
            HMSEntities e = new HMSEntities();
            var result = e.Contacts.ToList();
            
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPersonById(int id)
        {
            HMSEntities e = new HMSEntities();
            return Json(e.Contacts.Find(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult SavePerson()
        {
            Contact contact = new Contact { FirstName = "Muzahidul", LastName = "Islam", PhoneNumber = "01833353657", Email = "mail.muzahid@gmail.com" };
            HMSEntities e = new HMSEntities();
            e.Contacts.Add(contact);
            e.SaveChanges();

            return new JsonResult();
        }
    }
}