using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("DrugDosage")]
    public partial class DrugDosage : EntityBase
    {
        public DrugDosage()
        {
            this.ItemDefaults = new List<ItemDefault>();
        }
    
        public string Name { get; set; }
    
        public virtual ICollection<ItemDefault> ItemDefaults { get; set; }
    }
}
