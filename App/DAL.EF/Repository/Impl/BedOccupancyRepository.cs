using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public class BedOccupancyRepository: Repository<BedOccupancy>, IBedOccupancyRepository
    {
        public BedOccupancyRepository()
        {
            _DbSet = _DbContext.Set<BedOccupancy>();
        }

        public IList<BedOccupancy> getBedOccupancyByPatientId(long id)
        {
            IQueryable<BedOccupancy> queryResult = _DbSet;
            //  bool active = true;

            return queryResult.Where(c => c.PatientId == id && c.ItemID == c.Item.Id && c.Active == true).ToList();
        }
    }
}
