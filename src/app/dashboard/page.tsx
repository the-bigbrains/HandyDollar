import sync from "@/lib/sync";
import TransactionCardList from "./TxCardList";
import Graph from "./Graph";
import Moneys from "./Moneys";

const sandboxToken = "access-sandbox-4b5dcec0-fbfd-4ba4-8db8-1fd4eee03111";

export default async function Dashboard() {
  //sandbox access key generated from setAccessToken()
  const txArray = await sync(sandboxToken);

  return (
    <main className="flex flex-col text-white">
      <div className="text-green-300 py-4 px-8 flex border-b border-gray-600 items-center">
        <div className="mr-auto text-3xl">Dashboard</div>
        <div className="px-8">Upload Receipt</div>
      </div>
      <div className="flex justify-center mb-20 gap-20">
        <Moneys message="Money spent: " money={10} />
        <Moneys message="Money earned: " money={20} />
      </div>
      <div className="w-full flex px-20">
        <Graph />
        <div className="w-full flex justify-center">
          <TransactionCardList txArray={txArray} />
        </div>
      </div>
    </main>
  );
}
