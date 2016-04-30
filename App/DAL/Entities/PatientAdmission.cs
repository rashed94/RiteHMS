using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("PatientAdmission")]
    public partial class PatientAdmission : EntityBase
    {
        public long PatientId { get; set; }
        public System.DateTime AdmissionDate { get; set; }
        public System.DateTime? DischargeDate { get; set; }
        public long? ServiceProviderId { get; set; }
        public long? RefererId { get; set; }
        public long? DepartmentId { get; set; }
        public string Notes { get; set; }
    
        public virtual Department Department { get; set; }
        public virtual ServiceProvider ServiceProvider { get; set; }
        public virtual ServiceProvider ServiceProvider1 { get; set; }
    }
}
