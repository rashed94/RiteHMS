using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace HMS.Model.Core
{
    [Table("InitialSetup")]
    public partial class InitialSetup : EntityBase
    {
       
        public string Name { get; set; }


        public virtual ICollection<InitialSetupItem> InitialSetupItems { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
