using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Hosting;

namespace WandererWebApp
{

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            //services.AddMvc();

            //services.AddCors();

            services.AddSignalR(x =>
            {
                x.KeepAliveInterval = TimeSpan.FromSeconds(10);
                x.ClientTimeoutInterval = TimeSpan.FromSeconds(30);
            })
            //.AddAzureSignalR()
             ;
            
            services.AddSingleton(typeof(SharedEntitiesTableName));
            services.AddSingleton(typeof(ItemCache<SharedEntitiesTableName>));
            services.AddSingleton(typeof(AccountsTableName));
            services.AddSingleton(typeof(ItemCache<AccountsTableName>));
            services.AddSingleton(typeof(CharactersTableName));
            services.AddSingleton(typeof(ItemCache<CharactersTableName>));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //if (env.IsDevelopment())
            //{
                app.UseDeveloperExceptionPage();
            //}


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseFileServer();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<Chat>("/chat");
                endpoints.MapControllers();
            });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        //public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        //{
        //    //if (env.IsDevelopment())
        //    //{
        //    app.UseDeveloperExceptionPage();
        //    //}

        //    //app.UseCors(builder => builder
        //    //    .WithOrigins("https://wandererwebapp.azurewebsites.com", "http://wandererwebapp.azurewebsites.com")
        //    //    .AllowAnyOrigin()
        //    //    .AllowAnyHeader()
        //    //    .AllowAnyMethod()
        //    //    .DisallowCredentials()
        //    //    .SetIsOriginAllowed((host) => true));

        //    //app.UseMvc();
        //    app.UseFileServer();
        //    //app.UseWebSockets();
        //    app.UseEndpoints(routes =>
        //    {
        //        routes.MapHub<Chat>("/chat");
        //    });
        //    //app.UseSignalR(routes =>
        //    //{
        //    //    routes.MapHub<Chat>("/chat");
        //    //});
        //    //app.UseAzureSignalR(routes =>
        //    //{
        //    //    routes.MapHub<Chat>("/chat");
        //    //});
        //}
    }
}
