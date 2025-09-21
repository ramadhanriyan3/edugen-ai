"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Loading } from "@/components/textEditor/loading";

export function Room({
  children,
  roomId,
  orgId,
}: {
  children: ReactNode;
  roomId: string;
  orgId: string;
}) {
  return (
    <LiveblocksProvider authEndpoint={`/api/liveblocks-auth?orgId=${orgId}`}>
      <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={<Loading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
