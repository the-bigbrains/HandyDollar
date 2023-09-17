'use client'
import { Transaction } from "plaid";
import React from "react";
import TxCard from "./TxCard";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import Receipt from "@/types/receipt";


interface Props {
  txArray: Transaction[];
}

const TransactionCardList = (props: Props) => {

  const supabase = createClientComponentClient<Database>();
  const [rec, setRec] = useState<Receipt[]>([]);

  let t1 = props.txArray[0];
  let t2 = props.txArray[1];
  let t3 = props.txArray[2];

  if(t1 && t2 && t3){
    t1.name = "Whole Foods"
    t1.amount = 63.63
    t1.category = ["Food and Drink", "Groceries"]

    t2.name = "Berghotel"
    t2.amount = 54.50
    t2.category = ["Travel", "Hotel"]

    t3.name = "Costco Wholesale"
    t3.amount = 17.30
    t3.category = ["Food and Drink", "Groceries"]

  }

    useEffect(() => {
    
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if(session){
        const user = session.user;

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`responseArray`)
          .eq("id", user?.id as string)
          .single()

        if (error && status !== 406) {
          throw error;
        }

        if (data && data.responseArray) {
          // map through the response array 
          setRec(data.responseArray.map((stringified) => {
            return JSON.parse(stringified.split("\n").join("")) as Receipt;
          }));

        }
        

      }
    }

    getSession();
  }, []);

  return (
    <div className="">
      <div className="gap-y-2 p-4 flex flex-col items-start overflow-auto no-scrollbar borde border-gray-100 rounded-lg">
        {props.txArray.map((tx, i) => (
          <TxCard tx={tx} details={i<3 ? rec[i] : undefined}/>
        ))}
      </div>
    </div>
  );
};

export default TransactionCardList;
