using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("PaymentMethod")]
    public partial class PaymentMethod : EntityBase
    {
        public PaymentMethod()
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