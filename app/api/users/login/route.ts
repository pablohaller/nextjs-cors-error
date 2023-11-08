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
