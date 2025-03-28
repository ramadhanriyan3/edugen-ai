"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma.db";

const getUserById = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (!user) {
      console.log(`User dengan ID ${session.user.id} tidak ditemukan.`);
      return null;
    }

    return user;
  } catch (error) {
    console.log("GET_USER_BY_ID", error);
    throw new Error("Gagal mengambil data user");
  }
};

const deleteAccount = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) throw new Error("Unauthorized");

    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    return { succes: true, message: "Account has been deleted" };
  } catch (error) {
    console.log("DELETE_ACCOUNT", error);
    return { succes: false, message: "Fail to delete account" };
  }
};

export { getUserById, deleteAccount };
