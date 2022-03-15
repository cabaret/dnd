import React, { FC, useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { Item, ItemTypes } from './Container'

const Answer: FC<{
  index: number
  item: Item
  addToGroup?: (answer: Item, groupId: number) => void
}> = ({ index, item, addToGroup }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.ANSWER,
      item,
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<{ groupId: number }>()
        console.log(item, dropResult)

        if (item && dropResult && addToGroup) {
          addToGroup(item, dropResult.groupId)
        }
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [addToGroup],
  )
  return (
    <div
      ref={drag}
      style={{
        border: '1px dashed #333',
        padding: 10,
        display: 'flex',
        marginBottom: 10,
        flex: 1,
      }}
    >
      {index + 1}
    </div>
  )
}

export { Answer }
