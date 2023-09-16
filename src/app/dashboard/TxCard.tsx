import { Transaction } from "plaid";
import React from "react";

interface Props {
  tx: Transaction;
}

const TxCard = (props: Props) => {
  return (
    <div className="flex border p-3 w-96 justify-between rounded-lg">
      <p className="font-semibold text-lg">{props.tx.name}</p>
      <p>${props.tx.amount}</p>
    </div>
  );
};

export default TxCard;
