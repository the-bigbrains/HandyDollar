"use client";

import React, { useEffect, useState } from "react";
import computerVision from "@/lib/computerVision";

interface Props {
  gpt: string[];
}

const Vision = async (props: Props) => {
  // const [stuff, setStuff] = useState<Choice[]>([]);

  // useEffect(() => {
  //   const yeet = async () => {
  //     if (!stuff.length) {
  //       console.log("running");
  //       const test =
  //       setStuff(test);
  //     }
  //   };

  //   yeet();
  // }, []);

  return (
    <main className="text-white">
      <pre>{JSON.stringify(props.gpt, null, 2)}</pre>
    </main>
  );
};

export default Vision;
