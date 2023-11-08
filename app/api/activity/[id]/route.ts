import prisma from "@/app/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headersInstance = headers();

  const authorization = headersInstance.get("authorization")?.split(" ")[1];
  if (authorization == null) {
    return new NextResponse("Missing Token", { status: 400 });
  }
  try {
    const x = jwt.verify(authorization!, process.env.JWT_KEY!);
  } catch {
    return new NextResponse("Invalid Token", { status: 400 });
  }
  const param = params.id;

  const obj = await prisma.activity.findFirst({
    where: { id: param },
  });

  return NextResponse.json(obj);
}
