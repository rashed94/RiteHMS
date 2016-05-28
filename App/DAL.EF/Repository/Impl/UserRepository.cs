using System;
using HMS.Model.Core;
using System.Linq;

namespace HMS.DAL.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository()
        {
            _DbSet = _DbContext.Set<User>();
        }
        public User GetByUserName(string userName)
        {
            IQueryable<User> queryResult = _DbSet;
            return queryResult.Where(c => c.UserName == userName).ToList().ElementAt(0);
        }
    }
}
