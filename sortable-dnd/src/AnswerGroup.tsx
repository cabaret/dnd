import React, { FC, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { XYCoord, Identifier } from 'dnd-core'
import { ItemTypes } from './ItemTypes'
import { Answer } from './Answer'
import { Item } from './Container'

const style = {
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export interface AnswerGroupProps {
  id: string
  index: number
  move: (dragIndex: number, hoverIndex: number) => void
  members: Array<Item>
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const AnswerGroup: FC<AnswerGroupProps> = ({
  index,
  id,
  move,
  members,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.ANSWER,
    drop: () => ({ groupId: id }),
    collect(monitor) {
      console.log(monitor.getHandlerId())
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    //hover(item: DragItem, monitor) {
    //if (!ref.current) {
    //  return
    //}
    //const dragIndex = item.index
    //const hoverIndex = index
    //if (dragIndex === hoverIndex) {
    //  return
    //}
    //const hoverBoundingRect = ref.current?.getBoundingClientRect()
    //const hoverMiddleY =
    //  (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    //const clientOffset = monitor.getClientOffset()
    //const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
    //if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //  return
    //}
    //if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //  return
    //}
    //move(dragIndex, hoverIndex)
    //item.index = hoverIndex
    //},
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ANSWER_GROUP,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div style={style} ref={ref}>
      {index} - {id}
      {members.map((child, childidx) => (
        <Answer index={childidx + 1} id={child.id} move={move} key={child.id} />
      ))}
    </div>
  )
}
