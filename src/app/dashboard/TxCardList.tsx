import { Transaction } from "plaid";
import React from "react";
import TxCard from "./TxCard";

interface Props {
  txArray: Transaction[];
}

const TransactionCardList = (props: Props) => {
  return (
    <div className="gap-y-2 flex flex-col items-start">
      {props.txArray.map((tx) => (
        <TxCard tx={tx} />
      ))}
    </div>
  );
};

export default TransactionCardList;
