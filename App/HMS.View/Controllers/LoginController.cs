using HMS.CryptoHelper;
using HMS.DAL.Repository;
using HMS.Model.Core;
using HMS.Controllers.Classes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace HMS.Controllers
{
    public class LoginController : BaseController
    {
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(UserViewModel model, string returnUrl)
        {
            using (UserRepository userRepository = new UserRepository())
            {
                var user = userRepository.GetByUserName(model.UserName);

                using (ContactRepository contactRepository = new ContactRepository())
                {
                    user.Contact = contactRepository.GetById(user.ContactId);

                    if (Cryptography.VerifyHashedPassword(user.Password, model.Password))
                    {
                        var identity = new ClaimsIdentity(new[] {
                            new Claim(ClaimTypes.SerialNumber, user.Id.ToString()),
                            new Claim(ClaimTypes.GivenName, user.UserName),
                            new Claim(ClaimTypes.MobilePhone, user.Contact.PhoneNumber),
                            new Claim(ClaimTypes.Name, string.Format("{0} {1}", user.Contact.FirstName, user.Contact.LastName ?? ""))
                        }, "ApplicationCookie");

                        var ctx = Request.GetOwinContext();
                        var authManager = ctx.Authentication;

                        authManager.SignIn(identity);
                        return Redirect(GetRedirectUrl(model.ReturnUrl));
                    }
                }
            }

            ModelState.AddModelError("", "Invalid username or password");
            return View();
        }

        private string GetRedirectUrl(string returnUrl)
        {
            if (string.IsNullOrEmpty(returnUrl) || !Url.IsLocalUrl(returnUrl))
            {
                return Url.Action("index", "home");
            }

            return returnUrl;
        }

        public ActionResult GetLoggedinUser()
        {            
            return Json(base.GetLoggedinUserInfo(), JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public ActionResult Manage()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Manage(UserViewModel model)
        {
            return null;
        }

        public ActionResult LogOff()
        {
            var ctx = Request.GetOwinContext();
            var authManager = ctx.Authentication;

            authManager.SignOut("ApplicationCookie");
            return RedirectToAction("index", "home");
        }

        protected override void Dispose(bool disposing)
        {

        }
    }
}