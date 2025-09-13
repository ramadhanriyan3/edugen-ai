import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";
import { NextRequest, NextResponse } from "next/server";

// GET WORKSHEET LIST
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const session = await auth();
  const userId = session?.user?.id;

  console.log({ session, userId, user: session?.user });

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

// EDIT_SHET_INFO
export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const sheetId = searchParams.get("sheetId");
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

    const worksheet = await prisma.worksheet.findFirst({
      where: {
        id: sheetId!,
        ownerId: userId,
      },
    });

    if (!worksheet) {
      return new NextResponse("Not found or not Owner", { status: 404 });
    }

    await prisma.worksheet.update({
      where: {
        id: sheetId!,
      },
      data: {
        //Nanti tambahkan sistem untuk ganti owner
        title: body.title,
        ownerId: body.ownerId,
      },
    });

    return new NextResponse("Workseet Edited", { status: 200 });
  } catch (err) {
    console.log("EDIT_WORKSHEET", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE WORKSEET
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const sheetId = searchParams.get("sheetId");
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!orgId) {
      return new NextResponse("Missing organization ID", { status: 400 });
    }

    const worksheet = await prisma.worksheet.findFirst({
      where: {
        id: sheetId!,
        ownerId: userId,
      },
    });

    if (!worksheet) {
      return new NextResponse("Not found or not Owner", { status: 404 });
    }

    await prisma.worksheet.delete({
      where: {
        id: sheetId!,
      },
    });

    return new NextResponse("Workseet Deleted", { status: 200 });
  } catch (err) {
    console.log("DELETE_WORKSHEET", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
