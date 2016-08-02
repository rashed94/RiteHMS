using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("ItemReorder")]
    public partial class ItemReorder : EntityBase
    {
        public int ReorderLevel { get; set; }
        public string ShelfName { get; set; }
        public long ItemID { get; set; }

        [ForeignKey("ItemID")]
        public virtual Item Item { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
