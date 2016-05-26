using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public class ReferralRepository : Repository<Referral>, IReferralRepository
    {
        public ReferralRepository()
        {
            _DbSet = _DbContext.Set<Referral>();

        }

        public IList<Referral> GetServiceProviderPartialName(string name, long itemid)
        {
            IQueryable<Referral> queryResult = _DbSet;
            //  bool active = true;
            return queryResult.Where(c => c.ServiceProvider.Contact.FirstName.StartsWith(name) && c.ServiceProvider.ContactId == c.ServiceProvider.Contact.Id && c.ItemId==itemid).ToList();
        }
    }
}
