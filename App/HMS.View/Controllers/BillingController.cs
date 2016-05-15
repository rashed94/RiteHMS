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
    public class BillingController : Controller
    {
        private IRepository<Patient> _Repository;

        public BillingController()
        {
           // _Repository = new Repository<Patient>(new Context());
        }

     

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                //_Repository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
