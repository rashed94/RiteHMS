using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace HMS.DAL.Repository
{
    public interface IRepository<T> where T : EntityBase
    {
        void Insert(T entity);

        T GetById(int id);

        IEnumerable<T> GetByQuery(Expression<Func<T, bool>> query = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "");

        T GetFirst(Expression<Func<T, bool>> predicate);

        void Update(T entity);

        void UpdateById(int id);

        //void Delete(T entity);

        //void DeleteByID(int id);

        void DeleteAll();
    }
}