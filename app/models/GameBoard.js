import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet
} from 'react-native'

import Circle from './Circle'
import Cross from './Cross'
import {
  CENTER_POINTS,
  AREAS,
  CONDITIONS,
  RESULT_DEFAULT,
  RESULT_USER_WON,
  RESULT_AI_WON,
  RESULT_TIE
} from '../../config/GameEnv'
import Result from './Result'

export default class GameBoard extends Component {
  // Stores the current state of the GameBoard.
  state: {
    AIInputs: number[],
    userInputs: number[],
    result: number,
    round: number
  };

  AIMove() {
    const { userInputs, AIInputs, result } = this.state
    if (result !== -1) {
      return
    }
    while(true) {
      const inputs = userInputs.concat(AIInputs)

      const randomNumber = Math.round(Math.random() * 8.5)
      if (inputs.every(d => d !== randomNumber)) {
        this.setState({ AIInputs: AIInputs.concat(randomNumber) })
        this.checkWinner()
        break
      }
    }
  }

  isWinner(inputs: number[]) {
    return CONDITIONS.some(d => d.every(item => inputs.indexOf(item) !== -1))
  }

  checkWinner() {
    const { userInputs, AIInputs, result } = this.state
    const inputs = userInputs.concat(AIInputs)

    if (inputs.length >= 5 ) {
      let res = this.isWinner(userInputs)
      if (res && result !== RESULT_USER_WON) {
        return this.setState({ result: RESULT_USER_WON })
      }
      res = this.isWinner(AIInputs)
      if (res && result !== RESULT_AI_WON )  {
        return this.setState({ result: RESULT_AI_WON } )
      }
    }

    if (inputs.length === 9 && result === RESULT_DEFAULT && result !== RESULT_TIE) {
      this.setState({ result: RESULT_TIE })
    }
  }

  constructor() {
    super()
    this.state= {
      AIInputs: [],
      userInputs: [],
      result: RESULT_DEFAULT,
      round: 0
    }
  }

  restart() {
    const { round } = this.state
    this.setState({
      userInputs: [],
      AIInputs: [],
      result: RESULT_DEFAULT,
      round: round + 1
    })
    setTimeout(() => {
      if (round % 2 === 0) {
        this.AIMove()
      }
    }, 5)
  }

  componentDidMount() {
    this.restart()
  }

  boardClickingHandler(e: Object) {
    const { locationX, locationY } = e.nativeEvent
    const { userInputs, AIInputs, result } = this.state
    if (result !== -1) {
      return
    }
    const inputs = userInputs.concat(AIInputs)

    const area = AREAS.find(d =>
      (locationX >= d.startX && locationX <= d.endX) &&
      (locationY >= d.startY && locationY <= d.endY))

      if (area && inputs.every(d => d !== area.id)) {
        this.setState({
          userInputs: userInputs.concat(area.id)
        })
        setTimeout(() => {
          this.checkWinner()
          this.AIMove()
        }, 5)
      }
  }

  render() {
    const { userInputs, AIInputs, result } = this.state
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={e => this.boardClickingHandler(e)}>
          <View style={styles.board}>
            <View
              style={styles.line}
            />
            <View style={[styles.line, {
                width: 3,
                height: 306,
                transform: [
                  {translateX: 200}
                ]
              }]}
            />
            <View style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 100}
                ]
              }]}
            />
            <View style={[styles.line, {
                width: 306,
                height: 3,
                transform: [
                  {translateY: 200}
                ]
              }]}
            />
            {
              userInputs.map((d, i) => (
                <Circle
                  key={i}
                  xTranslate={CENTER_POINTS[d].x}
                  yTranslate={CENTER_POINTS[d].y}
                  color='#39CCCC'
                />
              ))
            }
            {
              AIInputs.map((d, i) => (
                <Cross
                  key={i}
                  xTranslate={CENTER_POINTS[d].x}
                  yTranslate={CENTER_POINTS[d].y}
                />
              ))
            }
          </View>
        </TouchableWithoutFeedback>
        <Result result={result} onRestart={() => this.restart()} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  board: {
    width: 312,
    height: 312,
    borderWidth: 3,
    borderColor: '#85144b'
  },
  line: {
    position: 'absolute',
    width: 3,
    height: 306,
    backgroundColor: '#85144b',
    transform: [
      {translateX: 100}
    ]
  }
})
