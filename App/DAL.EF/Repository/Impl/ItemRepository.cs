using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository()
        {
            _DbSet = _DbContext.Set<Item>();
        }

        public IList<Item> GetItembyMedicalPartialName(long id, string name)
        {
            IQueryable<Item> queryResult = _DbSet;
          //  bool active = true;
            return queryResult.Where(c => c.MedicalTypeId == id && c.Name.StartsWith(name)).ToList();

        }
    }
}
