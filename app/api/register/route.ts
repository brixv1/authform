import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  if (!email || !name || !password) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  if (password.length < 8) {
    return new NextResponse("Password needs to be 8 characters or longer", {
      status: 400,
    });
  }

  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) {
    return new NextResponse("User with that E-mail already exists", {
      status: 400,
    });
  }

  const nameExists = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  if (nameExists) {
    return new NextResponse("User with that Username already exists", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
