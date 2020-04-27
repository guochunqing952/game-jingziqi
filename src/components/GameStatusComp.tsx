import React from 'react'
import { GameStatus, ChessType } from '../types/enums'
import './GameStatusComp.css'

interface IProps {
  status: GameStatus
  nextChess: ChessType.black | ChessType.red
}

export function GameStatusComp(props: IProps) {
  let content = <div></div>
  if (props.status === GameStatus.gaming) {
    if (props.nextChess === ChessType.black) {
      content = <div className="black">黑方落子</div>
    } else {
      content = <div className="red">红方落子</div>
    }
  } else if (props.status === GameStatus.equal) {
    content = <div className="equal win">平局</div>
  } else if (props.status === GameStatus.redwin) {
    content = <div className="red win">红方胜利</div>
  } else if (props.status === GameStatus.blackWin) {
    content = <div className="black win">黑方胜利</div>
  }

  return <div className="status">{content}</div>
}
