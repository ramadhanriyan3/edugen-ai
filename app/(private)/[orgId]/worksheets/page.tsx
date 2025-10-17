import axios from "axios";
import { cookies } from "next/headers";

import NewWorksheetButton from "@/components/newWorksheetButton";
import WorksheetCard from "@/components/worksheetCard";
import { WorksheetType } from "@/lib/types";

const WorksheetsPage = async ({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) => {
  const orgId = (await params).orgId;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  async function getData() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/sheet?orgId=${orgId}`,
        {
          withCredentials: true,
          headers: {
            Cookie: cookieHeader,
          },
        }
      );
      const data = response.data;

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const worksheetList = (await getData()) || [];

  return (
    <div className="w-full relative m-3 h-full flex flex-col gap-2 md:gap-3">
      <div className="pt-20 pl-4 ml-16 md:ml-0">
        <h2 className="text-xl">{"Team files"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-8 pb-10">
          <NewWorksheetButton orgId={orgId} disabled={false} />
          {worksheetList.map((item: WorksheetType) => (
            <WorksheetCard
              key={item.id}
              id={item.id}
              title={item.title}
              authorName={item.owners!.name}
              authorId={item.ownerId}
              createdAt={item.createdAt}
              imageUrl={"http://ngasal.com"}
              orgId={item.orgId}
              isFavorites={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorksheetsPage;
