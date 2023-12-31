"use client";

import TransactionCardList from "./TxCardList";
import Graph1 from "./Graph1";
import Moneys from "./Moneys";
import AccountInfo from "./accountInfo";
import UploadChoice from "./UploadChoice";
import { Transaction } from "plaid";
import { useEffect, useState } from "react";
import Link from "next/link";

const sandboxToken = "access-sandbox-4b5dcec0-fbfd-4ba4-8db8-1fd4eee03111";

export default function Dashboard() {
  //sandbox access key generated from setAccessToken()
  const [txArray, setTxArray] = useState<Transaction[]>([]);

  useEffect(() => {
    const temp = async () => {
      const result = await fetch("/api/getTransaction", {
        method: "POST",
        body: JSON.stringify(sandboxToken),
      });

      const temp = await result.json();

      console.log(result);

      setTxArray(temp);
    };

    temp();
  }, []);

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

  const largestPurchase = txArray.reduce((largest, tx) => {
    if (tx.amount > largest) {
      return tx.amount;
    } else {
      return largest;
    }
  }, 0);

  const biggestGain = txArray.reduce((largest, tx) => {
    if (tx.amount < largest) {
      return tx.amount;
    } else {
      return largest;
    }
  }, Number.MAX_SAFE_INTEGER);

  const averagePurchase = txArray.reduce((total, tx) => {
    return (total += tx.amount);
  }, 0);

  return (
    <main className="flex flex-col text-white h-screen">
      <div className="text-purple-300 py-4 px-8 flex border-b border-gray-600 items-center">
        <div className="mr-auto text-3xl">
          <Link href="/dashboard"> Dashboard </Link>
        </div>
        <div className="px-8 hover:cursor-pointer hover:underline">
          <AccountInfo />
        </div>
        <div className="px-8 hover:cursor-pointer hover:underline">
          <UploadChoice />
        </div>
      </div>
      <div className="flex justify-center mb-5 gap-20">
        <Moneys
          message="Net"
          money={parseFloat((moneySpent + moneyEarned).toFixed(2))}
          fact="Average purchase:"
          stat={parseFloat((averagePurchase / txArray.length).toFixed(2))}
        />
        <Moneys
          message="Money spent"
          money={parseFloat(moneySpent.toFixed(2))}
          fact="Largest expense: "
          stat={largestPurchase}
        />
        <Moneys
          message="Money earned"
          money={parseFloat(moneyEarned.toFixed(2))}
          fact="Biggest income: "
          stat={Math.abs(biggestGain)}
        />
      </div>
      <div className="w-full flex flex-row h-full px-20">
        <Graph1 data={txArray} />
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
