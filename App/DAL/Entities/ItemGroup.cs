using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
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
    }
}
