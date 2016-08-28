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
using HMS.View.Mappers;

namespace HMS.Controllers
{
    public class InventoryController : BaseController
    {
        //private IRepository<Patient> _Repository;

        public InventoryController()
        {
            // _Repository = new Repository<Patient>(new Context());
        }

        public JsonResult SaveStore(Store store)
        {
            Store onlyStore=new Store();

            store.StoreLineManagers = null;
            store.StoreKeeper = null;
            store.StoreType = null;
            store.ParentStore = null;
            store.UserId = GetLoggedinUserInfo().UserId;

            using(Repository<Store> repository = new Repository<Store>())
            {
                if(store.Id==0)
                {
                   onlyStore= repository.Insert(store);
                }else
                {
                  onlyStore=  repository.Update(store);
                }

                repository.Commit();

                //return Json(ModelMapper.MapToClient(onlyStore), JsonRequestBehavior.AllowGet);
                return GetStoreById(store.Id);
            }
        }

        public JsonResult SaveLineManager(StoreLineManager lineManager)
        {
           List<StoreLineManager> onlyLineManager =new List<StoreLineManager>();

            lineManager.UserId = GetLoggedinUserInfo().UserId;

            using (Repository<StoreLineManager> repository = new Repository<StoreLineManager>())
            {
                repository.Insert(lineManager);
                repository.Commit();
                onlyLineManager = GetLineManager(lineManager.StoreId);

                return Json(onlyLineManager, JsonRequestBehavior.AllowGet);
            }
        }

        public List<StoreLineManager> GetLineManager(long storeId)
        {
            List<StoreLineManager> onlyLineManager = new List<StoreLineManager>();
            using (Repository<StoreLineManager> repository = new Repository<StoreLineManager>())
            {
                Expression<Func<StoreLineManager, bool>> lambda;

                lambda = (x => x.Active == true && x.StoreId==storeId);
                List<StoreLineManager> storeLineManagers = repository.GetByQuery(lambda).ToList();

                storeLineManagers.ForEach(u =>
                {
                    StoreLineManager LineManager = ModelMapper.MapToClient(u);
                    onlyLineManager.Add(LineManager);
                });

                return onlyLineManager;
            }
        }

        public JsonResult DeleteLineManager(StoreLineManager lineManager)
        {
            List<StoreLineManager> onlyLineManager = new List<StoreLineManager>();

            using (Repository<StoreLineManager> repository = new Repository<StoreLineManager>())
            {
                repository.DeleteByID(lineManager.Id, GetLoggedinUserInfo().UserId);


                onlyLineManager = GetLineManager(lineManager.StoreId);

                return Json(onlyLineManager, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetParentStore(long StoreTypeId)
        {

            Store singleStore=new Store();
            ViewParentStore parentStore = new ViewParentStore();

            List<Store> onlyStoreType = new List<Store>();
            Expression<Func<Store, bool>> lambda;

            lambda = (x => x.Active == true && x.ParentStoreId == null && x.StoreTypeId == StoreTypeId);

            using (Repository<Store> repository = new Repository<Store>())
            {
                List<Store> ParentStore = repository.GetByQuery(lambda).ToList();

                if (ParentStore.Count > 0)
                {
                    singleStore = ParentStore.ElementAt(0);
                  
                       parentStore.StoreId = singleStore.Id;
                       parentStore.StoreName = singleStore.Name;
                  
                }

                return Json(parentStore, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetStoreById(long storeId)
        {
            

            List<StoreType> onlyStoreType = new List<StoreType>();
            Expression<Func<Store, bool>> lambda;

            lambda = (x => x.Active == true && x.Id==storeId);

            using (Repository<Store> repository = new Repository<Store>())
            {
               
                Store singleStore = repository.GetByQuery(lambda).ToList().ElementAt(0);
                return Json(ModelMapper.MapToClient(singleStore), JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetStoreType()
        {
            List<StoreType> onlyStoreType = new List<StoreType>();
            Expression<Func<StoreType, bool>> lambda;

            lambda = (x => x.Active == true);

            using (Repository<StoreType> repository = new Repository<StoreType>())
            {

                ICollection<StoreType> storeType = repository.GetByQuery(lambda).ToList();

                foreach (StoreType item in storeType)
                {
                    StoreType singleStoreType = new StoreType();

                    singleStoreType.Id = item.Id;
                    singleStoreType.Name = item.Name;
                    onlyStoreType.Add(singleStoreType);
                }
            }

            return Json(onlyStoreType, JsonRequestBehavior.AllowGet);


        }

        public JsonResult GetStores()
        {
            List<Store> onlyStore = new List<Store>();
            Expression<Func<Store, bool>> lambda;
            lambda = (x => x.Active == true);

            using (Repository<Store> repository = new Repository<Store>())
            {
                List<Store> storeList= repository.GetByQuery(lambda).ToList();

                storeList.ForEach(s =>
                {
                    Store singleStore = ModelMapper.MapToClient(s);
                    onlyStore.Add(singleStore);
                });
            }



            return Json(onlyStore, JsonRequestBehavior.AllowGet);
        }

      

    }
}