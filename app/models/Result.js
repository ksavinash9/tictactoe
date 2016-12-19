import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

import {
  RESULT_DEFAULT,
  RESULT_USER_WON,
  RESULT_AI_WON,
  RESULT_TIE
} from '../../config/GameEnv'


export default class Header extends Component {
  generateResultString(result: number) {
    switch (result) {
      case RESULT_USER_WON:
        return 'You have won the game! :)'
      case RESULT_AI_WON:
        return 'Better luck next time! :/'
      case RESULT_TIE:
        return 'Tie -_-!'
      default:
        return ''
    }
  }

  render() {
    const { result, onRestart } = this.props
    return (
      <View>
        <Text style={styles.text}>{ this.generateResultString(result) }</Text>
        {
          result !== RESULT_DEFAULT && (
            <TouchableOpacity onPress={() => onRestart()}>
              <Text style={styles.instructions}>
                Touch here to play again
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  instructions: {
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
    textAlign: 'center'
  },
})
