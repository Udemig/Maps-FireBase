//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
// create a component
const CustomAnimation = () => {
  return (
    <View style={{width: 100, height: 100}}>
      <LottieView
        source={require('../../assets/animations/CurrentLocation.json')}
        autoPlay
        loop
        style={{width: 125, height: 125}}
      />
    </View>
  );
};

export default CustomAnimation;
