﻿using HMS.Model.Core;
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
            return queryResult.Where(c => c.PatientID== id && c.ItemID==c.Item.Id).ToList();
        }

    }
}
