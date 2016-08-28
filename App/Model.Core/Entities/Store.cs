using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Store")]
    public partial class Store : EntityBase
    {
        public Store()
        {
            this.Inventories = new List<Inventory>();
            this.StoreLineManagers = new List<StoreLineManager>();
        }
    
        public string Name { get; set; }

        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public long StoreKeeperId { get; set; }
        public long? ParentStoreId { get; set; }
        public long StoreTypeId { get; set; }


        [ForeignKey("StoreKeeperId")]
        public virtual User StoreKeeper { get; set; }
        [ForeignKey("ParentStoreId")]
        public virtual Store ParentStore { get; set; }
        [ForeignKey("StoreTypeId")]
        public virtual StoreType StoreType { get; set; }
    
        public virtual List<Inventory> Inventories { get; set; }
        public virtual List<StoreLineManager> StoreLineManagers { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
