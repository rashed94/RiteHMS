using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("ItemReorder")]
    public partial class ItemReorder : EntityBase
    {
        public int ReorderLevel { get; set; }
        public string ShelfName { get; set; }
        public long ItemID { get; set; }
    
        public virtual Item Item { get; set; }
    }
}
