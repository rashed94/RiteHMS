using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Requisition")]
    public partial class Requisition : EntityBase
    {
        public System.DateTime RequisitionDate { get; set; }
        public long RequisitionBy { get; set; }
        public string Purpose { get; set; }
        public long? ToStoreId { get; set; }
        public long  FromStoreId { get; set; }
        public bool IsSubStoreRequisition { get; set; }
        public string Note { get; set; }




        [ForeignKey("RequisitionBy")]
        public virtual User RequisitionByUser { get; set; }
        [ForeignKey("ToStoreId")]
        public virtual Store ToStore { get; set; }
        [ForeignKey("FromStoreId")]
        public virtual Store FromStore { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}


