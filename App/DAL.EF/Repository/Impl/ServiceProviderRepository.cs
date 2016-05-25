using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public class ServiceProviderRepository : Repository<ServiceProvider>, IServiceProviderRepository
    {
        public ServiceProviderRepository()
        {
            _DbSet = _DbContext.Set<ServiceProvider>();

        }

        public IList<ServiceProvider> GetServiceProviderPartialName(string name)
        {
            IQueryable<ServiceProvider> queryResult = _DbSet;
            //  bool active = true;
            return queryResult.Where(c => c.Contact.FirstName.StartsWith(name) && c.ContactId==c.Contact.Id).ToList();
        }
    }
}
