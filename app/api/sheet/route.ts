import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";
import { NextRequest, NextResponse } from "next/server";

// GET WORKSHEET LIST
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!orgId) {
      return new NextResponse("Missing organization ID", { status: 400 });
    }

    const worksheets = await prisma.worksheet.findMany({
      where: {
        orgId: orgId,
      },
      include: {
        owners: true,
      },
    });

    return NextResponse.json(worksheets);
  } catch (err) {
    console.log("GET_WORKSHEETS", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// CREATE_WORKSHEET
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const session = await auth();
  const userId = session?.user?.id;
  const body = await req.json();

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!orgId) {
      return new NextResponse("Missing organization ID", { status: 400 });
    }

    const worksheet = await prisma.worksheet.create({
      data: {
        title: body.title,
        orgId,
        ownerId: userId,
      },
    });

    return NextResponse.json(worksheet, { status: 201 });
  } catch (err) {
    console.log("GET_WORKSHEETS", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
