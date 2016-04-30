using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("Item_ItemGroup")]
    public partial class Item_ItemGroup : EntityBase
    {
        public long ItemID { get; set; }
        public long ItemGroupID { get; set; }
    
        public virtual Item Item { get; set; }
        public virtual ItemGroup ItemGroup { get; set; }
    }
}
