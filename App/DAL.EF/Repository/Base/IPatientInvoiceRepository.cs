using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public interface IPatientInvoiceRepository
    {
        IList<PatientInvoice> GetPatientInvoicebyMedicalType(long id, long statusid, long medicalTypeID);
    }
}
