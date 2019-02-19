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
using IdentityServer4.Models;
using WandererWebAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace WandererWebAPI
{
    public class Startup
    {
        const string clientScope = "clientApi";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            IEnumerable<Client> GetClients() {
                // TODO this feel unfortunate
                // I should be pulling this out of DI
                using (var context = new DataContext(new DbContextOptionsBuilder<DataContext>().UseSqlite(Configuration.GetConnectionString("DefaultConnection")).Options)) {
                    return context.Accounts.Select(x => new Client
                    {
                        ClientSecrets = { new Secret(x.Secret, null) },
                        ClientId = x.Id.ToString(),
                        AllowedScopes = { clientScope },
                        AllowedGrantTypes = GrantTypes.ClientCredentials,
                    }).ToList();
                }
            }

            IEnumerable<ApiResource> GetApiResources() {
                return new List<ApiResource>
                {
                    new ApiResource(clientScope, "Client API")
                };
            }

            services
                .AddMvc();

            services.AddDbContext<DataContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services
                .AddAuthentication("Bearer")
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = "http://localhost:5000";
                    options.RequireHttpsMetadata = false;
                    options.ApiName = clientScope;
                });

            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryApiResources(GetApiResources())
                .AddInMemoryClients(GetClients());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseIdentityServer();
            app.UseMvc();
        }
    }
}
