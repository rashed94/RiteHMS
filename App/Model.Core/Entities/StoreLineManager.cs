using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("StoreLineManager")]
    public partial class StoreLineManager : EntityBase
    {
        public StoreLineManager()
        {

        }
        public long StoreId { get; set; }
        public long LineManagerId { get; set; }

        [ForeignKey("StoreId")]
        public virtual Store Store { get; set; }
        [ForeignKey("LineManagerId")]
        public virtual User LineManagerUser { get; set; }
       
        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}



