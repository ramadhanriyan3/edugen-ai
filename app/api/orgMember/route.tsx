import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";
import { NextRequest, NextResponse } from "next/server";

// GET MEMBER LIST
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

    const members = await prisma.organizationMember.findMany({
      where: {
        orgId: orgId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(members);
  } catch (err) {
    console.log("GET_MEMBERS", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// CREATE_MEMBER
export async function POST(req: NextRequest) {
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

    const exists = await prisma.organizationMember.findUnique({
      where: { userId_orgId: { userId, orgId } },
    });
    if (exists) return new NextResponse("Already a member", { status: 400 });

    const member = await prisma.organizationMember.create({
      data: {
        orgId,
        userId,
        role: "member",
      },
    });

    return NextResponse.json(member, { status: 201 });
  } catch (err) {
    console.log("ADD_MEMBER", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// EDIT_ROLE_MEMBER
export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const memberId = searchParams.get("memberId");
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!orgId) {
      return new NextResponse("Missing organization ID", { status: 400 });
    }

    const member = await prisma.organizationMember.findFirst({
      where: {
        userId,
        orgId: orgId,
        role: "owner",
      },
    });

    if (!member) {
      return new NextResponse("Not found or not Owner", { status: 404 });
    }

    await prisma.$transaction([
      prisma.organizationMember.update({
        where: { id: memberId! },
        data: { role: "owner" },
      }),
      prisma.organizationMember.update({
        where: {
          userId_orgId: { userId, orgId },
        },
        data: { role: "member" },
      }),
    ]);

    return new NextResponse("Member status Edited", { status: 200 });
  } catch (err) {
    console.log("EDIT_MEMBER", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE Member
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const memberId = searchParams.get("memberId");
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!orgId) {
      return new NextResponse("Missing organization ID", { status: 400 });
    }

    const member = await prisma.organizationMember.findFirst({
      where: {
        userId,
        orgId: orgId,
        role: "owner",
      },
    });

    if (!member) {
      return new NextResponse("Not found or not Owner", { status: 404 });
    }

    await prisma.organizationMember.delete({
      where: {
        id: memberId!,
      },
    });

    return new NextResponse("a user has Deleted", { status: 200 });
  } catch (err) {
    console.log("DELETE_MEMBER", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
