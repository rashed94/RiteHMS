using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("Refund")]
    public partial class Refund : EntityBase
    {
        public decimal Amount { get; set; }
        public long InvoiceID { get; set; }
        public long UserID { get; set; }
        public long ApprovedUserID { get; set; }
    
        public virtual PatientInvoice PatientInvoice { get; set; }
    }
}
