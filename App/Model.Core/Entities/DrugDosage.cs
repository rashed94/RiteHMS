using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
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

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
