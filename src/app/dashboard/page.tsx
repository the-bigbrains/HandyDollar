import setAccessToken from "@/lib/setAccessToken";
import sync from "@/lib/sync";

export default async function Dashboard() {
  const token = await setAccessToken();
  const tx = await sync(token);

  return <h1>Welcome to the dashboard</h1>;
}
