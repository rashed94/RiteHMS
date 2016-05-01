using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("PaymentType")]
    public partial class PaymentType : EntityBase
    {
        public PaymentType()
        {
            this.Payments = new List<Payment>();
        }
    
        public string Name { get; set; }
    
        public virtual ICollection<Payment> Payments { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
