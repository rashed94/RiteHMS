using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("Patient")]
    public partial class Patient : EntityBase
    {
        public Patient()
        {
            this.Memberships = new List<Membership>();
            this.PatientInvoices = new List<PatientInvoice>();
            this.PatientServices = new List<PatientService>();
            this.Payments = new List<Payment>();
        }
    
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public bool Gender { get; set; }
        public string BloodGroup { get; set; }
        public string FatherName { get; set; }
        public System.DateTime? DOB { get; set; }
        public string NationalId { get; set; }
        public string Occupation { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }
        public byte[] Photo { get; set; }
    
        public virtual ICollection<Membership> Memberships { get; set; }
        public virtual ICollection<PatientInvoice> PatientInvoices { get; set; }
        public virtual ICollection<PatientService> PatientServices { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
