using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("LabReportFormat")]
    public partial class LabReportFormat : EntityBase
    {
        public LabReportFormat()
        {

        }

        public string Name { get; set; }
        public string RichContent { get; set; }
        public long? ItemId { get; set; }

  

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
