using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("InvestigationReagent")]
    public partial class InvestigationReagent : EntityBase
    {
        public InvestigationReagent()
        {
            
        }

        public long InvestigationId { get; set; }
        public long ReagentId { get; set; }
        public int Quantity { get; set; }
        public long? MeasurementUnitId { get; set; }

        [ForeignKey("InvestigationId")]
        public virtual Item Investigation { get; set; }
        [ForeignKey("ReagentId")]
        public virtual Item Reagent { get; set; }
        [ForeignKey("MeasurementUnitId")]
        public virtual MeasurementUnit MeasurementUnit { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}

