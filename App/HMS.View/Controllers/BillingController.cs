using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using HMS.DAL;
using HMS.Model.Core;
using HMS.DAL.Repository;
using System.Security.Claims;
using System.Linq.Expressions;
using System.Collections;

namespace HMS.Controllers
{
    public class BillingController : BaseController
    {
        //private IRepository<Patient> _Repository;

        public BillingController()
        {
            // _Repository = new Repository<Patient>(new Context());
        }

        public void CreatePatientService(long invoiceID, IList<PatientService> patientServices)
        {
            using (PatientServiceRepository repository = new PatientServiceRepository())
            {
                foreach (PatientService patientervice in patientServices)
                {
                    patientervice.InvoiceID = invoiceID;
                    repository.Insert(patientervice);

                }
                repository.Commit();

            }
        }

        public JsonResult GetAdvancePayment(long patientId)
        {
            List<Payment> OnlyAdvancePayment=new List<Payment>();

            using(PaymentRepository repository= new PaymentRepository())
            {

                Expression<Func<Payment, bool>> lambda;
                lambda=(x=>x.PatientID==patientId && x.PaymentTypeId==103 && x.Amount!=x.DeductionAmount);

                List<Payment> advancePayment=repository.GetByQuery(lambda).ToList();
                
                foreach (Payment item in advancePayment)
	            {
		            Payment aPayment= new Payment();
                    aPayment.Id = item.Id;
                    aPayment.Amount=item.Amount;
                    aPayment.DeductionAmount=item.DeductionAmount;
                    aPayment.PaymentTypeId=item.PaymentTypeId;
                    aPayment.PatientID =item.PatientID;
                    aPayment.PaymentMethodId=item.PaymentMethodId;
                    aPayment.CardNumber=item.CardNumber;
                    aPayment.Date=item.Date;

                    OnlyAdvancePayment.Add(aPayment);

	            }

                if (OnlyAdvancePayment == null)
                {
                    return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
                }

                return Json(OnlyAdvancePayment, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetTotalDebit(long patientId)
        {
            int Totaldebit;
            int TotalCredit;
            ArrayList debitcredit = new ArrayList();

            using (PatientInvoiceRepository repository = new PatientInvoiceRepository())
            {
                Totaldebit = repository.GetTotalDebit(patientId);
            }

            using (PaymentRepository repository = new PaymentRepository())
            {
                TotalCredit = repository.GetTotalCredit(patientId);
            }

            debitcredit.Add(Totaldebit);
            debitcredit.Add(TotalCredit);

            return Json(debitcredit, JsonRequestBehavior.AllowGet);
        }



        public JsonResult UpdateRefundNote(PatientService pService)
        {
            PatientService patientService = null;
            pService.Item = null;
            using (PatientServiceRepository repository = new PatientServiceRepository())
            {

                patientService=repository.UpdateByField(pService, "RefundNote");
                // CreatePatientService(invoice.Id, patientServices);
            }

            if (patientService == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }

            return Json("Refund successfull", JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveInvoice(PatientInvoice invoice, IList<PatientService> patientServices)
        {
            using (PatientInvoiceRepository repository = new PatientInvoiceRepository())
            {
                invoice.UserId = GetLoggedinUserInfo().UserId;
                invoice = repository.Insert(invoice);
                repository.Commit();
                // CreatePatientService(invoice.Id, patientServices);
            }

            return Json(invoice.Id, JsonRequestBehavior.AllowGet);
        }


        public JsonResult SaveAdvancePayment(Payment payment)
        {

            using (PaymentRepository repository = new PaymentRepository())
            {
                payment.UserId = GetLoggedinUserInfo().UserId;


                payment = repository.Insert(payment);
                repository.Commit();
                // CreatePatientService(invoice.Id, patientServices);
            }

            return Json("Payment successfull");
        }


        public JsonResult CreatePayment(Payment payment,List<InvoicePayment>invoicePaymentList,List<Payment>advancePayment,double reconcileAmount)
        {
            if (payment.Amount > 0)
            {
                using (PaymentRepository repository = new PaymentRepository())
                {
                    payment.UserId = GetLoggedinUserInfo().UserId;
                    foreach (InvoicePayment item in payment.InvoicePayments)
                    {
                        item.UserId = GetLoggedinUserInfo().UserId;

                    }

                    payment = repository.Insert(payment);
                    repository.Commit();
                    // CreatePatientService(invoice.Id, patientServices);
                }
            }
            if(reconcileAmount>0)
            {

                using (Repository<InvoicePayment> repository = new Repository<InvoicePayment>())
                {

                    foreach (InvoicePayment item in invoicePaymentList)
                    {
                        item.UserId = GetLoggedinUserInfo().UserId;
                        repository.Insert(item);

                    }

                   
                    repository.Commit();
                    // CreatePatientService(invoice.Id, patientServices);
                }

                using (Repository<Payment> repository = new Repository<Payment>())
                {

                    foreach (Payment item in advancePayment)
                    {
                        item.UserId = GetLoggedinUserInfo().UserId;
                        repository.Update(item);

                    }


                    repository.Commit();
                    // CreatePatientService(invoice.Id, patientServices);
                }




                
            }

            return Json("Payment successfull");
        }

        public static bool IsDate(Object obj)
        {
            string strDate = obj.ToString();
            try
            {
                DateTime dt = DateTime.Parse(strDate);
                if ((dt.Month != System.DateTime.Now.Month) || (dt.Day < 1 && dt.Day > 31) || dt.Year != System.DateTime.Now.Year)
                    return false;
                else
                    return true;
            }
            catch
            {
                return false;
            }
        }

        //public JsonResult GetInvoicesByPatientID(long id)
        //{
        //    using (PatientInvoiceRepository repository = new PatientInvoiceRepository())
        //    {
        //        List<PatientInvoice> patientInvoice = repository.GetByQuery().ToList();

        //    }

        //    return Json("invoice loaded success fully");

        //}=""
        public JsonResult GetInvoicesByPatientId(long id, long statusid, string DateStart, string DateEnd,long ? invoiceId=null)
        {
            List<PatientInvoice> onlypatientInvoices = new List<PatientInvoice>();
            List<PatientInvoice> patientInvoices;
            
            DateTime invoiceDateStart=DateTime.Parse("1/1/1980");
            DateTime invoiceDateEnd =  DateTime.Today;

            if (IsDate(DateEnd) && IsDate(DateStart))
            {

                invoiceDateStart = DateTime.Parse(DateStart);
                invoiceDateEnd = DateTime.Parse(DateEnd);
            } 


            using (PatientInvoiceRepository repository = new PatientInvoiceRepository())
            {
                /* ParameterExpression argParam = Expression.Parameter(typeof(PatientInvoice), "s");
                 Expression patientProperty = Expression.Property(argParam, "PatientID");
                 Expression statusProperty = Expression.Property(argParam, "InvoiceStatusId");

                 var val1 = Expression.Constant(id);
                 var val2 = Expression.Constant(statusid);

                 Expression e1 = Expression.Equal(patientProperty, val1);
                 Expression e2 = Expression.Equal(statusProperty, val2);

                 BinaryExpression andExp;*/


                // var andExp = e1;

                //var lambda = Expression.Lambda<Func<PatientInvoice, bool>>(andExp, argParam);
                Expression<Func<PatientInvoice, bool>> lambda;
               

                if (id == 0)
                {
                    if (statusid == 0)
                    {
                        lambda = (x => x.Active == true && x.InvoiceDate >= invoiceDateStart && x.InvoiceDate <= invoiceDateEnd && (invoiceId == null ? x.Id >0 : x.Id == invoiceId));
                        
                        
                      
                    }
                    else
                    {
                        lambda = (x => x.InvoiceStatusId == statusid && x.Active == true && x.InvoiceDate >= invoiceDateStart && x.InvoiceDate <= invoiceDateEnd && (invoiceId == null ? x.Id>0 : x.Id == invoiceId));
                    }
                }
                else
                {
                    if (statusid == 0)
                    {
                        lambda = (x => x.PatientID == id && x.Active == true && x.InvoiceDate >= invoiceDateStart && x.InvoiceDate <= invoiceDateEnd && (invoiceId == null ? x.Id>0 : x.Id == invoiceId));
                    }
                    else
                    {
                        lambda = (x => x.PatientID == id && x.Active == true && x.InvoiceStatusId == statusid && x.InvoiceDate >= invoiceDateStart && x.InvoiceDate <= invoiceDateEnd && (invoiceId == null ? x.Id>0 : x.Id == invoiceId));

                    }
                }


                patientInvoices = repository.GetByQuery(lambda).ToList();
               patientInvoices = patientInvoices.OrderByDescending(x => x.InvoiceDate).ToList();



                foreach (PatientInvoice pinvoice in patientInvoices)
                {
                    PatientInvoice onlyPatientInvoice = new PatientInvoice();
                    Patient patient = new Patient();
                    onlyPatientInvoice.Patient = patient;

                    onlyPatientInvoice.Id = pinvoice.Id;
                    onlyPatientInvoice.InvoiceDate = pinvoice.InvoiceDate;
                    onlyPatientInvoice.DueDate = pinvoice.DueDate;
                    onlyPatientInvoice.PatientID = pinvoice.PatientID;
                    onlyPatientInvoice.TotalAmount = pinvoice.TotalAmount;
                    onlyPatientInvoice.TotalDiscount = pinvoice.TotalDiscount;
                    onlyPatientInvoice.InvoiceStatusId = pinvoice.InvoiceStatusId;
                    onlyPatientInvoice.ItemDiscount = pinvoice.ItemDiscount;
                    onlyPatientInvoice.UserId = pinvoice.UserId;
                    onlyPatientInvoice.LabStatusId = pinvoice.LabStatusId;
                    onlyPatientInvoice.IsRefunded = pinvoice.IsRefunded;
                    onlyPatientInvoice.Patient.FirstName = pinvoice.Patient.FirstName;
                    onlyPatientInvoice.Patient.LastName = pinvoice.Patient.LastName;
                    onlyPatientInvoice.UserId = GetLoggedinUserInfo().UserId;

                    foreach (InvoicePayment invoicepayment in pinvoice.InvoicePayments)
                    {
                        InvoicePayment invoicePayment = new InvoicePayment();

                        invoicePayment.Id = invoicepayment.Id;
                        invoicePayment.PatientInvoiceId = invoicepayment.PatientInvoiceId;
                        invoicePayment.Amount = invoicepayment.Amount;
                        invoicePayment.PaymentID = invoicepayment.PaymentID;
                        invoicePayment.UserId = invoicepayment.UserId;
                        onlyPatientInvoice.InvoicePayments.Add(invoicePayment);
                    }

                    foreach (PatientService c in pinvoice.PatientServices)
                    {
                        PatientService patientstitem = new PatientService();
                        Item item = new Item();
                        ItemCategory Category = new ItemCategory();
                        patientstitem.Item = item;
                        patientstitem.Item.ItemCategory = Category;


                        patientstitem.Id = c.Id;
                        patientstitem.PatientID = c.PatientID;
                        patientstitem.ItemID = c.ItemID;
                        patientstitem.InvoiceID = c.InvoiceID;
                        patientstitem.ServiceListPrice = c.ServiceListPrice;
                        patientstitem.ServiceActualPrice = c.ServiceActualPrice;
                        patientstitem.ServiceQuantity = c.ServiceQuantity;
                        patientstitem.ServiceDate = c.ServiceDate;
                        patientstitem.UserId = c.UserId;
                        patientstitem.Discount = c.Discount;
                        patientstitem.DiscountAfterInvoice = c.DiscountAfterInvoice;
                        patientstitem.Refund = c.Refund;
                        patientstitem.RefundNote = c.RefundNote;

                        patientstitem.Billed = c.Billed;
                        patientstitem.LabStatusId = c.LabStatusId;
                        patientstitem.ReferralFee = c.ReferralFee;
                        patientstitem.DeliveryDate = c.DeliveryDate;
                        patientstitem.DeliveryTime = c.DeliveryTime;


                        patientstitem.Item.Name = c.Item.Name;
                        patientstitem.Item.GenericName = c.Item.GenericName;
                        patientstitem.Item.ItemCategory.Name = c.Item.ItemCategory.Name;
                        patientstitem.Item.ReferralAllowed = c.Item.ReferralAllowed;

                        patientstitem.ReferralFeePaid = c.ReferralFeePaid;
                        patientstitem.ServiceProviderId = c.ServiceProviderId;
                        patientstitem.UserId = GetLoggedinUserInfo().UserId;

                        onlyPatientInvoice.PatientServices.Add(patientstitem);
                    }

                    onlypatientInvoices.Add(onlyPatientInvoice);
                }

                if (onlypatientInvoices == null)
                {
                    return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
                }

                return Json(onlypatientInvoices, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetBillingIemByPatientId(long id)
        {
            List<PatientService> patientServiceItems;
            List<PatientService> onlypatientServiceItems = new List<PatientService>();


            using (PatientServiceRepository repository = new PatientServiceRepository())
            {
                patientServiceItems = repository.GetServiceItemsByPatientId(id).ToList();

                foreach (PatientService c in patientServiceItems)
                {
                    PatientService patientstitem = new PatientService();
                    Item item = new Item();
                    patientstitem.Item = item;


                    patientstitem.Id = c.Id;
                    patientstitem.PatientID = c.PatientID;
                    patientstitem.ItemID = c.ItemID;
                    patientstitem.InvoiceID = c.InvoiceID;
                    patientstitem.ServiceListPrice = c.ServiceListPrice;
                    patientstitem.ServiceActualPrice = c.ServiceActualPrice;
                    patientstitem.ServiceQuantity = c.ServiceQuantity;
                    patientstitem.ServiceDate = c.ServiceDate;
                    patientstitem.UserId = c.UserId;
                    patientstitem.Discount = c.Discount;
                    patientstitem.DiscountAfterInvoice = c.DiscountAfterInvoice;
                    patientstitem.Refund = c.Refund;
                    patientstitem.Billed = c.Billed;
                    patientstitem.ReferralFee = c.ReferralFee;
                    patientstitem.DeliveryDate = c.DeliveryDate;
                    patientstitem.DeliveryTime = c.DeliveryTime;
                    patientstitem.ReferralFeePaid = c.ReferralFeePaid;
                    patientstitem.ServiceProviderId = c.ServiceProviderId;
                    patientstitem.LabStatusId = c.LabStatusId;

                    patientstitem.Item.Name = c.Item.Name;
                    patientstitem.Item.GenericName = c.Item.ItemCategory.Name;
                    patientstitem.Item.ReferralAllowed = c.Item.ReferralAllowed;
                    onlypatientServiceItems.Add(patientstitem);

                }

            }
            if (patientServiceItems == null)
            {
                return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
            }


            //  patients.ForEach(corePatient => onlyPatients.Add(MapToClientObject(corePatient)));
            //patientServiceItems.ForEach(c => onlypatientServiceItems.Add(new PatientService
            //{
            //    Id = c.Id,
            //    PatientID = c.PatientID,
            //    ItemID = c.ItemID,
            //    InvoiceID=c.InvoiceID,
            //    ServiceListPrice = c.ServiceListPrice,
            //    ServiceActualPrice = c.ServiceActualPrice,
            //    ServiceQuantity = c.ServiceQuantity,
            //    ServiceDate = c.ServiceDate,
            //    UserId = c.UserId,
            //    Discount = c.Discount,
            //    Refund =c.Refund,
            //    Billed =c.Billed,
            //    ReferralFee =c.ReferralFee,
            //    DeliveryDate =c.DeliveryDate,
            //    DeliveryTime =c.DeliveryTime

            //}));


            return Json(onlypatientServiceItems, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult UpdateInvoice(PatientInvoice pinvoice)
        {
            PatientInvoice onlyInvoice = new PatientInvoice();
             PatientInvoice patientInvoice = new PatientInvoice();
          

            using (Repository<PatientInvoice> repository = new Repository<PatientInvoice>())
            {
                    patientInvoice = repository.Update(pinvoice);
                    patientInvoice.UserId = GetLoggedinUserInfo().UserId;
                    repository.Commit();
            }

            List<PatientService> patientServiceItems = pinvoice.PatientServices.ToList();
            foreach (PatientService item in patientServiceItems)
            {
                using (PatientServiceRepository patientservicerepository = new PatientServiceRepository())
                {
                    item.UserId = GetLoggedinUserInfo().UserId;
                    patientservicerepository.Update(item);
                    patientservicerepository.Commit();
                }
            }


            return Json("Invoice update successfull", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CreateInvoice(PatientInvoice pinvoice)
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            PatientInvoice patientInvoice = new PatientInvoice();
            PatientInvoice onlyPatientInvoice = new PatientInvoice();
            // var userId = claims.Where(r => r.Type == ClaimTypes.SerialNumber).FirstOrDefault().Value;

            using (Repository<PatientInvoice> repository = new Repository<PatientInvoice>())
            {
                // patientInvoice.UserId = Convert.ToInt32(userId);
                // patientInvoice.InvoiceStatusId = 1;
                if (pinvoice.Id == 0)
                {
                    List<PatientService> patientServiceItems = pinvoice.PatientServices.ToList();
                    pinvoice.PatientServices = null;
                    pinvoice.UserId = patientInvoice.UserId;
                    patientInvoice = repository.Insert(pinvoice);
                    repository.Commit();
                    foreach (PatientService item in patientServiceItems)
                    {
                        item.InvoiceID = pinvoice.Id;
                        item.UserId = GetLoggedinUserInfo().UserId;

                        using (PatientServiceRepository patientservicerepository = new PatientServiceRepository())
                        {
                            patientservicerepository.Update(item);
                            patientservicerepository.Commit();
                        }

                    }
                }
                else
                {
                    List<PatientService> patientServiceItems = pinvoice.PatientServices.ToList();
                    pinvoice.PatientServices = null;

                    patientInvoice = repository.Update(pinvoice);
                    repository.Commit();

                    if(pinvoice.InvoiceStatusId==2)
                    {
                        foreach (PatientService item in patientServiceItems)
                        {
                            item.InvoiceID = pinvoice.Id;
                            item.UserId = GetLoggedinUserInfo().UserId;

                            item.Billed=true;

                            using (PatientServiceRepository patientservicerepository = new PatientServiceRepository())
                            {
                                patientservicerepository.Update(item);
                                patientservicerepository.Commit();
                            }

                        }

                    }
                }


                // repository.Commit();

            }

            //using (PatientServiceRepository repository = new PatientServiceRepository())
            //{

            //    foreach (PatientService patientervice in patientServices)
            //    {
            //        patientervice.InvoiceID = pinvoice.Id;
            //        repository.Update(patientervice);

            //    }
            //    repository.Commit();
            //}

            onlyPatientInvoice.Id = patientInvoice.Id;
            onlyPatientInvoice.InvoiceDate = patientInvoice.InvoiceDate;
            onlyPatientInvoice.DueDate = patientInvoice.DueDate;
            onlyPatientInvoice.PatientID = patientInvoice.PatientID;
            onlyPatientInvoice.TotalAmount = patientInvoice.TotalAmount;
            onlyPatientInvoice.TotalDiscount = patientInvoice.TotalDiscount;
            onlyPatientInvoice.InvoiceStatusId = patientInvoice.InvoiceStatusId;
            onlyPatientInvoice.InvoiceStatusId = patientInvoice.InvoiceStatusId;
            onlyPatientInvoice.LabStatusId = patientInvoice.LabStatusId;
            onlyPatientInvoice.ItemDiscount = patientInvoice.ItemDiscount;
            onlyPatientInvoice.UserId = patientInvoice.UserId;

            return Json(onlyPatientInvoice, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
            }
            base.Dispose(disposing);
        }
        // Code added by zaber
        public JsonResult deleteBillItem(long billId)
        {

            using (PatientServiceRepository bill = new PatientServiceRepository())
            {
                bill.DeleteByID(billId, GetLoggedinUserInfo().UserId);
                bill.Commit();
                return Json("BillItem delete successfull");
            }

        }

        //end by zaber
    }
}
