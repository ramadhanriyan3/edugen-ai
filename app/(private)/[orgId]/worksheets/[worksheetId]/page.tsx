import { Room } from "@/app/room";
import { Editor } from "@/components/textEditor/Editor";

export default function Page() {
  return (
    <main>
      <Room>
        <Editor />
      </Room>
    </main>
  );
}
