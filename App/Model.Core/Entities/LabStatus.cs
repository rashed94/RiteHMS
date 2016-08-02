using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("LabStatus")]
    public partial class LabStatus : EntityBase
    {
        public LabStatus()
        {
            this.PatientInvoices = new List<PatientInvoice>();
        }

        public string Name { get; set; }

        public virtual ICollection<PatientInvoice> PatientInvoices { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
