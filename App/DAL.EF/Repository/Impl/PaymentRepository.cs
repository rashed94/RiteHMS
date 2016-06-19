using System;
using HMS.Model.Core;
using System.Linq;

namespace HMS.DAL.Repository
{
    public class PaymentRepository : Repository<Payment>, IPaymentRepository
    {
        public PaymentRepository()
        {
            _DbSet = _DbContext.Set<Payment>();
        }

        public int GetTotalCredit(long patientId)
        {
            IQueryable<Payment> queryResult = _DbSet;
      //      decimal TotalCredit = queryResult.Where(s => s.PatientID == patientId).Select(s => s.Amount).Sum();
            int TotalCredit = queryResult.Where(s => s.PatientID == patientId).Sum(x => (int?)x.Amount) ?? 0;
            return TotalCredit;
        }

    }
}
