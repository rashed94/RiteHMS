using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("InvoicePayment")]
    public partial class InvoicePayment : EntityBase
    {
        public long PatientInvoiceId { get; set; }
        public decimal Amount { get; set; }
        public long? PaymentID { get; set; }
        public long UserId { get; set; }
    
        public virtual PatientInvoice PatientInvoice { get; set; }
        public virtual Payment Payment { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
