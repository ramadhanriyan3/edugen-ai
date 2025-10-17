import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";
import { NextRequest, NextResponse } from "next/server";

// GET INVITATION  LIST
export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;
  const encoder = new TextEncoder();
  if (!userId) {
    return new NextResponse("Unauthorize", { status: 401 });
  }

  let lastUpdatedAt = new Date();

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode("data: Connected to SSE\n\n"));

      const invitationList = await prisma.orgInvitation.findMany({
        where: {
          invitedId: userId,
          status: "pending",
        },
        include: {
          owner: true,
          organization: true,
        },
      });

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(invitationList)}\n\n`)
      );

      // update data
      const interval = setInterval(async () => {
        const latestInv = await prisma.orgInvitation.findFirst({
          where: {
            updatedAt: { gt: lastUpdatedAt },
            invitedId: userId,
            status: "pending",
          },
          include: {
            owner: true,
            organization: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        });

        if (latestInv) {
          lastUpdatedAt = latestInv.updatedAt;

          const invData = await prisma.orgInvitation.findMany({
            where: {
              invitedId: userId,
            },
            take: 10,
          });

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(invData)}\n\n`)
          );
        }
      }, 2000);

      const cancel = () => {
        clearInterval(interval);
        controller.close();
      };

      req.signal?.addEventListener("abort", cancel);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// CREATE_INVITATION
export async function POST(req: NextRequest) {
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

    const exists = await prisma.orgInvitation.findFirst({
      where: { orgId, invitedId: memberId },
    });
    if (exists)
      return new NextResponse("Invitation already exists", { status: 400 });

    const invitation = await prisma.orgInvitation.create({
      data: {
        orgId,
        ownerId: userId,
        invitedId: memberId,
        status: "pending",
      },
    });

    return NextResponse.json(invitation, { status: 201 });
  } catch (err) {
    console.log("Create Invitation", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// EDIT_INVITATION_INFO
export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const invitationId = searchParams.get("invitationId");
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!orgId) {
      return new NextResponse("Missing organization ID", { status: 400 });
    }

    const invitation = await prisma.orgInvitation.findFirst({
      where: {
        id: invitationId!,
      },
    });

    if (!invitation) {
      return new NextResponse("Not found ", { status: 404 });
    }

    if (invitation.invitedId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.orgInvitation.update({
      where: {
        id: invitationId!,
      },
      data: {
        status: "accepted",
      },
    });

    return new NextResponse("INVITATION Edited", { status: 200 });
  } catch (err) {
    console.log("EDIT_INVITATION", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// DELETE Invitation

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId");
  const invId = searchParams.get("invId");
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!orgId) {
      return new NextResponse("Missing organization ID", { status: 400 });
    }

    const invitation = await prisma.orgInvitation.findFirst({
      where: {
        id: invId!,
        invitedId: userId,
      },
    });

    if (!invitation) {
      return new NextResponse("Not found or not Owner", { status: 404 });
    }

    if (invitation.invitedId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.orgInvitation.delete({
      where: {
        id: invId!,
      },
    });

    return new NextResponse("Invitation Deleted", { status: 200 });
  } catch (err) {
    console.log("DELETE_Invitation", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
