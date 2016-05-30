using System;
using HMS.Model.Core;
using System.Linq;

namespace HMS.DAL.Repository
{
    public class PatientInvoiceRepository : Repository<PatientInvoice>, IPatientInvoiceRepository
    {
        public PatientInvoiceRepository()
        {
            _DbSet = _DbContext.Set<PatientInvoice>();
        }

    }
}
