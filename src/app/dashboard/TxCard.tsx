'use client'
import Receipt from "@/types/receipt";
import { Transaction } from "plaid";
import React, { useCallback, useEffect, useState } from "react";


interface Props {
  tx: Transaction;
  details: Receipt | undefined;
}

const TxCard = (props: Props) => {


  const [modal, setModal] = useState<boolean | null>(false);

  return (
    <div className="w-full">
        <button 
        className="flex border p-3 w-full 
                  justify-between rounded-lg hover:scale-105
                hover:border-purple-300 hover:text-purple-300
                border-white text-white duration-200"
                onClick={() => {setModal(!modal)}}
        >
          <p className="font-semibold text-lg">{props.tx.name}</p>
          <p>${props.tx.amount}</p>
        </button>
        <div>
              {modal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-black outlineflex flex-col w-1/2 h-1/2 items-center justify-center rounded-xl">
              <div className="flex flex-row items-center justify-center text-start w-full h-full outline ">
                <div className="w-fit items-start">
                  <h1 className="text-4xl font-bold border-b border-white ">Transaction Details</h1>
              <div>
                <h1 className="text-2xl">Name</h1>
                <div>{props.tx.name}</div>
              </div>
              <div>
                <h1 className="text-2xl">Amount</h1>
                <div>${props.tx.amount}</div>
              </div>
              <div>
                <h1 className="text-2xl">Date</h1>
                <div>{props.tx.date}</div>
              </div>
              <h1 className="text-2xl">Category(s)</h1>
                <div className="flex flex-row">
                  {props.tx.category && props.tx.category.map((category, index) => (
                    <div key={index} className="pr-3">{category}</div>
                  ))}
                </div>
              <div>
                <h1 className="text-xs text-gray-300">Transaction ID</h1>
                <div className="text-xs text-gray-300">{props.tx.transaction_id}</div>
              </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold border-b border-white ">Receipt Details</h1>
                  <div>
                    {props?.details?.Items.map((item, i) => (
                        <div className="text-xs">{item.Name + ", $" + item.Price}</div>
                      ))}
                    </div>
                </div>
            </div>
              <button onClick={() => {setModal(!modal)}} className="mt-2 ml-auto">
                <h1 className="outline text-2xl hover:text-purple-300 hover:scale-105 button block text-white hover:border-purple-300 border-black border-2 rounded-lg p-2 duration-200">
                  Exit
                </h1>
              </button>
            </div>
          </div>
          )}  
        </div>
    </div>
  );
};

export default TxCard;
