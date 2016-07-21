using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HMS.Controllers.Classes
{
    public class UserClaim
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
    }
}