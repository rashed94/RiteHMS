using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Expense")]
    public partial class Expense : EntityBase
    {
        public long ExpenseCategoryId { get; set; }
        public decimal Amount { get; set; }
        public System.DateTime ExpenseDate { get; set; }
        public System.DateTime? ModifiedDate { get; set; }
        
        public string Description { get; set; }
      

        [ForeignKey("ExpenseCategoryId")]
        public virtual ExpenseCategory ExpenseCategory { get; set; }


        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
