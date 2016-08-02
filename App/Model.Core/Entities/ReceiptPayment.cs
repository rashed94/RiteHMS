using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace HMS.Model.Core
{
    [Table("ReceiptPayment")]
    public partial class ReceiptPayment : EntityBase
    {
        public ReceiptPayment()
        {
           
            this.PatientServices = new List<PatientService>();
       
        }
        [ForeignKey("Payment")]
        public long? PaymentId { get; set; }
        [ForeignKey("Patient")]
        public long PatientId { get; set; }
        public long ItemId { get; set; }
        public System.DateTime ReceiptDate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal? TotalDiscount { get; set; }
        public bool IsRefunded { get; set; }


       
        public virtual Patient Patient { get; set; }
        public virtual Payment Payment { get; set; }

        public virtual IList<PatientService> PatientServices { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
