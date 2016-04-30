using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("BedOccupancy")]
    public partial class BedOccupancy :EntityBase
    {
        public long ItemID { get; set; }
        public bool? Occupied { get; set; }
        public long? UserId { get; set; }
    
        public virtual Item Item { get; set; }
    }
}
