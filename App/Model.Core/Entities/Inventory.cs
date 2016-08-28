using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace HMS.Model.Core
{
    [Table("Inventory")]
    public partial class Inventory : EntityBase
    {
        public Inventory()
        {
            this.InventoryItems = new List<InventoryItem>();
        }
        public long ItemID { get; set; }
        public long StoreID { get; set; }
        public int? Quantity { get; set; }
        public int? ReorderLevel { get; set; }

        public string ShelfId { get; set; }
        public string BinId { get; set; }
        public long? MeasurementUnitId { get; set; }
        public System.DateTime? LastModifiedDate { get; set; }
       

        [ForeignKey("ItemID")]
        public virtual Item Item { get; set; }
        [ForeignKey("StoreID")]
        public virtual Store Store { get; set; }
        [ForeignKey("MeasurementUnitId")]
        public virtual MeasurementUnit MeasurementUnit { get; set; }

        public virtual ICollection<InventoryItem> InventoryItems { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
