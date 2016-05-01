using HMS.Model.Core;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMS.Model.Configuration
{
    class ContactConfiguration : EntityTypeConfiguration<Contact>
    {
        public ContactConfiguration()
        {
            HasKey(t => t.Id);
            Property(t => t.FirstName).IsRequired().HasMaxLength(100);
            Property(t => t.PhoneNumber).IsRequired();
        }

        private void HasKey(System.Func<Contact, int> func)
        {
            throw new System.NotImplementedException();
        }
    }

    class ItemConfiguration : EntityTypeConfiguration<Item>
    {
        public ItemConfiguration()
        {
            HasKey(t => t.Id);
            Property(t => t.Name).IsRequired();
            Property(t => t.ItemCategoryId).IsRequired();
            Property(t => t.ItemTypeId).IsRequired();
            Property(t => t.MeasurementUnitId).IsRequired();
            Property(t => t.MedicalTypeId).IsRequired();
        }

        private void HasKey(System.Func<Contact, int> func)
        {
            throw new System.NotImplementedException();
        }
    }
}
