import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const create = await prisma.activity.create({
    data: {
      slug: "Papa frita",
    },
  });
  return NextResponse.json({ ...create });
}
