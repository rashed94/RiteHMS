using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
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
    }
}
