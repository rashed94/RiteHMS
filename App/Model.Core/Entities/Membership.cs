using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Membership")]
    public partial class Membership : EntityBase
    {
        public long PatiendId { get; set; }
        public string ValidityPeriod { get; set; }
        public decimal AnnualFee { get; set; }
        public bool? HealthBook { get; set; }
        public System.DateTime EntryDate { get; set; }

        [ForeignKey("PatiendId")]
        public virtual Patient Patient { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
