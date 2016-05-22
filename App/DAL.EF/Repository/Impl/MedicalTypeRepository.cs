using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public class MedicalTypeRepository : Repository<MedicalType>, IMedicalTypetRepository
    {
        public MedicalTypeRepository()
        {
            _DbSet = _DbContext.Set<MedicalType>();
        }

        public IList<MedicalType> GetAll()
        {
            IQueryable<MedicalType> queryResult = _DbSet;
            bool active = true;
            return queryResult.Where(c => c.Active == active).ToList();
             
        }
    }
}
