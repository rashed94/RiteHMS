using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("RequisitionStatus")]
    public partial class RequisitionStatus : EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }


        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}


