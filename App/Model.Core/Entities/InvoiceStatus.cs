using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("InvoiceStatus")]
    public partial class InvoiceStatus : EntityBase
    {
        public InvoiceStatus()
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
