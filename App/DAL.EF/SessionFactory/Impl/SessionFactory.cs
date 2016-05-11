using System;
using System.Data;
using System.Data.Entity;

namespace HMS.DAL.SessionFactory.Impl
{
    public sealed class SessionFactory : ISessionFactory
    {
        private static volatile SessionFactory instance;
        private static object syncRoot = new object();

        Context _Context;
        DbContextTransaction transaction;
        public Context Context { get { return _Context; } }

        private SessionFactory()
        {
        }
        public static SessionFactory Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (syncRoot)
                    {
                        if (instance == null)
                            instance = new SessionFactory();
                    }
                }

                return instance;
            }
        }

        public void OpenSession()
        {
            if (_Context == null)
            {
                if (_Context != null)
                    _Context.Dispose();

                _Context = new Context();
            }
        }

        public void BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted)
        {
            if (transaction == null)
            {
                if (transaction != null)
                    transaction.Dispose();

                transaction = _Context.Database.BeginTransaction(isolationLevel);
            }
        }

        public void Commit()
        {
            try
            {
                _Context.SaveChanges();
                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }

        public void Rollback()
        {
            transaction.Rollback();
        }

        public void Dispose()
        {
            if (transaction != null)
            {
                transaction.Dispose();
                transaction = null;
            }

            if (_Context != null)
            {
                _Context.Database.Connection.Close();
                _Context.Dispose();
                _Context = null;
            }
        }
    }
}
