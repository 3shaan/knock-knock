import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma?.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log("registration error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
