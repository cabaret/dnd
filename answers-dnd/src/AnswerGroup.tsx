import React, { CSSProperties, FC, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Answer } from './Answer'
import { ItemGroup, ItemTypes } from './Container'

const style: CSSProperties = {
  border: '2px solid #000',
  padding: 10,
  display: 'flex',
  marginBottom: 10,
  flex: 1,
  flexDirection: 'column',
}

const AnswerGroup: FC<{
  item: ItemGroup
  index: number
}> = ({ index, item }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ANSWER,
    drop: monitor => ({ groupId: item.id, monitor }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.GROUP,
    item: { item, answerGroupId: item.id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = '#fff'
  if (isActive) {
    backgroundColor = '#ddd'
  } else if (canDrop) {
    backgroundColor = '#dedede'
  }

  drag(drop(ref))

  return (
    <div ref={ref} style={{ ...style, backgroundColor }}>
      {`GR-${index + 1}`}
      {item?.items.map((answer, idx) => (
        <Answer index={idx} item={answer} key={`nested-${item.id}-${idx}`} />
      ))}
    </div>
  )
}

export { AnswerGroup }
