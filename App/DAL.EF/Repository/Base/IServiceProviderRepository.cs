using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.DAL.Repository
{
    public interface IServiceProviderRepository
    {

      //  IList<ServiceProvider> GetAll();
        IList<ServiceProvider> GetServiceProviderPartialName(string name);

    }
}
