using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
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

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
