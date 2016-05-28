using HMS.Model.Core;

namespace HMS.DAL.Repository
{
    public interface IUserRepository
    {
        User GetByUserName(string userName);
    }
}
