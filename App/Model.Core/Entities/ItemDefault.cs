using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("ItemDefault")]
    public partial class ItemDefault : EntityBase
    {
        public long ItemID { get; set; }
        public long? DosageId { get; set; }
        public long? AdministrationId { get; set; }
        public long? FrequencyId { get; set; }
    
        public virtual DrugAdministration DrugAdministration { get; set; }
        public virtual DrugDosage DrugDosage { get; set; }
        public virtual DrugFrequency DrugFrequency { get; set; }
        public virtual Item Item { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
