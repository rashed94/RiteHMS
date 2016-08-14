using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("DischargeApprovalStatus")]
    public partial class DischargeApprovalStatus : EntityBase
    {
        public string Name { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}