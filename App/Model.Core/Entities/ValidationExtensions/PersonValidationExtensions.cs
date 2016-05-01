using HMS.Model.Core;
using System.Collections.Generic;

namespace HSM.Model.ValidationExtensions
{
    internal static class PersonValidationExtensions
    {
        internal static IEnumerable<string> ValidateFirstName(this Contact contact, object value)
        {
            return null;
        }

        internal static IEnumerable<string> ValidatePhoneNumber(this Contact contact, object value)
        {
            return null;
        }
    }
}
