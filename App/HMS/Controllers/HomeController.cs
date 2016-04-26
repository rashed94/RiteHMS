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

        public JsonResult GetPesrons()
        {
            HMSEntities e = new HMSEntities();
            var result = e.Contacts.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SavePerson()
        {
            Contact contact = new Contact { FirstName = "Muzahidul", LastName = "Islam", Email = "mail.muzahid@gmail.com" };
            HMSEntities e = new HMSEntities();
            e.Contacts.Add(contact);
            e.SaveChanges();

            return new JsonResult();
        }
    }
}