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

namespace HMS.Controllers
{
    public class ExpenseController : BaseController
    {
        public ExpenseController()
        {
            // _Repository = new Repository<Patient>(new Context());
        }

        public JsonResult LoadSingleExpenseItem(long expenseId)
        {
            Expense onlySingleExpense = new Expense();
            using (ExpenseRepository repository = new ExpenseRepository())
            {
               Expense singleExpense= repository.GetbyId(expenseId);

               onlySingleExpense.Id = singleExpense.Id;
               onlySingleExpense.ExpenseCategoryId = singleExpense.ExpenseCategoryId;
               onlySingleExpense.Amount = singleExpense.Amount;
               onlySingleExpense.ExpenseDate = singleExpense.ExpenseDate;
               onlySingleExpense.ModifiedDate = singleExpense.ModifiedDate;
               onlySingleExpense.Description = singleExpense.Description;
               onlySingleExpense.UserId = singleExpense.UserId;

            }

            return Json(onlySingleExpense, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadItems(long categoryId,  string dateStart, string dateEnd)
        {

            List<Expense> onlyExpense = new List<Expense>();


            DateTime expenseDateStart = DateTime.Parse("1/1/1980");
            DateTime expenseDateEnd = DateTime.Today;
            if (dateStart != null && dateEnd != null)
            {
                if (IsDate(dateStart) && IsDate(dateEnd))
                {

                    expenseDateStart = DateTime.Parse(dateStart);
                    expenseDateEnd = DateTime.Parse(dateEnd);
                }
            }

            using (Repository<Expense> repository = new Repository<Expense>())
            {

                Expression<Func<Expense, bool>> lambda;

                lambda = (x => x.Active == true && x.ExpenseDate >= expenseDateStart && x.ExpenseDate <= expenseDateEnd && (categoryId == 0 ? x.ExpenseCategoryId > 0 : x.ExpenseCategoryId == categoryId));

                Func<IQueryable<Expense>, IOrderedQueryable<Expense>> orderingFunc = query => query.OrderByDescending(m => m.ExpenseDate);

                List<Expense> AllExpense = repository.GetByQuery(lambda,orderingFunc).ToList();

                foreach (Expense item in AllExpense)
                {
                    Expense singleExpense = new Expense();

                    singleExpense.Id = item.Id;
                    singleExpense.ExpenseCategoryId = item.ExpenseCategoryId;
                    singleExpense.Amount = item.Amount;
                    singleExpense.ExpenseDate = item.ExpenseDate;
                    singleExpense.ModifiedDate = item.ModifiedDate;
                    singleExpense.Description = item.Description;
                    singleExpense.UserId = item.UserId;

                    
                    singleExpense.ExpenseCategory = new ExpenseCategory();
                    singleExpense.ExpenseCategory.Name = item.ExpenseCategory.Name;

                    onlyExpense.Add(singleExpense);
                    
                }

                return Json(onlyExpense, JsonRequestBehavior.AllowGet);

            }

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

        public JsonResult CreateCategory(string categoryName)
        {
            ExpenseCategory category = new ExpenseCategory();
            ExpenseCategory outPutCategory = new ExpenseCategory();
            category.Name = categoryName;


            using (Repository<ExpenseCategory> repository = new Repository<ExpenseCategory>())
            {
                category.UserId = GetLoggedinUserInfo().UserId;
               outPutCategory= repository.Insert(category);
                repository.Commit();
                // CreatePatientService(invoice.Id, patientServices);
            }

            return Json(outPutCategory, JsonRequestBehavior.AllowGet);

        }


        public JsonResult DeleteItem(Expense expense)
        {

            using (Repository<Expense> repository = new Repository<Expense>())
            {

                repository.Delete(expense, GetLoggedinUserInfo().UserId);
                repository.Commit();
                // CreatePatientService(invoice.Id, patientServices);
            }

            return Json("Successfully delete item", JsonRequestBehavior.AllowGet);

        }

        public JsonResult SaveItem(Expense item)
        {
            Expense Expense = new Expense();



            using (Repository<Expense> repository = new Repository<Expense>())
            {

                item.UserId = GetLoggedinUserInfo().UserId;
                if (item.Id > 0)
                {
                    Expense = repository.Update(item);
                    repository.Commit();
                }
                else
                {
                    Expense = repository.Insert(item);
                    repository.Commit();
                }
            }

            return Json(Expense, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadCategories()
        {
            List<ExpenseCategory> onlyItemCategories = new List<ExpenseCategory>();
            List<ExpenseCategory> ItemCategories;

            using (Repository<ExpenseCategory> repository = new Repository<ExpenseCategory>())
            {

                Expression<Func<ExpenseCategory, bool>> lambda;

                lambda = (x => x.Active == true);

                ItemCategories = repository.GetByQuery(lambda).ToList();

                foreach (ExpenseCategory catogry in ItemCategories)
                {
                    ExpenseCategory itemCategory = new ExpenseCategory();


                    itemCategory.Id = catogry.Id;
                    itemCategory.Name = catogry.Name;

                    onlyItemCategories.Add(itemCategory);

                }

                if (onlyItemCategories == null)
                {
                    return Json(HttpNotFound(), JsonRequestBehavior.AllowGet);
                }




                return Json(onlyItemCategories, JsonRequestBehavior.AllowGet);
            }
        }


    }
}