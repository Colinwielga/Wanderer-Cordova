using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WandererWebApp
{
    public class Storage
    {
        /// <summary>
        /// Validate the connection string information in app.config and throws an exception if it looks like 
        /// the user hasn't updated this to valid values. 
        /// </summary>
        /// <param name="storageConnectionString">Connection string for the storage service or the emulator</param>
        /// <returns>CloudStorageAccount object</returns>
        public static CloudTableClient CreateStorageAccountFromConnectionString(string storageConnectionString)
        {
            return CloudStorageAccount.Parse(storageConnectionString).CreateCloudTableClient();
        }

        /// <summary>
        /// Create a table for the sample application to process messages in. 
        /// </summary>
        /// <returns>A CloudTable object</returns>
        public static async Task<CloudTable> CreateTableAsync(string storageConnectionString, string tableName)
        {
            var tableClient = CreateStorageAccountFromConnectionString(storageConnectionString);

            CloudTable table = tableClient.GetTableReference(tableName);

            await table.CreateIfNotExistsAsync();

            return table;
        }
    }
}
