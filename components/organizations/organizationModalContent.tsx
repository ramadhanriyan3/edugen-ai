"use client";

import { Settings, Users2 } from "lucide-react";
import { useState } from "react";
import OrganizationMembers from "./organizationMembers";

const OrganizationModalContent = () => {
  const [position, setPosition] = useState<"setting" | "user">("setting");

  return (
    <div className="flex w-full h-full bg-white ">
      <div className="w-fit gap-y-2 flex flex-col  pr-4 h-full shadow-[4px_0_4px_-4px_rgba(0,0,0,0.3)] z-10 bg-white">
        <Settings
          onClick={() => setPosition("setting")}
          className={` rounded-sm w-8 h-8 p-1 text-primary cursor-pointer hover:bg-primary/30 transition-colors ${
            position === "setting" && "bg-primary/30"
          }`}
        />
        <Users2
          onClick={() => setPosition("user")}
          className={`rounded-sm w-8 h-8 p-1 text-primary cursor-pointer hover:bg-primary/30 transition-colors ${
            position !== "setting" && "bg-primary/30"
          }`}
        />
      </div>
      <div className="pl-2">
        {position === "setting" ? (
          <div>disini setting</div>
        ) : (
          <OrganizationMembers />
        )}
      </div>
    </div>
  );
};

export default OrganizationModalContent;
