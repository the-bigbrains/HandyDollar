import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { PLAID_PRODUCTS } from "@/app/Plaid";

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

export const client = new PlaidApi(configuration);

const setAccessToken = async () => {
  // Initialize the Plaid client
  // Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
  const response = await client.sandboxPublicTokenCreate({
    // institution_id: input.instituteID,
    institution_id: "ins_1",
    initial_products: PLAID_PRODUCTS,
  });

  const exchangeResponse = await client.itemPublicTokenExchange({
    public_token: response.data.public_token,
  });

  return exchangeResponse.data.access_token;
};

export default setAccessToken;
