using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Item")]
    public partial class Item : EntityBase
    {
        public Item()
        {
            this.BedOccupancies = new List<BedOccupancy>();
            this.Inventories = new List<Inventory>();
            this.Item_ItemGroup = new List<Item_ItemGroup>();
            this.ItemDefaults = new List<ItemDefault>();
            this.ItemReorders = new List<ItemReorder>();
            this.PatientServices = new List<PatientService>();
            this.ReceiptPayments = new List<ReceiptPayment>();
        }
    
        public string Name { get; set; }
        public string GenericName { get; set; }
        public string Code { get; set; }
        public long ItemTypeId { get; set; }
        public long MedicalTypeId { get; set; }
        public long? ItemCategoryId { get; set; }
        public long?  MeasurementUnitId { get; set; }
        public decimal SalePrice { get; set; }
        public decimal BuyPrice { get; set; }
        public long? ServiceProviderId { get; set; }
        public bool ReferralAllowed { get; set; }
        public string Description { get; set; }
        public decimal DefaultReferrarFee { get; set; }
        public long? LabReportGroupId { get; set; }
    
        public virtual ICollection<BedOccupancy> BedOccupancies { get; set; }
        public virtual ICollection<Inventory> Inventories { get; set; }
        public virtual ICollection<Item_ItemGroup> Item_ItemGroup { get; set; }
        public virtual ICollection<ItemDefault> ItemDefaults { get; set; }
        public virtual ICollection<ItemReorder> ItemReorders { get; set; }
        public virtual ICollection<InitialSetupItem> InitialSetupItems { get; set; }

        [ForeignKey("ItemTypeId")]
        public virtual ItemType ItemType { get; set; }
        [ForeignKey("ItemCategoryId")]
        public virtual ItemCategory ItemCategory { get; set; }
        [ForeignKey("MeasurementUnitId")]
        public virtual MeasurementUnit MeasurementUnit { get; set; }
        [ForeignKey("MedicalTypeId")]
        public virtual MedicalType MedicalType { get; set; }
        [ForeignKey("ServiceProviderId")]
        public virtual ServiceProvider ServiceProvider { get; set; }
        public virtual ICollection<PatientService> PatientServices { get; set; }
        public virtual ICollection<ReceiptPayment> ReceiptPayments { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
