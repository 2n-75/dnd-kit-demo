import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableColumn, Props as SortableColumnProps } from "./components/SortableColumn";

export default function App() {
  const data: SortableColumnProps["cards"] =
    [
      {
        id: "Card1",
        title: "Card1"
      },
      {
        id: "Card2",
        title: "Card2"
      },
      {
        id: "Card3",
        title: "Card3"
      },
      {
        id: "Card4",
        title: "Card4"
      }
    ]

  const [columnItems, setColumnItems] = useState<SortableColumnProps["cards"]>(data);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;

    const activeIndex = columnItems.findIndex((i) => i.id === activeId);
    const overIndex = columnItems.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumnItems(arrayMove(columnItems, activeIndex, overIndex));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const onSubmit = () => {
    console.log("submit", { columnItems })
  }

  return (
    <main>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}

      >
        <SortableColumn
          id={"column1"}
          title={"並べ替え可能なデータ"}
          cards={columnItems}
        ></SortableColumn>
      </DndContext>

      <section className="resultSection">
        <p>保存された順番</p>
        <ul className="list">
          {columnItems.map(item =>
            <li key={item.id} className="listItem">{item.title}</li>
          )}
        </ul>
        <button type="submit" onClick={onSubmit} className="submitButton">
          送信
        </button>
      </section>
    </main>

  );
}
