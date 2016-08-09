using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("PrescriptionItem")]
    public partial class PrescriptionItem : EntityBase
    {
       
        public long PrescriptionId { get; set; }
        public long ItemId { get; set; }
        public long DrugDosageId { get; set; }
        public long DrugFrequencyId { get; set; }
        public long DrugAdministrationId { get; set; }
        public System.DateTime StartDate { get; set; }
        public int Period { get; set; }
        public long PeriodTypeId { get; set; }
        public string Notes { get; set; }
        public bool IsLabItem { get; set; }




        [ForeignKey("PrescriptionId")]
        public virtual Prescription Prescription { get; set; }

        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; }

        [ForeignKey("DrugDosageId")]
        public virtual DrugDosage DrugDosage { get; set; }

        [ForeignKey("DrugFrequencyId")]
        public virtual DrugFrequency DrugFrequency { get; set; }

        [ForeignKey("DrugAdministrationId")]
        public virtual DrugAdministration DrugAdministration { get; set; }

        [ForeignKey("PeriodTypeId")]
        public virtual PeriodType PeriodType { get; set; }

     

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}