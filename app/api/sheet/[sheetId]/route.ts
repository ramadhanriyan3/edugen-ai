import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { sheetId: string } }
) {
  const { sheetId } = params;
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
