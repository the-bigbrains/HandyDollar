import Vision from "./Vision";
import gpt from "@/lib/gpt";
import computerVision from "@/lib/computerVision";


export default async function Page() {
  const res = await computerVision();

  console.log("running");

  return <Vision gpt={res} />;
}
