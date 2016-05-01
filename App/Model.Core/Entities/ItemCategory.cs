using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("ItemCategory")]
    public partial class ItemCategory : EntityBase
    {
        public ItemCategory()
        {
            this.Items = new List<Item>();
        }
    
        public string Name { get; set; }
        public long MedicalTypeId { get; set; }
    
        public virtual ICollection<Item> Items { get; set; }
        public virtual MedicalType MedicalType { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
