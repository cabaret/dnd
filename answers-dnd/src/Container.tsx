import React, { CSSProperties, useState } from 'react'
import { Answer } from './Answer'
import { AnswerGroup } from './AnswerGroup'

export const ItemTypes = {
  ANSWER: 'answer',
  GROUP: 'group',
}

const style: CSSProperties = {
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '2em auto',
}

export type Item = { id: number; type: 'answer' }
export type ItemGroup = {
  id: number
  type: 'group'
  items: Array<Item>
}

type ItemSet = Array<Item | ItemGroup>
const Container = () => {
  const [items, setItems] = useState<ItemSet>([
    { id: 1, type: 'answer' },
    { id: 2, type: 'answer' },
    { id: 3, items: [], type: 'group' },
    { id: 4, type: 'answer' },
    {
      id: 5,
      items: [
        {
          id: 6,
          type: 'answer',
        },
      ],
      type: 'group',
    },
  ])

  const addAnswer = () => {
    setItems(current => [
      ...current,
      { id: current.length + 1, type: 'answer' },
    ])
  }

  const addToGroup = (answer: Item, groupId: number) => {
    console.log(answer, groupId)
    const nextItems = items
      .filter(x => x.id !== answer.id)
      .map(x =>
        x.id !== groupId
          ? x
          : {
              ...x,
              items: [...(x as ItemGroup).items, answer],
            },
      )
    setItems(nextItems)
  }

  return (
    <div style={style}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 20,
        }}
      >
        <button style={{ flex: 1, margin: 5 }} onClick={addAnswer}>
          add answer
        </button>
        <button style={{ flex: 1, margin: 5 }}>add group</button>
      </div>
      {items.map((i, idx) => {
        switch (i.type) {
          case 'answer':
            return (
              <Answer item={i} index={idx} key={i.id} addToGroup={addToGroup} />
            )
          case 'group':
            return <AnswerGroup item={i} index={idx} key={i.id} />
          default:
            return null
        }
      })}
      <pre>
        <code>{JSON.stringify(items, null, 4)}</code>
      </pre>
    </div>
  )
}

export { Container }
