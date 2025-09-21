import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { sheetId: string } }
) {
  const { sheetId } = await params;
  const session = await auth();

  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sheetById = await prisma.worksheet.findUnique({
      where: {
        id: sheetId,
      },
    });

    return NextResponse.json(sheetById);
  } catch (error) {
    console.log("GET_SHEET_BY_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// EDIT_SHET_INFO
export async function PATCH(
  req: NextRequest,
  { params }: { params: { sheetId: string } }
) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const sheetId = (await params).sheetId;
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
export async function DELETE(
  req: NextRequest,
  { params }: { params: { sheetId: string } }
) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const sheetId = (await params).sheetId;
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
