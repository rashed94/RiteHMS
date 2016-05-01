using System;
using System.Linq;
using System.Data.Entity;
using System.Linq.Expressions;
using HMS.Model.Core;

namespace HMS.DAL.Repository
{
    public class Repository<T> : Context, IRepository<T> where T : EntityBase
    {
        protected DbSet<T> _DbSet;

        protected DbContext _DbContext;

        public Repository(DbContext dataContext)
        {
            _DbContext = dataContext;
            _DbSet = _DbContext.Set<T>();
        }

        #region IRepository<T> Members

        public void Insert(T entity)
        {
            _DbSet.Add(entity);
        }

        public T GetById(int id)
        {
            return _DbSet.Find(id);
        }

        public System.Collections.Generic.IEnumerable<T> GetByQuery(Expression<Func<T, bool>> query = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "")
        {
            IQueryable<T> queryResult = _DbSet;

            //If there is a query, execute it against the dbset
            if (query != null)
            {
                queryResult = queryResult.Where(query);
            }

            //get the include requests for the navigation properties and add them to the query result
            foreach (var property in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                queryResult = queryResult.Include(property);
            }

            //if a sort request is made, order the query accordingly.
            if (orderBy != null)
            {
                return orderBy(queryResult).ToList();
            }
            //if not, return the results as is
            else
            {
                return queryResult.ToList();
            }
        }

        public T GetFirst(Expression<Func<T, bool>> predicate)
        {
            return _DbSet.First(predicate);
        }

        public void Update(T entity)
        {
            _DbSet.Attach(entity);
            _DbContext.Entry(entity).State = EntityState.Modified;
        }

        public void UpdateById(int id)
        {
            T entity = _DbSet.Find(id);
            _DbSet.Attach(entity);
            _DbContext.Entry(entity).State = EntityState.Modified;
        }

        private void Delete(T entity)
        {
            if (_DbContext.Entry(entity).State == EntityState.Detached)
                _DbSet.Attach(entity);

            _DbSet.Remove(entity);
        }

        private void DeleteByID(int id)
        {
            T entity = _DbSet.Find(id);
            _DbSet.Remove(entity);
        }

        public void DeleteAll()
        {
            _DbSet.ToList().ForEach(c => Delete(c));
        }

        #endregion
    }
}