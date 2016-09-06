using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace HMS.DAL.Repository
{
    public class PatientInvoiceRepository : Repository<PatientInvoice>, IPatientInvoiceRepository
    {
        public PatientInvoiceRepository()
        {
            _DbSet = _DbContext.Set<PatientInvoice>();
        }

        public PatientInvoice updateInvoiceStatus(PatientInvoice pinvoice)
        {
            var updatedEntity = _DbSet.Attach(pinvoice);
            // _DbContext.Entry(entity).State = EntityState.Modified;
            _DbContext.Entry(pinvoice).Property(x=>x.LabStatusId).IsModified = true;
            _DbContext.SaveChanges();
            return updatedEntity;
        }

        public int GetTotalDebit(long patientId)
        {
            IQueryable<PatientInvoice> queryResult = _DbSet;

            //string TotalDebit = queryResult.Where(s => s.PatientID == patientId).Select(s => s.TotalAmount).Sum()).ToString();
            int TotalDebit =queryResult.Where(s => s.PatientID == patientId).Sum(x => (int?)x.TotalAmount) ?? 0;
            return TotalDebit;
           
        }
        public IList<PatientInvoice> GetPatientInvoicebyMedicalTypeOnlyLabItem(long id, long statusid, long medicalTypeID, DateTime invoiceDateStart, DateTime invoiceDateEnd, long? invoiceId = null)
        {
            IQueryable<PatientInvoice> queryResult = _DbSet;
            
            //  bool active = true;
            //return queryResult.Where(c => c.MedicalTypeId == id && c.Name.StartsWith(name)).ToList();
           

            if (id == 0)
            {
                if (statusid == 0)
                {
                    //return queryResult.Where(c => c.Active == true).Include(c => c.PatientServices.Select(i => i.Item.MedicalTypeId == medicalTypeID)).ToList();  
                   // return queryResult.Where(c => c.Active == true && c.PatientServices.Any(i => i.Item.MedicalTypeId == medicalTypeID)).ToList();
                    return queryResult.Where(c => c.Active == true && c.LabStatusId != null && c.InvoiceDate >= invoiceDateStart && c.InvoiceDate <= invoiceDateEnd  &&(invoiceId == null ? c.Id > 0 : c.Id == invoiceId)).OrderByDescending(c=>c.Id).ToList();
                }
                else
                {
                   // lambda = (x => x.InvoiceStatusId == statusid && x.Active == true);
                   // return queryResult.Where(c => c.Active == true && c.InvoiceStatusId == statusid).Include(c => c.PatientServices.Select(i => i.Item.MedicalTypeId == medicalTypeID)).ToList();
                   // return queryResult.Where(c => c.Active == true && c.PatientServices.Any(i => i.Item.MedicalTypeId == medicalTypeID)).ToList();
                    return queryResult.Where(c => c.Active == true && c.LabStatusId == statusid && c.InvoiceDate >= invoiceDateStart && c.InvoiceDate <= invoiceDateEnd && (invoiceId == null ? c.Id > 0 : c.Id == invoiceId)).OrderByDescending(c => c.Id).ToList();
                }
            }
            else
            {
                if (statusid == 0)
                {
                  //  return queryResult.Where(c => c.Active == true && c.PatientID==id).Include(c => c.PatientServices.Select(i => i.Item.MedicalTypeId == medicalTypeID)).ToList();
                    
                    //return queryResult.Include(c => c.PatientServices.Select(i => i.Item.MedicalTypeId == medicalTypeID)).ToList();
                    //return queryResult.Where(c => c.PatientServices.Select(i => i.Item.MedicalTypeId)).ToList();
                   // return queryResult.Where(c => c.Active == true && c.PatientID == id &&  c.LabStatusId!=null && c.PatientServices.Any(i => i.LabStatusId>0)).ToList();
                    return queryResult.Where(c => c.Active == true && c.PatientID == id && c.LabStatusId != null && c.InvoiceDate >= invoiceDateStart && c.InvoiceDate <= invoiceDateEnd && (invoiceId == null ? c.Id > 0 : c.Id == invoiceId)).OrderByDescending(c => c.Id).ToList();
                }
                else
                {
                   // lambda = (x => x.PatientID == id && x.Active == true && x.InvoiceStatusId == statusid);

                  //  return queryResult.Where(c => c.Active == true && c.InvoiceStatusId == statusid && c.PatientID==id).Include(c => c.PatientServices.Select(i => i.Item.MedicalTypeId == medicalTypeID)).ToList();

                   // return queryResult.Where(c => c.Active == true && c.PatientID == id && c.PatientServices.Any(i => i.Item.MedicalTypeId == medicalTypeID)).ToList();
                    return queryResult.Where(c => c.Active == true && c.PatientID == id && c.LabStatusId == statusid && c.InvoiceDate >= invoiceDateStart && c.InvoiceDate <= invoiceDateEnd && (invoiceId == null ? c.Id > 0 : c.Id == invoiceId)).OrderByDescending(c => c.Id).ToList();


                }
            }
        }
    }
}
