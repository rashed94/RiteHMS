using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("BedOccupancy")]
    public partial class BedOccupancy : EntityBase
    {
        public long ItemID { get; set; }
        public bool? Occupied { get; set; }
        public long? UserId { get; set; }
        public long? PatientId { get; set; }
        public string PatientName { get; set; }
    
        public virtual Item Item { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
