import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  try {
    // Buscamos email en DB
    const usuarioDB = await prisma.adminUser.findFirst({
      where: {
        email,
      },
    });
    // Evaluamos si existe el usuario en DB
    if (!usuarioDB) {
      return new NextResponse("Usuario o Contrasenia invalidos", {
        status: 400,
      });
    }

    // Evaluamos la contraseña correcta
    if (!bcrypt.compareSync(password, usuarioDB.password)) {
      return new NextResponse("Usuario o Contrasenia invalidos", {
        status: 400,
      });
    }

    const token = jwt.sign(
      {
        data: usuarioDB,
      },
      process.env.JWT_KEY!,
      { expiresIn: "1h" }
    ); // Expira en 1 hora.

    // Pasó las validaciones
    return NextResponse.json({
      usuarioDB,
      token: token,
    });
  } catch (error) {
    return new NextResponse("Ocurrio un error:" + error, {
      status: 400,
    });
  }
}


export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Credentials": "true",
      "Same-Site": "none",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS,PATCH",
      "Access-Control-Allow-Headers": "*",
        // "Origin, Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });

  return response;
}
