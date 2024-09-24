"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Editor } from "./Editor";

export default function App() {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_B5dzknfaSIZ4K4KIRNxAIqGCvPcWEW7PcooZiMNMu9RaSoCiPBhSY1BVflbw1HjN"}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <Editor />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}