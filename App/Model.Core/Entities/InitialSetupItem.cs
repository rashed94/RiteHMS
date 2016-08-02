using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("InitialSetupItem")]
    public partial class InitialSetupItem : EntityBase
    {
        public long InitialSetupId { get; set; }
        public long ItemId { get; set; }
        public long MedicalTypeId { get; set; }


        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; }
        [ForeignKey("InitialSetupId")]
        public virtual InitialSetup InitialSetup { get; set; }
        [ForeignKey("MedicalTypeId")]
        public virtual MedicalType MedicalType { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
