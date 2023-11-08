import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const headersInstance = headers();

  const authorization = headersInstance.get("authorization")?.split(" ")[1];

  if (authorization == null) {
    return new NextResponse("Missing Token", { status: 400 });
  }
  try {
    const x = jwt.verify(authorization!, process.env.JWT_KEY!);
    const list = await prisma.activity.findMany();
    return NextResponse.json(list);
  } catch (err) {
    return new NextResponse("Error", { status: 400 });
  }
}

export async function POST(request: Request) {
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

  const res = await request.json();

  const create = await prisma.activity.create({
    data: {
      title: res.title,
      description: res.description,
      image: res.image,
    },
  });
  return NextResponse.json({ ...create });
}
