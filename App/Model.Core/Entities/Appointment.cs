using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Appointment")]
    public partial class Appointment : EntityBase
    {
        public string Name { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
