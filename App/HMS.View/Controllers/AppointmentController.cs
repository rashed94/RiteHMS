using HMS.DAL.Repository;
using HMS.Model.Core;
using HMS.View.Mappers;
using System;
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
        
        public JsonResult GetAppointments(int doctorId, DateTime date)
        {
            var appointmentDectionary = new Dictionary<long, Appointment>();
            IList<Appointment> mappedAppointments = new List<Appointment>();

            using (Repository<Appointment> repo = new Repository<Appointment>())
            {
               
                IList<Appointment> appointments = (IList<Appointment>)repo.GetByQuery();
                appointments.ToList().ForEach(a => mappedAppointments.Add(new Appointment { Id = a.Id, Name = a.Name, StartTime = a.StartTime, EndTime = a.EndTime, UserId = a.UserId, IsBooked = a.IsBooked }));
            }

            using (Repository<ServiceProviderAppointment> repo = new Repository<ServiceProviderAppointment>())
            {
                List<ServiceProviderAppointment> spAppointments = repo.GetByQuery(p => p.ServiceProviderId == doctorId && p.AppointmentDate == date && p.Active==true).ToList();

                appointmentDectionary = mappedAppointments.ToDictionary(a => a.Id);
                spAppointments.ForEach(x => {
                    appointmentDectionary[x.AppointmentId].IsBooked = true;
                });
            }

            return Json(new {
                AppointmentSlots = appointmentDectionary.Values
            }, JsonRequestBehavior.AllowGet);
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
                doctorAppointment.UserId = GetLoggedinUserInfo().UserId;
                return Json(repository.Insert(doctorAppointment));
            }
        }

        public JsonResult CancelAppointment(int id)
        {
            using (Repository<ServiceProviderAppointment> repository = new Repository<ServiceProviderAppointment>())
            {
                repository.DeleteByID(id, GetLoggedinUserInfo().UserId);
                return Json(new {
                    Status = "Success"
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}