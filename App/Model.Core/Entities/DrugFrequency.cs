using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("DrugFrequency")]
    public partial class DrugFrequency : EntityBase
    {
        public DrugFrequency()
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
