using DAL;
using DAL.Entities;
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
            Context ctx = new Context();
            var result = ctx.Contacts.ToList();
            
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPersonById(int id)
        {
            Context ctx = new Context();
            return Json(ctx.Contacts.Find(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult SavePerson()
        {
            Contact contact = new Contact { FirstName = "Muzahidul", LastName = "Islam", PhoneNumber = "01833353657", Email = "mail.muzahid@gmail.com" };
            Context ctx = new Context();
            ctx.Contacts.Add(contact);
            ctx.SaveChanges();

            return new JsonResult();
        }
    }
}