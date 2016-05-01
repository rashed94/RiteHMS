using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("ItemType")]
    public partial class ItemType : EntityBase
    {
        public ItemType()
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
