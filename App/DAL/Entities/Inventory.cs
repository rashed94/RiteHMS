using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("Inventory")]
    public partial class Inventory : EntityBase
    {
        public long ItemID { get; set; }
        public long StoreID { get; set; }
        public int? Stock { get; set; }
        public decimal? BuyPrice { get; set; }
        public System.DateTime? BuyDate { get; set; }
        public System.DateTime? ExpireDate { get; set; }
    
        public virtual Item Item { get; set; }
        public virtual Store Store { get; set; }
    }
}
