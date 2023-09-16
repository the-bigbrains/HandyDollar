import { Transaction } from "plaid";
import React from "react";
import TxCard from "./TxCard";

interface Props {
  txArray: Transaction[];
}

const TransactionCardList = (props: Props) => {
  return props.txArray.map((tx) => <TxCard />);
};

export default TransactionCardList;
