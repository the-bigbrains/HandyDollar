import { Transaction } from "plaid";
import React from "react";
import TxCard from "./TxCard";

interface Props {
  txArray: Transaction[];
}

const TransactionCardList = (props: Props) => {
  return (
    <div className="gap-y-2 p-4 flex flex-col items-start overflow-auto h-1/4 no-scrollbar borde border-gray-100 rounded-lg">
      {props.txArray.map((tx) => (
        <TxCard tx={tx} />
      ))}
    </div>
  );
};

export default TransactionCardList;
