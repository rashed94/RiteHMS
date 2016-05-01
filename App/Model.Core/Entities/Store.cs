using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Store")]
    public partial class Store : EntityBase
    {
        public Store()
        {
            this.Inventories = new List<Inventory>();
        }
    
        public string Name { get; set; }
    
        public virtual ICollection<Inventory> Inventories { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
