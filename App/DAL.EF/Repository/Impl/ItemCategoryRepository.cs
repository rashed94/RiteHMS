﻿using System;
using HMS.Model.Core;
using System.Linq;

namespace HMS.DAL.Repository
{
    public class ItemCategoryRepository : Repository<ItemCategory>, IItemCategoryRepository
    {
        public ItemCategoryRepository()
        {
            _DbSet = _DbContext.Set<ItemCategory>();
        }

    }
}
