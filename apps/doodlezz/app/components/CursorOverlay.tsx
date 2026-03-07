import React, { useEffect, useState } from "react";
import { Game } from "../draw/Game";
import { CursorData } from "../../types/types";

// SVG Cursor Icon matching the user-provided design (standard arrow, anchored at 0,0)
const CursorIcon = ({ color }: { color: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-sm"
  >
    <path
      d="M3 3L10 19L13 13L19 10L3 3Z"
      fill={color}
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Helper to deterministically pick a color based on user name/ID
const getColorForUser = (str: string) => {
  const colors = [
    "#ef4444", // red
    "#f97316", // orange
    "#f59e0b", // amber
    "#10b981", // emerald
    "#06b6d4", // cyan
    "#3b82f6", // blue
    "#8b5cf6", // violet
    "#d946ef", // fuchsia
    "#f43f5e", // rose
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

interface CursorOverlayProps {
  game: Game | null;
}

export default function CursorOverlay({ game }: CursorOverlayProps) {
  const [cursors, setCursors] = useState<Map<string, CursorData>>(new Map());
  
  // Use state to trigger re-renders even if map contents change but reference doesn't
  const [updateTick, setUpdateTick] = useState(0);

  useEffect(() => {
    if (!game) return;

    const handleCursorUpdate = (updatedCursors: Map<string, CursorData>) => {
      setCursors(updatedCursors);
      setUpdateTick((t) => t + 1); // Force re-render
    };

    const handleStateChange = () => {
      // Force re-render on pan/zoom so cursors stay stickied to the canvas
      setUpdateTick((t) => t + 1);
    };

    game.onCursorChange(handleCursorUpdate);
    game.onStateChange(handleStateChange);

    return () => {
      // Cleanups conceptually if we added remove listeners
    };
  }, [game]);

  if (!game || cursors.size === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {Array.from(cursors.values()).map((cursor) => {
        // Convert canvas coordinates (where they drew) into our absolute screen coordinates
        const screenCoords = game.canvasToScreen(cursor.x, cursor.y);
        const color = getColorForUser(cursor.userId);

        return (
          <div
            key={cursor.userId}
            className="absolute top-0 left-0 transition-transform duration-100 ease-out flex flex-col items-start select-none"
            style={{
              transform: `translate(${screenCoords.x}px, ${screenCoords.y}px)`,
            }}
          >
            <CursorIcon color={color} />
            <div
              className="mt-0 ml-3 px-3 py-0.5 rounded-full text-[11px] text-black font-bold whitespace-nowrap shadow-md border border-white/40"
              style={{ backgroundColor: color }}
            >
              {cursor.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
