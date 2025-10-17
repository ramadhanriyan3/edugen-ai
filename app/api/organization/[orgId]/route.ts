import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const { orgId } = await params;
  const session = await auth();

  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const sheetById = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    });

    return NextResponse.json(sheetById);
  } catch (error) {
    console.log("GET_ORG_BY_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const body = await req.json();
  const session = await auth();
  const userId = session?.user?.id;
  const { orgId } = await params;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const organization = await prisma.organization.findUnique({
      where: {
        id: orgId!,
        ownerId: userId,
      },
    });

    if (!organization) {
      return new NextResponse("your not owner", { status: 401 });
    }

    const editedOrg = await prisma.organization.update({
      where: {
        id: orgId!,
      },
      data: {
        name: body.name,
        ownerId: body.ownerId,
      },
    });

    return NextResponse.json(editedOrg, { status: 200 });
  } catch (err) {
    console.log("EDIT_ORG", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ orgId: string }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  const { orgId } = await params;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const organization = await prisma.organization.findUnique({
      where: {
        id: orgId!,
        ownerId: userId,
      },
    });

    if (!organization) {
      return new NextResponse("your not owner", { status: 401 });
    }

    const deletedOrg = await prisma.organization.delete({
      where: {
        id: orgId!,
      },
    });

    return NextResponse.json(deletedOrg, { status: 200 });
  } catch (err) {
    console.log("DELETE_ORG", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
