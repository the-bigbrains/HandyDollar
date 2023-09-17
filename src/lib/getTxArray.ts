// Provide a cursor from your database if you've previously
// received one for the Item. Leave null if this is your
// first sync call for this Item. The first request will

import {
  Transaction,
  RemovedTransaction,
  TransactionsSyncRequest,
} from "plaid";
import { client } from "./setAccessToken";

// Persist cursor and updated data

type Data = {};

export default async function getTxArray(accessToken: string) {
  // New transaction updates since "cursor"
  let added: Array<Transaction> = [];
  let modified: Array<Transaction> = [];
  // Removed transaction ids
  let removed: Array<RemovedTransaction> = [];
  let hasMore = true;
  let cursor = undefined;

  // Iterate through each page of new transaction updates for item
  while (hasMore) {
    const request: TransactionsSyncRequest = {
      access_token: accessToken,
      cursor: cursor,
      options: { include_personal_finance_category: true },
      count: 30,
    };

    const response = await client.transactionsSync(request);
    const data = response.data;

    // Add this page of results
    added = added.concat(data.added);
    modified = modified.concat(data.modified);
    removed = removed.concat(data.removed);

    hasMore = false;

    // Update cursor to the next cursor
    cursor = data.next_cursor;
  }

  return added;
}
