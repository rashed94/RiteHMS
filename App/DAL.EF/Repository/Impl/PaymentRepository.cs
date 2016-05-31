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

    }
}
