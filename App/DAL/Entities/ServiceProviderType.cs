using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
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
    }
}
