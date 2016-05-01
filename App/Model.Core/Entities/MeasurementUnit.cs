using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("MeasurementUnit")]
    public partial class MeasurementUnit : EntityBase
    {
        public MeasurementUnit()
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
