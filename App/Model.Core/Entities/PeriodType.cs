using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("PeriodType")]
    public partial class PeriodType : EntityBase
    {
        public PeriodType()
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
