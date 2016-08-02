using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Refund")]
    public partial class Refund : EntityBase
    {
        public decimal Amount { get; set; }

        
        public long? InvoiceID { get; set; }
        public long? ReceiptId { get; set; }
        public long PatientServiceId { get; set; }
        public long ApprovedUserID { get; set; }
        public long ItemId { get; set; }

         [ForeignKey("InvoiceID")]
         public virtual PatientInvoice PatientInvoice { get; set; }
         [ForeignKey("ReceiptId")]
         public virtual ReceiptPayment ReceiptPayment { get; set; }
         [ForeignKey("PatientServiceId")]
         public virtual PatientService PatientService { get; set; }
         [ForeignKey("ApprovedUserID")]
         public virtual User ApprovedUser { get; set; }
         [ForeignKey("ItemId")]
         public virtual Item Item { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
