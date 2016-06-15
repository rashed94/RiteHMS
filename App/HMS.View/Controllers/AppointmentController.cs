using HMS.DAL.Repository;
using HMS.Model.Core;
using HMS.View.Mappers;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

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

        public JsonResult GetDoctorAppointmentsByPatientId(int patientId)
        {
            using (Repository<ServiceProviderAppointment> repository = new Repository<ServiceProviderAppointment>())
            {
                List<ServiceProviderAppointment> spAppointments = repository.GetByQuery(p => p.PatientId == patientId).ToList();
                List<ServiceProviderAppointment> mappedAppointments = new List<ServiceProviderAppointment>();
                spAppointments.ForEach(x => {
                    mappedAppointments.Add(ModelMapper.MapToClient(x));
                });
                return Json(mappedAppointments, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult SaveDoctorAppointment(ServiceProviderAppointment doctorAppointment)
        {
            using (Repository<ServiceProviderAppointment> repository = new Repository<ServiceProviderAppointment>())
            {
                return Json(repository.Insert(doctorAppointment));
            }
        }
    }
}