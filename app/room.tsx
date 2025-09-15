"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

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
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
