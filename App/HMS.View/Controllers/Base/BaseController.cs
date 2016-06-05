using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HMS.Controllers
{
    public class BaseController : Controller
    {
        protected static readonly string _PhotoLocation = ConfigurationManager.AppSettings["PhotoLocation"];
    }
}