using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("ItemGroup")]
    public partial class ItemGroup : EntityBase
    {
        public ItemGroup()
        {
            this.Item_ItemGroup = new List<Item_ItemGroup>();
        }
    
        public string Name { get; set; }
        public long ItemID { get; set; }
    
        public virtual ICollection<Item_ItemGroup> Item_ItemGroup { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
