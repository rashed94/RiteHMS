using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public class MeasurementUnitRepository : Repository<MeasurementUnit>, IMeasurementUnitRepository
    {
        public MeasurementUnitRepository()
        {
            _DbSet = _DbContext.Set<MeasurementUnit>();
        }


    }
}
