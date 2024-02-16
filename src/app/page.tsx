"use client";

import { DragAndDrop, DraggableComponent } from "@/DragAndDrop";
import { useLayoutEffect } from "react";

export default function Home() {
  useLayoutEffect(() => {
    const dragAndDrop = new DragAndDrop();

    // Usage: Create draggable components
    new DraggableComponent("text");
    new DraggableComponent("image");
  }, []);
  return <div id="app" className="app"></div>;
}
