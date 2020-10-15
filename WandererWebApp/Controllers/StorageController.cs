﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace WandererWebApp.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class StorageController : ControllerBase
    {
        private readonly ItemCache<AccountsTableName> accountsItemCache;
        private readonly ItemCache<AccountsTableName> charactersItemCache;

        public StorageController(ItemCache<AccountsTableName> accountsItemCache, ItemCache<AccountsTableName> charactersItemCache)
        {
            this.accountsItemCache = accountsItemCache ?? throw new ArgumentNullException(nameof(accountsItemCache));
            this.charactersItemCache = charactersItemCache ?? throw new ArgumentNullException(nameof(charactersItemCache));
        }

        [HttpGet("Character/{rowKey}/{partitionKey}")]
        public async Task<string> GetCharacter(string rowKey, string partitionKey) {
            var task = await accountsItemCache.GetOrInit(rowKey, partitionKey, () => new JObject());
            return task.JObject.ToString(Formatting.None);
        }

        [HttpGet("Account/{rowKey}/{partitionKey}")]
        public async Task<string> GetAccount(string rowKey, string partitionKey)
        {
            var task = await charactersItemCache.GetOrInit(rowKey, partitionKey, () => new JObject());
            return task.JObject.ToString(Formatting.None);
        }

        [HttpPut("Character/{rowKey}/{partitionKey}")]
        public async Task PutCharacter(string rowKey, string partitionKey,[FromBody]string value)
        {
            var @object = JObject.Parse(value);
            await charactersItemCache.Do(rowKey, partitionKey, _ => @object, Guid.NewGuid().ToString("D"));
        }

        [HttpPut("Account/{rowKey}/{partitionKey}")]
        public async Task PutAccount(string rowKey, string partitionKey,[FromBody]string value)
        {
            var @object = JObject.Parse(value);
            await accountsItemCache.Do(rowKey, partitionKey, _ => @object, Guid.NewGuid().ToString("D"));
        }
    }
}