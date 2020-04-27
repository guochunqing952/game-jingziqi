import React, { Component } from 'react'
import { ChessType, GameStatus } from '../types/enums'
import BoardComp from './BoardComp'
import { GameStatusComp } from './GameStatusComp'

interface IState {
  cheeses: ChessType[]
  gamestatus: GameStatus
  nextChess: ChessType.red | ChessType.black
}

export default class GameComp extends Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      cheeses: [],
      gamestatus: GameStatus.gaming,
      nextChess: ChessType.black,
    }

    this.handleClick = this.handleClick.bind(this)
    this.init = this.init.bind(this)
  }

  //组件初步嵌入到页面后
  componentDidMount() {
    this.init()
  }

  //初始化数据
  init() {
    let chessArr: ChessType[] = []
    for (let i = 0; i < 9; i++) {
      chessArr.push(ChessType.none)
    }
    this.setState({
      cheeses: chessArr,
      gamestatus: GameStatus.gaming,
      nextChess: ChessType.black,
    })
  }

  handleClick = (i: number) => {
    const newChess = [...this.state.cheeses]
    newChess[i] = this.state.nextChess
    this.setState({
      cheeses: newChess,
      nextChess:
        this.state.nextChess === ChessType.red
          ? ChessType.black
          : ChessType.red,
      gamestatus: this.getGameStatus(newChess, i),
    })
  }

  // GameStatus.gaming
  //通过判断，得到游戏状态
  getGameStatus(arr: ChessType[], i: number): GameStatus {
    //一方胜利
    let horMin = Math.floor(i / 3) * 3
    let verMin = i % 3
    if (
      (arr[horMin] === arr[horMin + 1] && arr[horMin] === arr[horMin + 2]) ||
      (arr[verMin] === arr[verMin + 3] && arr[verMin] === arr[verMin + 6]) ||
      (arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== ChessType.none) ||
      (arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== ChessType.none)
    ) {
      if (arr[i] === ChessType.black) {
        return GameStatus.blackWin
      }

      if (arr[i] === ChessType.red) {
        return GameStatus.redwin
      }
    }

    //平局
    if (!arr.includes(ChessType.none)) {
      return GameStatus.equal
    }

    //进行中
    return GameStatus.gaming
  }

  render() {
    return (
      <div className="game" style={{ textAlign: 'center' }}>
        <h1>井字棋游戏</h1>
        <GameStatusComp
          status={this.state.gamestatus}
          nextChess={this.state.nextChess}
        />
        <BoardComp
          chessList={this.state.cheeses}
          isOver={this.state.gamestatus === GameStatus.gaming}
          onClick={this.handleClick}
        />
        <button
          onClick={() => {
            this.init()
          }}
        >
          重新开始
        </button>
      </div>
    )
  }
}
