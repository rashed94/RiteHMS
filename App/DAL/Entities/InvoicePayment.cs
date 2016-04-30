using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("InvoicePayment")]
    public partial class InvoicePayment : EntityBase
    {
        public long InvoiceId { get; set; }
        public decimal Amount { get; set; }
        public long? PaymentID { get; set; }
        public long UserId { get; set; }
    
        public virtual PatientInvoice PatientInvoice { get; set; }
        public virtual Payment Payment { get; set; }
    }
}
