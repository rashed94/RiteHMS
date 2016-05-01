using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Department")]
    public partial class Department : EntityBase
    {
        public Department()
        {
            this.ServiceProviders = new List<ServiceProvider>();
            this.PatientAdmissions = new List<PatientAdmission>();
        }
    
        public string Name { get; set; }
    
        public virtual ICollection<ServiceProvider> ServiceProviders { get; set; }
        public virtual ICollection<PatientAdmission> PatientAdmissions { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {
            
        }
    }
}
