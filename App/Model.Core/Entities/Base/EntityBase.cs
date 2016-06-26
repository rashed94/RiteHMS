using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace HMS.Model.Core
{
    public abstract class EntityBase : ISetProperty, IValidatableObject
    {
        public EntityBase()
        {
            Active = true;
        }
        public long Id { get; set; }
        public bool? Active { get; set; }
        public long? UserId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            ICollection<ValidationResult> res = new Collection<ValidationResult>();
            res.Add(ValidationResult.Success);
            return res;
        }

        #region INotifyPropertyChanged
        
        public event PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName)
        {
            if (PropertyChanged != null)
                PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
        }

        #endregion

        #region INotifyDataErrorInfo
        
        private Dictionary<string, List<string>> _Errors = new Dictionary<string, List<string>>();
        
        public event EventHandler<DataErrorsChangedEventArgs> ErrorsChanged;
        
        protected void RaiseErrorsChanged(string propertyName)
        {
            if (ErrorsChanged != null)
                ErrorsChanged(this, new DataErrorsChangedEventArgs(propertyName));

            RaisePropertyChanged("HasErrors");
            RaisePropertyChanged("NoErrors");
            RaisePropertyChanged("ErrorCount");
        }
        
        public IEnumerable GetErrors(string propertyName)
        {
            if (_Errors.ContainsKey(propertyName))
                return _Errors[propertyName];
            return null;
        }
        
        public bool HasErrors
        {
            get { return (_Errors.Count > 0); }
        }
        
        public int ErrorCount
        {
            get { return _Errors.Count; }
        }
        
        public bool NoErrors
        {
            get { return (_Errors.Count == 0); }
        }
        
        protected void SetErrors(string propertyName, IEnumerable<string> errors)
        {
            if (errors == null)
            {
                //Clean up all errors for this property if the enumeration is empty
                if (_Errors.ContainsKey(propertyName))
                {
                    _Errors.Remove(propertyName);
                    RaiseErrorsChanged(propertyName);
                }
            }
            else
            {
                //Create a new entry for the property and add the error list
                if (!_Errors.ContainsKey(propertyName))
                    _Errors.Add(propertyName, new List<string>(errors));
                else
                {
                    //Replace the whole error list with the new one
                    _Errors[propertyName] = new List<string>(errors);
                }

                RaiseErrorsChanged(propertyName);
            }
        }

        #endregion

        #region ISetProperty
        
        private Dictionary<string, Func<object, IEnumerable<string>>> _ValidateMethods = new Dictionary<string, Func<object, IEnumerable<string>>>();
        
        public void AddValidationMethod(string propertyName, Func<object, IEnumerable<string>> method)
        {
            _ValidateMethods.Add(propertyName, method);
        }
        
        private bool ValidateProperty<T>(string propertyName, T newValue)
        {
            Func<object, IEnumerable<string>> validator = null;

            if (this._ValidateMethods.TryGetValue(propertyName, out validator))
            {
                IEnumerable<string> results = validator(newValue);
                SetErrors(propertyName, validator(newValue));

                if (results == null)
                    return true;
                else
                    return false;
            }
            else
                throw new MissingMethodException("No validation method is added to the validation dictionary for " + propertyName + " property.");
        }


        public void SetProperty<T>(string propertyName, ref T backingField, T newValue)
        {
            if (!object.Equals(backingField, newValue))
            {
                if (ValidateProperty<T>(propertyName, newValue))
                {
                    backingField = newValue;
                    RaisePropertyChanged(propertyName);
                }
            }
        }

        #endregion

        #region Common Methods

        /// <summary>
        /// Registers a validation method for each property.
        /// </summary>
        protected abstract void RegisterValidationMethods();

        /// <summary>
        /// Resets all properties to default values.
        /// </summary>
        protected abstract void ResetProperties();

        #endregion
    }
}
