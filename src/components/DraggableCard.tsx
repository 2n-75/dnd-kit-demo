
import { FC } from "react"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import "../styles.scss"

export type Props = {
  id: string
  title: string
};

export const DraggableCard: FC<Props> = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id
  })

  const style = {
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div id={id} className="card">
        <p>{title}</p>
      </div>
    </div>
  )
}
