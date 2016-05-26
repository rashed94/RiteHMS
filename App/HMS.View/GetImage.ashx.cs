using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace HMS.View
{
    public class GetImage : IHttpHandler
    {
        static readonly string _PhotoLocation = ConfigurationManager.AppSettings["PhotoLocation"];

        public void ProcessRequest(HttpContext context)
        {
            string _imageName;
            if (!string.IsNullOrEmpty(context.Request.QueryString["Name"]))
            {
                _imageName = context.Request.QueryString["Name"];
              //  context.Response.WriteFile(Path.Combine(_PhotoLocation, _imageName));
            }
            else
            {
               // context.Response.WriteFile(HttpContext.Current.Server.MapPath("Images/no_avatar.png"));
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}