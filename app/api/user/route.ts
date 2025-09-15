import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";
import { NextRequest, NextResponse } from "next/server";

// GET WORKSHEET LIST
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: search!, mode: "insensitive" } },
          { email: { contains: search!, mode: "insensitive" } },
        ],
      },
      include: {
        orgInvitation: true,
      },
      take: 5,
    });

    return NextResponse.json(users);
  } catch (err) {
    console.log("GET_ users", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
