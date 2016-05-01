using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("ServiceProviderType")]
    public partial class ServiceProviderType : EntityBase
    {
        public ServiceProviderType()
        {
            this.ServiceProviders = new List<ServiceProvider>();
        }
    
        public string Name { get; set; }
    
        public virtual ICollection<ServiceProvider> ServiceProviders { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
