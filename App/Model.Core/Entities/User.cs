using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Model.Core
{
    [Table("User")]
    public partial class User : EntityBase
    {
        public User()
        {
           // Contact = new Contact();
        }

        public long ContactId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        [ForeignKey("ContactId")]
        public virtual Contact Contact { get; set; }

        protected override void RegisterValidationMethods()
        {

        }

        protected override void ResetProperties()
        {

        }
    }
}
