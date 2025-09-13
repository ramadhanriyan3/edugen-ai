import { auth } from "@/auth";
import { getRandomPresenceColor } from "@/lib/helper";
import { prisma } from "@/lib/prisma.db";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";

const API_KEY =
  "sk_dev_xYyd0HPFF4i4_hCdVhT_ezjjQ78ypqGOHBSVparooq5AK11uJu7LKqttBw2RWwor";

const liveblocks = new Liveblocks({
  secret: API_KEY!,
});

export async function POST(
  request: NextRequest,
  { params }: { params: { orgId: string; worksheetId: string } }
) {
  const authSession = await auth();
  const user = authSession?.user;
  const orgId = params.orgId;

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const isMember = await prisma.organizationMember.findFirst({
    where: {
      userId: user.id!,
      orgId: orgId!,
    },
  });

  if (!isMember) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const session = liveblocks.prepareSession(user.id!, {
    userInfo: {
      name: user.name!,
      avatar: user.image!,
      color: getRandomPresenceColor(),
    },
  });

  // Give the user access to the room
  const { room } = await request.json();
  session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
