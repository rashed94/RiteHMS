using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("PatientService")]
    public partial class PatientService : EntityBase
    {
         [ForeignKey("Patient")]
        public long PatientID { get; set; }
        [ForeignKey("Item")]
        public long ItemId { get; set; }
         [ForeignKey("PatientInvoice")]
        public long? InvoiceID { get; set; }
         [ForeignKey("ReceiptPayment")]
        public long? ReceiptId { get; set; }

         [ForeignKey("PatientAdmission")]
         public long? PatientAdmissionId { get; set; }

        public decimal ServiceListPrice { get; set; }
        public decimal ServiceActualPrice { get; set; }
        public int ServiceQuantity { get; set; }
        public System.DateTime ServiceDate { get; set; }
         [ForeignKey("ServiceProvider")]
        public long? ServiceProviderId { get; set; }
        public decimal? Discount { get; set; }
        public bool DiscountAfterInvoice { get; set; }
        public bool? Refund { get; set; }
        public bool? RefundApproval { get; set; }
        public string RefundNote { get; set; }
        public bool? Billed { get; set; }

        public decimal ReferralFee { get; set; }
        public bool? ReferralFeePaid { get; set; }
        public System.DateTime DeliveryDate { get; set; }
        public string DeliveryTime { get; set; }
        public string ReportFormatName { get; set; }
        public long? LabStatusId { get; set; }

        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; }
         
        public virtual Patient Patient { get; set; }
      
        public virtual PatientInvoice PatientInvoice { get; set; }
       
        public virtual ServiceProvider ServiceProvider { get; set; }
       
        public virtual ReceiptPayment ReceiptPayment { get; set; }

        public virtual PatientAdmission PatientAdmission { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
