import { FC } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { DraggableCard, Props as CardType } from "./DraggableCard";
import "../styles.scss"

export type Props = {
  id: string;
  title: string;
  cards: CardType[];
};

export const SortableColumn: FC<Props> = ({ id, title, cards }) => {
  const { setNodeRef } = useDroppable({ id: id });
  return (
    <SortableContext id={id} items={cards} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className="column">
        <p>{title}</p>
        {cards.map((card) => (
          <DraggableCard key={card.id} id={card.id} title={card.title}></DraggableCard>
        ))}
      </div>
    </SortableContext>
  );
};
