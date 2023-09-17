"use client";
import React from "react";
import Camera from "./camera";
import upload from "@/lib/upload";
import { supabaseClient } from "@/lib/supabaseClient";
import createBucket from "@/lib/createBucket";

const Page = () => {
  return (
    <div className="flex bg-white ">
      <div className="bg-white">
        <Camera />
      </div>
    </div>
  );
};

export default Page;
