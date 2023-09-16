import sync from "@/lib/sync";
import TransactionCardList from "./TxCardList";

const sandboxToken = "access-sandbox-4b5dcec0-fbfd-4ba4-8db8-1fd4eee03111";

export default async function Dashboard() {
  //sandbox access key generated from setAccessToken()
  const txArray = await sync(sandboxToken);

  return (
    <main className="flex flex-col text-white">
      <h1>Welcome to the dashboard</h1>
      <TransactionCardList txArray={txArray} />
    </main>
  );
}
