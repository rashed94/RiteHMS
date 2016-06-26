using HMS.Controllers.Classes;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;

namespace HMS.Controllers
{
    public class BaseController : Controller
    {
        protected static readonly string _PhotoLocation = ConfigurationManager.AppSettings["PhotoLocation"];

        public UserClaim GetLoggedinUserInfo()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;

            return new UserClaim
            {
                UserId = Convert.ToInt64(claims.Where(r => r.Type == ClaimTypes.SerialNumber).FirstOrDefault().Value),
                UserName = claims.Where(r => r.Type == ClaimTypes.GivenName).FirstOrDefault().Value,
                FullName = claims.Where(r => r.Type == ClaimTypes.Name).FirstOrDefault().Value,
                PhoneNumber = claims.Where(r => r.Type == ClaimTypes.MobilePhone).FirstOrDefault().Value
            };
        }
    }
}