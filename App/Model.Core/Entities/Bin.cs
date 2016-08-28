using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Bin")]
    public partial class Bin : EntityBase
    {
        public string Name { get; set; }
        public long ShelfId { get; set; }


        [ForeignKey("ShelfId")]
        public virtual Shelf Shelf { get; set; }




        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
