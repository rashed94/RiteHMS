using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
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
    }
}
