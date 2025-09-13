import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orgAmount = await prisma.organizationMember.findMany({
      where: {
        userId,
      },
    });

    if (orgAmount.length >= 3) {
      return new NextResponse("You have reach organization limit", {
        status: 400,
      });
    }

    const organization = await prisma.organization.create({
      data: {
        name: body.name,
        ownerId: userId,
        organizationMember: {
          create: {
            userId: userId,
            role: "owner",
          },
        },
      },
    });

    return NextResponse.json(organization, { status: 201 });
  } catch (err) {
    console.log("Creat_ORG", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

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

      const initialOrgs = await prisma.organization.findMany({
        where: {
          organizationMember: {
            some: { userId },
          },
        },
      });

      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(initialOrgs)}\n\n`)
      );

      // update data
      const interval = setInterval(async () => {
        const latestOrg = await prisma.organization.findFirst({
          where: {
            updatedAt: { gt: lastUpdatedAt },
            organizationMember: { some: { userId } },
          },
          orderBy: {
            updatedAt: "desc",
          },
        });

        if (latestOrg) {
          lastUpdatedAt = latestOrg.updatedAt;

          const orgData = await prisma.organization.findMany({
            where: {
              organizationMember: {
                some: {
                  userId,
                },
              },
            },
          });

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(orgData)}\n\n`)
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

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
      const orgName = body.name;
      console.log({ orgName });
    }
  } catch (err) {
    console.log("EDIT_ORG", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
