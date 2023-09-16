import { Transaction } from "plaid";
import React from "react";

interface Props {
  tx: Transaction;
}

const TxCard = (props: Props) => {
  return (
    <div className="flex border p-3 w-full justify-between rounded-lg hover:scale-105 hover:border-purple-300 hover:text-purple-300 border-white text-white duration-200">
      <p className="font-semibold text-lg">{props.tx.name}</p>
      <p>${props.tx.amount}</p>
    </div>
  );
};

export default TxCard;
