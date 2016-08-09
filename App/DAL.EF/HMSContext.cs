using HMS.Model.Core;
using System.Data.Entity;

namespace HMS.DAL
{
    public partial class Context : DbContext
    {
        public Context() : base("name=HMSContext")
        {
            Database.SetInitializer<Context>(null);
          //  this.Configuration.ProxyCreationEnabled = false; 
        }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    throw new UnintentionalCodeFirstException();
        //}

        protected virtual DbSet<Appointment> Appointments { get; set; }
        protected virtual DbSet<BedOccupancy> BedOccupancies { get; set; }
        protected virtual DbSet<Contact> Contacts { get; set; }
        protected virtual DbSet<Department> Departments { get; set; }
        protected virtual DbSet<DrugAdministration> DrugAdministrations { get; set; }
        protected virtual DbSet<DrugDosage> DrugDosages { get; set; }
        protected virtual DbSet<DrugFrequency> DrugFrequencies { get; set; }

        protected virtual DbSet<Expense> Expense { get; set; }
        protected virtual DbSet<ExpenseCategory> ExpenseCategory { get; set; }

        protected virtual DbSet<InitialSetup> InitialSetup { get; set; }
        protected virtual DbSet<InitialSetupItem> InitialSetupItem { get; set; }
        protected virtual DbSet<Inventory> Inventories { get; set; }
        protected virtual DbSet<InvoicePayment> InvoicePayments { get; set; }
        protected virtual DbSet<InvoiceStatus> InvoiceStatus { get; set; }
        protected virtual DbSet<Item> Items { get; set; }
        protected virtual DbSet<Item_ItemGroup> Item_ItemGroups { get; set; }
        protected virtual DbSet<ItemCategory> ItemCategories { get; set; }
        protected virtual DbSet<ItemDefault> ItemDefaults { get; set; }
        protected virtual DbSet<ItemGroup> ItemGroups { get; set; }
        protected virtual DbSet<ItemReorder> ItemReorders { get; set; }
        protected virtual DbSet<ItemType> ItemTypes { get; set; }
        protected virtual DbSet<MeasurementUnit> MeasurementUnits { get; set; }
        protected virtual DbSet<LabReportGroup> LabReportGroup { get; set; }
        protected virtual DbSet<LabReportFormat> LabReportFormat { get; set; }
        protected virtual DbSet<LabStatus> LabStatus { get; set; }
        protected virtual DbSet<MedicalType> MedicalTypes { get; set; }
        protected virtual DbSet<Membership> Memberships { get; set; }
        protected virtual DbSet<Patient> Patients { get; set; }
        protected virtual DbSet<PatientAdmission> PatientAdmissions { get; set; }
        protected virtual DbSet<PatientInvoice> PatientInvoices { get; set; }
        protected virtual DbSet<PatientService> PatientServices { get; set; }
        protected virtual DbSet<Payment> Payments { get; set; }
        protected virtual DbSet<PaymentMethod> PaymentMethod { get; set; }
        protected virtual DbSet<PaymentType> PaymentTypes { get; set; }
        protected virtual DbSet<PeriodType> PeriodType { get; set; }
        protected virtual DbSet<Prescription> Prescription { get; set; }
        protected virtual DbSet<PrescriptionItem> PrescriptionItem { get; set; }
        protected virtual DbSet<ReceiptPayment> ReceiptPayments { get; set; }
        protected virtual DbSet<Referral> Referrals { get; set; }
        protected virtual DbSet<Refund> Refunds { get; set; }
        protected virtual DbSet<ServiceProvider> ServiceProviders { get; set; }
        protected virtual DbSet<ServiceProviderType> ServiceProviderTypes { get; set; }
        protected virtual DbSet<ServiceProviderAppointment> ServiceProviderAppointments { get; set; }
        protected virtual DbSet<Store> Stores { get; set; }
        protected virtual DbSet<User> Users { get; set; }
  
       
      
        
    }
}