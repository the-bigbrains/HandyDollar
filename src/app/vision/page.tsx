"use client";
import React from "react";
import Camera from "./Camera";
import upload from "@/lib/upload";
import { supabaseClient } from "@/lib/supabaseClient";
import createBucket from "@/lib/createBucket";

const Page = () => {
  return (
    <div className="bg-white ">
      <div className="bg-white Camera">{/* <Camera /> */}</div>

      <div className="img">
        <div>
          <label htmlFor="message">Image</label>
          <input
            className=" "
            type="file"
            name="image"
            onChange={async (event) => upload(event)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
