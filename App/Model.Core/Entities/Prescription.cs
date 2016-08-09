using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Prescription")]
    public partial class Prescription : EntityBase
    {
        public System.DateTime Date { get; set; }
        public long PatientId { get; set; }
        public long ServiceProviderId { get; set; }
        public string BloodPressure { get; set; }
        public string Weight { get; set; }
        public string Height { get; set; }
        public System.DateTime ModifiedDate { get; set; }


        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }

        [ForeignKey("ServiceProviderId")]
        public virtual ServiceProvider ServiceProvider { get; set; }


        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}