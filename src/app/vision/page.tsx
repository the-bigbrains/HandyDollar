"use client";
import React from "react";
import Camera from "./Camera";
import ProcessReceiptBtn from "@/comp/ProcessReceiptBtn";

const Page = () => {
  return (
    <div className="flex bg-white ">
      <div className="bg-white">
        <Camera />
        <ProcessReceiptBtn />
      </div>
    </div>
  );
};

export default Page;
