using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("ExpenseCategory")]
    public partial class ExpenseCategory : EntityBase
    {
        public ExpenseCategory()
        {
           
        }

        public string Name { get; set; }

      
        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
