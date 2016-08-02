using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public class PatientServiceRepository : Repository<PatientService>, IPatientServiceRepository
    {
        public PatientServiceRepository()
        {
            _DbSet = _DbContext.Set<PatientService>();
        }
        public IList<PatientService> GetServiceItemsByPatientId(long id)
        {
            IQueryable<PatientService> queryResult = _DbSet;
            //  bool active = true;
           
            
            return queryResult.Where(c => c.PatientID == id && c.ItemId == c.Item.Id && c.InvoiceID == null && c.ReceiptId==null  && c.Active==true).ToList();
        }

        public IList<PatientService> GetServiceItemsLabtestOnlyByPatientId(long patientid,long invoiceid)
        {
            IQueryable<PatientService> queryResult = _DbSet;
            //  bool active = true;
           // long invoiceid = 0;
            return queryResult.Where(c => c.PatientID == patientid && c.ItemId == c.Item.Id && c.InvoiceID == invoiceid  && c.LabStatusId != null).ToList();
        }

    }
}
