import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Header extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          TicaToes
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#FF4136',
    flexDirection: 'row'
  },
  title: {
    color: '#001f3f',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 45,
    textAlign: 'center',
    margin: 50,
  }
})
