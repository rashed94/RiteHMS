using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace HMS.Model.Core
{
    public interface ISetProperty : INotifyPropertyChanged, INotifyDataErrorInfo
    {
        void AddValidationMethod(string propertyName, Func<object, IEnumerable<string>> method);
        void SetProperty<T>(string propertyName, ref T backingField, T newValue);
    }
}
