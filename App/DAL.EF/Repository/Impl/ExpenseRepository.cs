using System;
using HMS.Model.Core;
using System.Linq;

namespace HMS.DAL.Repository
{
    public class ExpenseRepository : Repository<Expense>, IExpenseRepository
    {
        public ExpenseRepository()
        {
            _DbSet = _DbContext.Set<Expense>();
        }
        public Expense GetbyId(long ExpenseId)
        {
            IQueryable<Expense> queryResult = _DbSet;
            return queryResult.Where(c => c.Id == ExpenseId && c.Active==true).ToList().ElementAt(0);
        }
    }
}
