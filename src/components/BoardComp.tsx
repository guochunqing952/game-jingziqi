import React from 'react'
import { ChessType } from '../types/enums'
import { ChessComp } from './ChessComp'
import './BoardComp.css'

interface IProps {
  chessList: ChessType[]
  onClick?: (index: number) => void
  isOver: boolean
}

export default function BoardComp(props: IProps) {
  const list = props.chessList.map((item, i) => (
    <ChessComp
      key={i}
      type={item}
      onClick={() => {
        props.isOver === true && props.onClick && props.onClick(i)
      }}
    />
  ))
  return <div className="board">{list}</div>
}
