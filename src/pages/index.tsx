import sync from "@/lib/sync";
import setAccessToken from "@/lib/setAccessToken";

export default async function Home() {
  const token = await setAccessToken();
  const tx = await sync(token);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre>{JSON.stringify(tx, null, 2)}</pre>
    </main>
  );
}
