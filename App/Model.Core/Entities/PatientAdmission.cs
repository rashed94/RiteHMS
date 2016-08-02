using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("PatientAdmission")]
    public partial class PatientAdmission : EntityBase
    {

        public PatientAdmission()
        {
           
            this.PatientServices = new List<PatientService>();
       
        }


        public long PatientId { get; set; }
        public System.DateTime AdmissionDate { get; set; }
        public System.DateTime? DischargeDate { get; set; }
        public long? ServiceProviderId { get; set; }
        public long? RefererId { get; set; }
        public long? DepartmentId { get; set; }
        public long? BedId { get; set; }
        public bool IsReleased { get; set; }
        public string Notes { get; set; }


        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; }
        [ForeignKey("ServiceProviderId")]
        public virtual ServiceProvider ServiceProvider { get; set; }
        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
        [ForeignKey("BedId")]
        public virtual Item Item { get; set; }

        public virtual ICollection<PatientService> PatientServices { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
