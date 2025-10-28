import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { tag } = await req.json();
  revalidateTag(tag);
  return NextResponse.json({ revalidated: tag });
}
