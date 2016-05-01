using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("PatientService")]
    public partial class PatientService : EntityBase
    {
        public long PatientID { get; set; }
        public long ItemID { get; set; }
        [ForeignKey("PatientInvoice")]
        public long? InvoiceID { get; set; }
        public decimal ServiceListPrice { get; set; }
        public decimal ServiceActualPrice { get; set; }
        public int ServiceQuantity { get; set; }
        public System.DateTime ServiceDate { get; set; }
        public long? UserId { get; set; }
        public decimal? Discount { get; set; }
        public bool? Refund { get; set; }
        public bool? Billed { get; set; }

        public virtual Item Item { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual PatientInvoice PatientInvoice { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
