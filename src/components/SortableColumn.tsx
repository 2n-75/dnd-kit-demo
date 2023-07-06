import { FC } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
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
    // ソートを行うためのContextです。
    // strategyは4つほど存在しますが、今回は縦・横移動可能なリストを作るためrectSortingStrategyを採用
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} className="column">
        <p>{title}</p>
        {cards.map((card) => (
          <DraggableCard key={card.id} id={card.id} title={card.title}></DraggableCard>
        ))}
      </div>
    </SortableContext>
  );
};
