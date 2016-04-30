using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("MedicalType")]
    public partial class MedicalType : EntityBase
    {
        public MedicalType()
        {
            this.Items = new List<Item>();
            this.ItemCategories = new List<ItemCategory>();
        }
    
        public string Name { get; set; }
    
        public virtual ICollection<Item> Items { get; set; }
        public virtual ICollection<ItemCategory> ItemCategories { get; set; }
    }
}
