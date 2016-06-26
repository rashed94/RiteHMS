using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Payment")]
    public partial class Payment : EntityBase
    {
        public Payment()
        {
            this.InvoicePayments = new List<InvoicePayment>();
            this.ReceiptPayments = new List<ReceiptPayment>();
        }
    
        public decimal Amount { get; set; }
        public decimal? DeductionAmount { get; set; }
        public long PaymentTypeId { get; set; }
        public long? PatientID { get; set; }
        public System.DateTime Date { get; set; }
    
        public virtual ICollection<InvoicePayment> InvoicePayments { get; set; }
        public virtual Patient Patient { get; set; }
       
        public virtual PaymentType PaymentType { get; set; }
        public virtual ICollection<ReceiptPayment> ReceiptPayments { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
