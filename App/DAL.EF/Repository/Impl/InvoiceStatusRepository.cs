using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public class InvoiceStatusRepository : Repository<InvoiceStatus>, IInvoiceStatusRepository
    {
        public InvoiceStatusRepository()
        {
            _DbSet = _DbContext.Set<InvoiceStatus>();
        }

        public IList<InvoiceStatus> GetAll()
        {
            IQueryable<InvoiceStatus> queryResult = _DbSet;
            bool active = true;
            return queryResult.Where(c => c.Active == active).ToList();

        }
    }
}