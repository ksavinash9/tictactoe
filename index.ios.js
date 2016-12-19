/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react'
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   PanResponder,
   TouchableOpacity,
   Animated,
   Image,
   Dimensions
 } from 'react-native';
 import App from './app/App'


 class tictactoe extends Component {
   constructor(props) {
     super(props);

     this.state = {
       pan: new Animated.ValueXY(),
       scale: new Animated.Value(1)
     };
   }

   componentWillMount() {
     this._panResponder = PanResponder.create({
       onMoveShouldSetResponderCapture: () => true,
       onMoveShouldSetPanResponderCapture: () => true,

       onPanResponderGrant: (e, gestureState) => {
         this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
         this.state.pan.setValue({x: 0, y: 0});
         Animated.spring(
           this.state.scale,
           { toValue: 1.2, friction: 3 }
         ).start();
       },

       onPanResponderMove: Animated.event([
         null, {dx: this.state.pan.x, dy: this.state.pan.y},
       ]),

       onPanResponderRelease: (e, {vx, vy}) => {
         this.state.pan.flattenOffset();
         Animated.spring(
           this.state.scale,
           { toValue: 1, friction: 3 }
         ).start();
       }
     });
   }

   render() {
     let { pan, scale } = this.state;

     let [translateX, translateY] = [pan.x, pan.y];

     let rotate = '0deg';

     let gridStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

     return (
       <View style={styles.container}>
         <Animated.View style={gridStyle} {...this._panResponder.panHandlers}>
           <App />
         </Animated.View>
       </View>
     )
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   }
 });

 AppRegistry.registerComponent('tictactoe', () => tictactoe)
