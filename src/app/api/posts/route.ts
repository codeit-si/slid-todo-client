import sleep from "@/app/sleep";

export async function GET() {
  await sleep(4);

  return Response.json("Hello world");
}
