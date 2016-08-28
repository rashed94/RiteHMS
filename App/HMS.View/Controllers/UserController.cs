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
    public class UserController : BaseController
    {
        //private IRepository<Patient> _Repository;

        public UserController()
        {
            // _Repository = new Repository<Patient>(new Context());
        }


        public JsonResult GetUserByPartialName(string name)
        {
            List<User> onlyUsers = new List<User>();
            Expression<Func<User, bool>> lambda;

            lambda = (x => x.Active == true && x.UserName.StartsWith(name));

            using (Repository<User> repository = new Repository<User>())
            {
                List<User> users = repository.GetByQuery(lambda).ToList();

                users.ForEach(u =>
                {
                    User user = ModelMapper.MapToClient(u);
                    onlyUsers.Add(user);
                });

                return Json(onlyUsers, JsonRequestBehavior.AllowGet);

            }

        }



    }
}