using HMS.Model.Core;

namespace HMS.DAL.Repository
{
    public interface IExpenseRepository
    {
        Expense GetbyId(long ExpenseId);
    }
}