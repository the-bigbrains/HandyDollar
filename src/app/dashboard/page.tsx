import sync from "@/lib/sync";
import TransactionCardList from "./TxCardList";
import Graph from "./Graph";
import Moneys from "./Moneys";
import Link from "next/link";

const sandboxToken = "access-sandbox-4b5dcec0-fbfd-4ba4-8db8-1fd4eee03111";

// make a function to loop over txArray and add up all the positive values and return it

export default async function Dashboard() {
  //sandbox access key generated from setAccessToken()
  const txArray = await sync(sandboxToken);

  const moneySpent = txArray.reduce((total, tx) => {
    if (tx.amount > 0) {
      return (total += tx.amount * -1);
    } else {
      return (total += 0);
    }
  }, 0);

  const moneyEarned = txArray.reduce((total, tx) => {
    if (tx.amount < 0) {
      return (total += Math.abs(tx.amount));
    } else {
      return (total += 0);
    }
  }, 0);

  return (
    <main className="flex flex-col text-white h-screen">
      <div className="text-purple-300 py-4 px-8 flex border-b border-gray-600 items-center">
        <div className="mr-auto text-3xl">Dashboard</div>
        <div className="px-8 hover:cursor-pointer hover:underline">Account</div>
        <Link href="/receipt">
          <div className="px-8 hover:cursor-pointer hover:underline">
            Upload Receipt
          </div>
        </Link>
      </div>
      <div className="flex justify-center mb-5 gap-20">
        <Moneys
          message="Net"
          money={parseFloat((moneySpent - moneyEarned).toFixed(2))}
        />
        <Moneys
          message="Money spent"
          money={parseFloat(moneySpent.toFixed(2))}
        />
        <Moneys
          message="Money earned"
          money={parseFloat(moneyEarned.toFixed(2))}
        />
      </div>
      <div className="w-full flex flex-row h-full px-20">
        <Graph />
        <div className="w-full rounded-xl flex flex-col items-center justify-start outline-gray-500 outline mb-5">
          <div className="flex flex-col w-full">
            <div className="text-4xl mx-4 my-2">Transactions</div>
            <div className="text-gray-400 text-md mx-4">
              You have made {txArray.length} transactions
            </div>
            <div className=" w-full h-[32rem] overflow-scroll">
              <TransactionCardList txArray={txArray} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
