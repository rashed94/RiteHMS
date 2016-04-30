using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("DrugAdministration")]
    public partial class DrugAdministration : EntityBase
    {
        public DrugAdministration()
        {
            this.ItemDefaults = new List<ItemDefault>();
        }
    
        public string Name { get; set; }
    
        public virtual ICollection<ItemDefault> ItemDefaults { get; set; }
    }
}
