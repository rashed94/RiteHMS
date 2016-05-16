using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public class PatientRepository : Repository<Patient>, IPatientRepository
    {
        public PatientRepository()
        {
            _DbSet = _DbContext.Set<Patient>();
        }

        public Patient GetByPhoneNumber(string phoneNumber)
        {
            IQueryable<Patient> queryResult = _DbSet;
            return queryResult.Where(c => c.PhoneNumber == phoneNumber).ToList().ElementAt(0);
        }

        public IList<Patient> GetByName(string patientName)
        {
            IQueryable<Patient> queryResult = _DbSet;
            return queryResult.Where(c => c.FirstName == patientName).ToList();
        }

        public IList<Patient> GetByPartialName(string name)
        {
            IQueryable<Patient> queryResult = _DbSet;
            return queryResult.Where(c => c.FirstName.StartsWith(name)).ToList();
        }
    }
}
