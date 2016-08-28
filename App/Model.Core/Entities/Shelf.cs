using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Shelf")]
    public partial class Shelf : EntityBase
    {
        public Shelf()
        {
            this.Bins = new List<Bin>();
        }
        public string Name { get; set; }
        public long StoreId { get; set; }
    

        [ForeignKey("StoreId")]
        public virtual Store Store { get; set; }


        public virtual ICollection<Bin> Bins { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
