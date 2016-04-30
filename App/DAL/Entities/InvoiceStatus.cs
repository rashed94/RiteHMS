using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
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
    }
}
