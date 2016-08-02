using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("ServiceProviderAppointment")]
    public partial class ServiceProviderAppointment : EntityBase
    {
        public DateTime AppointmentDate { get; set; }
        public long ServiceProviderId { get; set; }
        public long AppointmentId { get; set; }
        public long PatientId { get; set; }
        public bool AppointmentAllowed { get; set; }

        [ForeignKey("ServiceProviderId")]
        public virtual ServiceProvider ServiceProvider { get; set; }
        [ForeignKey("AppointmentId")]
        public virtual Appointment Appointment { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
