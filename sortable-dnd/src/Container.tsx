import React, { FC, useState, useCallback } from 'react'
import update from 'immutability-helper'
import { Answer } from './Answer'
import { nanoid } from 'nanoid'
import { AnswerGroup } from './AnswerGroup'

const style = {
  width: 400,
}

export interface Item {
  id: string
}

export interface ItemGroup {
  id: string
  members: Array<Item>
}

export type ContainerState = Array<Item | ItemGroup>

function isItemGroup(item: Item | ItemGroup): item is ItemGroup {
  return (item as ItemGroup).members !== undefined
}

export const Container: FC = () => {
  const [items, setItems] = useState<ContainerState>([
    {
      id: nanoid(),
    },
    {
      id: nanoid(),
    },
    {
      id: nanoid(),
    },
    {
      id: nanoid(),
    },
    {
      id: nanoid(),
    },
    {
      id: nanoid(),
    },
    {
      id: nanoid(),
    },
    {
      id: nanoid(),
      members: [
        {
          id: nanoid(),
        },
        {
          id: nanoid(),
        },
      ],
    },
  ])

  const move = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevItems: ContainerState) =>
      update(prevItems, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevItems[dragIndex] as Item],
        ],
      }),
    )
  }, [])

  const renderItem = useCallback(
    (item: Item, index: number) => (
      <Answer key={item.id} index={index} id={item.id} move={move} />
    ),
    [move],
  )

  const renderItemGroup = useCallback(
    (item: ItemGroup, index: number) => (
      <AnswerGroup
        key={item.id}
        index={index}
        id={item.id}
        move={move}
        members={item.members}
      />
    ),
    [move],
  )

  return (
    <>
      <div style={style}>
        {items.map((item, i) =>
          isItemGroup(item) ? renderItemGroup(item, i) : renderItem(item, i),
        )}
      </div>
    </>
  )
}
