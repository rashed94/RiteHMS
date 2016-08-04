using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace HMS.Model.Core
{
    
    public  class ServiceProvidedWithReferrerFee 
    {
        public ServiceProvidedWithReferrerFee()
        {
  
        }
        public long Id { get; set; }
        public long ContactId { get; set; }
        public long ServiceProviderTypeId { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string Speciality { get; set; }
        public string Code { get; set; }
        public decimal ReferralFee { get; set; }
        public bool AssignedToAllUsers { get; set; }
        public bool IsReferer { get; set; }

        [ForeignKey("ContactId")]
        public virtual Contact Contact { get; set; }
        [ForeignKey("ServiceProviderTypeId")]
        public virtual ServiceProviderType ServiceProviderType { get; set; }



    }
}
