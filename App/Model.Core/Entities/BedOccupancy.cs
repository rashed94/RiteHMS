using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("BedOccupancy")]
    public partial class BedOccupancy : EntityBase
    {
        public long ItemID { get; set; }
        public bool? Occupied { get; set; }
        public long PatientId { get; set; }
        public long AdmissioinId { get; set; }
        public string PatientName { get; set; }

         [ForeignKey("ItemID")]
        public virtual Item Item { get; set; }
         [ForeignKey("PatientId")]
         public virtual Patient Patient { get; set; }
         [ForeignKey("AdmissioinId")]
         public virtual PatientAdmission PatientAdmission { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
