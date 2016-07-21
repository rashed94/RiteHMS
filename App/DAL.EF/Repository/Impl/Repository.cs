using System;
using System.Linq;
using System.Data.Entity;
using System.Linq.Expressions;
using HMS.Model.Core;
using HMS.DAL.SessionFactory;

namespace HMS.DAL.Repository
{
    public class Repository<T> : IDisposable, IRepository<T> where T : EntityBase
    {
        protected DbSet<T> _DbSet;

        protected DbContext _DbContext;

        public Repository()
        {
            //if (dataContext == null)
            //    throw new ArgumentNullException("dbContext");
            _DbContext = new Context();
            _DbSet = _DbContext.Set<T>();
            
        }

        //public virtual void Add(T entity)
        //{
        //    var dbEntityEntry = _DbContext.Entry(entity);
        //    if (dbEntityEntry.State != EntityState.Detached)
        //    {
        //        dbEntityEntry.State = EntityState.Added;
        //    }
        //    else
        //    {
        //        _DbSet.Add(entity);
        //    }
        //}

        #region IRepository<T> Members

        public T Insert(T entity)
        {
            var savedEntity = _DbSet.Add(entity);
            _DbContext.SaveChanges();
            return savedEntity;
        }

        public T GetById(long id)
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

            queryResult = queryResult.Where(c => c.Active == true);

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

        public T Update(T entity)
        {
            var updatedEntity = _DbSet.Attach(entity);
            _DbContext.Entry(entity).State = EntityState.Modified;
            _DbContext.SaveChanges();
            return updatedEntity;
        }

        public T UpdateByField (T entity,string fieldName)
        {
            var updatedEntity = _DbSet.Attach(entity);
           // _DbContext.Entry(entity).State = EntityState.Modified;
            _DbContext.Entry(entity).Property(fieldName).IsModified = true;
            _DbContext.SaveChanges();
            return updatedEntity;
        }

        public T UpdateById(long id)
        {
            T entity = _DbSet.Find(id);
            _DbSet.Attach(entity);
            _DbContext.Entry(entity).State = EntityState.Modified;
            _DbContext.SaveChanges();
            return entity;
        }

        //private void Delete(T entity)
        //{
        //    if (_DbContext.Entry(entity).State == EntityState.Detached)
        //        _DbSet.Attach(entity);

        //    _DbSet.Remove(entity);
        //}
        public void Delete(T entity)
        {
            if (_DbContext.Entry(entity).State == EntityState.Detached)
                _DbSet.Attach(entity);
            entity.Active = false;
            _DbContext.SaveChanges();
        }

        //private void DeleteByID(long id)
        //{
        //    T entity = _DbSet.Find(id);
        //    _DbSet.Remove(entity);
        //}
        public void DeleteByID(long id)
        {
            T entity = _DbSet.Find(id);
            entity.Active = false;
            _DbContext.SaveChanges();
        }

        public void DeleteAll()
        {
            _DbSet.RemoveRange(GetByQuery());
            _DbContext.SaveChanges();
        }

        public void Commit()
        {
            _DbContext.SaveChanges();
        }

        public void Dispose()
        {
            _DbContext.Dispose();
            _DbSet = null;
        }

        #endregion
    }
}