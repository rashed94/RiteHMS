using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("LabReportGroup")]
    public partial class LabReportGroup : EntityBase
    {
        public LabReportGroup()
        {
            this.Items = new List<Item>();
        }

        public string Name { get; set; }

        public virtual ICollection<Item> Items { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
