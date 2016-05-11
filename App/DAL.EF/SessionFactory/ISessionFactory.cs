using System.Data;

namespace HMS.DAL.SessionFactory
{
    public interface ISessionFactory
    {
        void Commit();
        void Rollback();
        void BeginTransaction(IsolationLevel isolationLevel);
        void OpenSession();
    }
}
