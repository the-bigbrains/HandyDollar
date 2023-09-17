import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products,
} from "plaid";

const APP_PORT = process.env.APP_PORT || 8000;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

const PLAID_PRODUCTS = (
  process.env.PLAID_PRODUCTS || Products.Transactions
).split(",") as Products[];

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
  // PLAID_PRODUCTS is a comma-separated list of products to use when initializing
  // Link. Note that this list must contain 'assets' in order for the app to be
  // able to create and retrieve asset reports.
  // PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
  // will be able to select institutions from.
  const PLAID_COUNTRY_CODES = (
    process.env.PLAID_COUNTRY_CODES || CountryCode.Us
  ).split(",") as CountryCode[];

  // Parameters used for the OAuth redirect Link flow.

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
