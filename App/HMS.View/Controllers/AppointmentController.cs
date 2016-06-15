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
    public class AppointmentController : BaseController
    {
        public AppointmentController()
        {

        }
        
        public JsonResult GetAppointments()
        {
            using (Repository<Appointment> repo = new Repository<Appointment>())
            {
                IList<Appointment> appointments = (IList<Appointment>)repo.GetByQuery();
                IList<Appointment> mappedAppointments = new List<Appointment>();
                appointments.ToList().ForEach(a => mappedAppointments.Add(new Appointment { Id = a.Id, Name = a.Name, StartTime = a.StartTime, EndTime = a.EndTime }));
                return Json(mappedAppointments, JsonRequestBehavior.AllowGet);
            }
        }
    }
}