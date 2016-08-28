using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("InventoryItem")]
    public partial class InventoryItem : EntityBase
    {
        public InventoryItem()
        {
            
        }
        public string Name { get; set; }
        public long ItemId { get; set; }
        public long InventoryId { get; set; }
        public long StoreId { get; set; }
        public int Quantity { get; set; }
        public long? MeasurementUnitId { get; set; }

        public decimal BuyPrice { get; set; }

        public System.DateTime ExpiryDate { get; set; }
        public System.DateTime ModifiedDate { get; set; }


        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; }
        [ForeignKey("InventoryId")]
        public virtual Inventory Inventory { get; set; }
        [ForeignKey("StoreId")]
        public virtual Store Store { get; set; }


        

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}