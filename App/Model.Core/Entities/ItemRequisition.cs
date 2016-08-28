using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("ItemRequisition")]
    public partial class ItemRequisition : EntityBase
    {

        public long ItemId { get; set; }
        public long RequisitionId { get; set; }
        public long ApprovedBy { get; set; }
        public System.DateTime ApprovalDate { get; set; }
        public int Quantity { get; set; }
        public long? MeasurementUnitId { get; set; }
        public long RequisitionStatusId { get; set; }





        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; }
        [ForeignKey("ApprovedBy")]
        public virtual User ApprovedByUser { get; set; }
        [ForeignKey("MeasurementUnitId")]
        public virtual MeasurementUnit MeasurementUnit { get; set; }

        [ForeignKey("RequisitionStatusId")]
        public virtual RequisitionStatus RequisitionStatus { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
