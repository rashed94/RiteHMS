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

        public JsonResult GetShelf(long storeId)
        {
            List<Shelf> onlyShelf = new List<Shelf>();

            using (Repository<Shelf> repository = new Repository<Shelf>())
            {
                Expression<Func<Shelf, bool>> lambda;
                lambda = (x => x.Active == true && x.StoreId==storeId);

                List<Shelf> selfList = repository.GetByQuery(lambda).ToList();

                selfList.ForEach(s =>
                {
                    Shelf shelf = ModelMapper.MapToClient(s);
                    onlyShelf.Add(shelf);
                });



            }
            return Json(onlyShelf, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CreateSelf(Shelf shelf)
        {
            Shelf onlyShelf = new Shelf();
            shelf.UserId = GetLoggedinUserInfo().UserId;
            using (Repository<Shelf> repository = new Repository<Shelf>())
            {
               onlyShelf= repository.Insert(shelf);
               repository.Commit();
            }
            return Json(onlyShelf, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CreateBin(Bin bin)
        {
            Bin onlyBin = new Bin();
            bin.UserId = GetLoggedinUserInfo().UserId;
            using (Repository<Bin> repository = new Repository<Bin>())
            {
                onlyBin = repository.Insert(bin);
                repository.Commit();
            }
            return Json(onlyBin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CreateInventory(Inventory inventory)
        {
            inventory.Shelf = null;
            inventory.Bin = null;
            Inventory onlyInventory = new Inventory();

            inventory.UserId = GetLoggedinUserInfo().UserId;

            using (Repository<Inventory> repository = new Repository<Inventory>())
            {
                if (inventory.Id == 0)
                {
                    onlyInventory = repository.Insert(inventory);
                }
                else
                {
                    onlyInventory = repository.Update(inventory);
                }
                repository.Commit();
            }
            return Json(onlyInventory, JsonRequestBehavior.AllowGet);
        }


        public JsonResult CreateInventoryItem(InventoryItem inventoryItem)
        {
            InventoryItem onlyInventoryItem = new InventoryItem();

            inventoryItem.UserId = GetLoggedinUserInfo().UserId;

            using (Repository<InventoryItem> repository = new Repository<InventoryItem>())
            {
                if (inventoryItem.Id == 0)
                {
                    onlyInventoryItem = repository.Insert(inventoryItem);
                }
                else
                {
                    onlyInventoryItem = repository.Update(inventoryItem);
                }
                repository.Commit();
            }
            return Json(onlyInventoryItem, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBin(long? shelfId)
        {
            List<Bin> onlyBin = new List<Bin>();

            using (Repository<Bin> repository = new Repository<Bin>())
            {
                Expression<Func<Bin, bool>> lambda;
                lambda = (x => x.Active == true && x.ShelfId==shelfId);

                List<Bin> binList = repository.GetByQuery(lambda).ToList();

                binList.ForEach(b =>
                {
                    Bin shelf = ModelMapper.MapToClient(b);
                    onlyBin.Add(shelf);
                });



            }
            return Json(onlyBin, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInventoryByItem(long itemId,long storeId)
        {
            Inventory onlyInventory = new Inventory();

            using (Repository<Inventory> repository = new Repository<Inventory>())
            {
                Expression<Func<Inventory, bool>> lambda;
                lambda = (x => x.Active == true && x.ItemID==itemId && x.StoreID==storeId);

                Inventory inventory = new Inventory();

                List<Inventory> inventoryList = repository.GetByQuery(lambda).ToList();
                
                if(inventoryList.Count>0)
                {
                   inventory= inventoryList.ElementAt(0);
                   onlyInventory = ModelMapper.MapToClientWithoutItem(inventory);
                }

               
         
            }
            return Json(onlyInventory, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetInventories(long storeId)
        {
            List<Inventory> onlyInventories = new List<Inventory>();

            using (Repository<Inventory> repository = new Repository<Inventory>())
            {
                Expression<Func<Inventory, bool>> lambda;
                lambda = (x => x.Active == true  && x.StoreID == storeId);

                

                List<Inventory> inventoryList = repository.GetByQuery(lambda).ToList();

                inventoryList.ForEach(i =>
                {
                    Inventory inventory = ModelMapper.MapToClientWithItem(i);
                    onlyInventories.Add(inventory);
                });



            }
            return Json(onlyInventories, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetReorderInventories(long storeId)
        {
            List<Inventory> onlyInventories = new List<Inventory>();

            using (Repository<Inventory> repository = new Repository<Inventory>())
            {
                Expression<Func<Inventory, bool>> lambda;
                lambda = (x => x.Active == true && x.StoreID == storeId && x.ReorderLevel>x.Quantity);



                List<Inventory> inventoryList = repository.GetByQuery(lambda).ToList();

                inventoryList.ForEach(i =>
                {
                    Inventory inventory = ModelMapper.MapToClientWithItem(i);
                    onlyInventories.Add(inventory);
                });



            }
            return Json(onlyInventories, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetInventoryItems(long inventoryId)
        {
            List<InventoryItem> onlyInventoruItems = new List<InventoryItem>();

            using (Repository<InventoryItem> repository = new Repository<InventoryItem>())
            {
                Expression<Func<InventoryItem, bool>> lambda;
                lambda = (x => x.Active == true && x.InventoryId == inventoryId);



                List<InventoryItem> inventoryItemList = repository.GetByQuery(lambda).ToList();

                inventoryItemList.ForEach(i =>
                {
                    InventoryItem inventory = ModelMapper.MapToClient(i);
                    onlyInventoruItems.Add(inventory);
                });



            }
            return Json(onlyInventoruItems, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStores(long storeType)
        {
            List<Store> onlyStore = new List<Store>();
            Expression<Func<Store, bool>> lambda;

            if (storeType == 0)
            {
                lambda = (x => x.Active == true);
            }else
            {
                lambda = (x => x.Active == true && x.StoreTypeId==storeType);
            }

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