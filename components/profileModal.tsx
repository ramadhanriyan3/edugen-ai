"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { deleteAccount, getUserById } from "@/actions/user.action";
import ConfirmActionContent from "@/components/confirmActionContent";
import { deleteExams } from "@/actions/exam.action";
import { signOut } from "next-auth/react";

type UserType = {
  name: string | null;
  image: string | null;
  email: string | null;
  id: string;
};

const ProfileModal = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState<{
    deleteExams: boolean;
    deleteAccount: boolean;
  }>({ deleteAccount: false, deleteExams: false });
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash === "#profile");
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const user = await getUserById();
      setUserData(user);
    };
    getUserData();
  }, [userId]);

  const handleDeleteExams = async () => {
    await deleteExams();
    setIsAlertOpen((prev) => ({ ...prev, deleteExams: false }));
    setIsOpen(false);
    router.push("/e");
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
    signOut({ redirectTo: "/" });
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-[600px] bg-primary-foreground">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>Profile</AlertDialogTitle>
          <div
            onClick={() => {
              router.push(pathname);
              setIsOpen(false);
            }}
            className="p-1 w-fit hover:bg-primary/20 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </div>
        </AlertDialogHeader>
        <div className="w-full flex gap-x-4">
          <Image
            src={userData?.image || "/user.png"}
            alt="photo-profile"
            width={80}
            height={80}
            className="rounded-full border h-fit"
          />
          <div className="flex flex-col gap-y-4 w-full py-2">
            <div className="flex items-center justify-between text-primary">
              <p className=" pb-1">Username</p>
              <p className="px-4 ">{userData?.name}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between text-primary">
              <p className="pb-1">Email</p>
              <p className="px-4">{userData?.email}</p>
            </div>
            <hr />
            <div className="flex items-center justify-between text-primary">
              <p className="pb-1">Phone number</p>
              <p className="px-4">-</p>
            </div>
            <hr />
            <div className="flex items-center justify-between text-primary">
              <p className="pb-1">Delete all exams</p>
              <AlertDialog open={isAlertOpen.deleteExams}>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={() =>
                      setIsAlertOpen((prev) => ({
                        ...prev,
                        deleteExams: true,
                      }))
                    }
                    className="w-fit flex items-center gap-x-2"
                  >
                    Delete all
                  </Button>
                </AlertDialogTrigger>
                <ConfirmActionContent
                  title="Are you absolutely sure? "
                  content="This action cannot be undone. This will permanently delete your all exams history"
                  handleAction={handleDeleteExams}
                  handleClose={() =>
                    setIsAlertOpen((prev) => ({
                      ...prev,
                      deleteExams: false,
                    }))
                  }
                />
              </AlertDialog>
            </div>
            <hr />
            <div className="flex items-center justify-between text-primary">
              <p className="pb-1">Delete account</p>
              <AlertDialog open={isAlertOpen.deleteAccount}>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant={"destructive"}
                    onClick={() =>
                      setIsAlertOpen((prev) => ({
                        ...prev,
                        deleteAccount: true,
                      }))
                    }
                    className="w-fit flex items-center gap-x-2"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <ConfirmActionContent
                  title="Are you absolutely sure? "
                  content="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                  handleAction={handleDeleteAccount}
                  handleClose={() =>
                    setIsAlertOpen((prev) => ({
                      ...prev,
                      deleteAccount: false,
                    }))
                  }
                />
              </AlertDialog>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProfileModal;
