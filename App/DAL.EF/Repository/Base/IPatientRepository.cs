using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public interface IPatientRepository
    {
        Patient GetByPhoneNumber(string phoneNumber);
        IList<Patient> GetByName(string patientName);
        IList<Patient> GetByPartialName(string name);
    }
}
