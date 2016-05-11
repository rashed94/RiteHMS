using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace HMS.DAL.Repository
{
    public interface IRepository<T> : IDisposable where T : EntityBase
    {
        T Insert(T entity);

        T GetById(long id);

        IEnumerable<T> GetByQuery(Expression<Func<T, bool>> query = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "");

        T GetFirst(Expression<Func<T, bool>> predicate);

        T Update(T entity);

        T UpdateById(long id);

        //void Delete(T entity);

        //void DeleteByID(long id);

        void DeleteAll();
    }
}