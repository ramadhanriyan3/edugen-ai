import { Room } from "@/app/room";
import { Editor } from "@/components/textEditor/Editor";

export default async function Page({
  params,
}: {
  params: Promise<{ orgId: string; worksheetId: string }>;
}) {
  const { orgId, worksheetId } = await params;

  return (
    <main>
      <Room roomId={worksheetId} orgId={orgId}>
        <Editor />
      </Room>
    </main>
  );
}
