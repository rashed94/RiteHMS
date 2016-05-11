using HMS.Model.Core;
using System.Data.Entity;
using System.Linq;

namespace HMS.DAL.Repository
{
    public class ContactRepository : Repository<Contact>
    {
        public ContactRepository()
        {
            _DbSet = _DbContext.Set<Contact>();
        }

        public Contact GetByPhoneNumber(string phoneNumber)
        {
            IQueryable<Contact> queryResult = _DbSet;
            return queryResult.Where(c => c.PhoneNumber == phoneNumber).ToList().ElementAt(0);
        }
    }
}
