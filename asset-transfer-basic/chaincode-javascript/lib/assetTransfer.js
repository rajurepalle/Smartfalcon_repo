/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ID: 'DATA1',
                DEALERID: 'dealer1',
            MSISDN: '9999999999',
        
                MPIN: '1234',
              BALANCE: 3120,
                STATUS: 'active',
                TRANSAMOUNT: 1000,
                TRANSTYPE: 'PRIVATE',
                REMARKS: '',
            },
            
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }


    async CreateAsset(ctx, id, dealerId, msisdn, mpin, balance, status, transAmount, transType, remarks) {

 const asset = {        ID: id,
            DEALERID: dealerId,
            MSISDN: msisdn,
            MPIN: mpin,
            BALANCE: balance,
            STATUS: status,
            TRANSAMOUNT: transAmount,
            TRANSTYPE: transType,
            REMARKS: remarks,
        };
  await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
      return JSON.stringify(asset);
    }

 async ReadAsset(ctx, id) {
   const assetJSON = await ctx.stub.getState(id);
       if (!assetJSON || assetJSON.length === 0) {
           throw new Error(`The asset ${id} does not exist`);
       }
   return assetJSON.toString();
    }

 async UpdateAsset(ctx, id, dealerId, msisdn, mpin, balance, status, transAmount, transType, remarks) {

     const updatedAsset = {
            ID: id,
          DEALERID: dealerId,
            MSISDN: msisdn,
            MPIN: mpin,
            BALANCE: balance,
          STATUS: status,
            TRANSAMOUNT: transAmount,
        TRANSTYPE: transType,
    REMARKS: remarks,
        };   await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    }

    async DeleteAsset(ctx, id) {
        return ctx.stub.deleteState(id);
    }

    async AssetExists(ctx, id) {    const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    async TransferAsset(ctx, id, newOwner) {
        const assetString = await this.ReadAsset(ctx, id);
     const asset = JSON.parse(assetString);
        const oldOwner = asset.DEALERID; 
        asset.DEALERID = newOwner; 
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldOwner;
    }

    async GetAllAssets(ctx) {
        const allResults = [];
      const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {      const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;   try {
                record = JSON.parse(strValue);
            } catch (err) {
          console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    async GetAssetTransactionHistory(ctx, id) {
        const results = [];
        const iterator = await ctx.stub.getHistoryForKey(id);
        let result = await iterator.next();
        while (!result.done) {
            const record = {
                
                Value: result.value.value.toString('utf8'),
                Timestamp: result.value.timestamp,
            };
            results.push(record);
            result = await iterator.next();
    }
        return JSON.stringify(results);
    }
}

module.exports = AssetTransfer;