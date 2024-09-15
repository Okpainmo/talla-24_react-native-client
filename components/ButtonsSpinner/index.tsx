import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const Preloader = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuously loop the rotation animation
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000, // 1 second for a full rotation
        // easing: Animated.Easing.linear, // Ensures smooth continuous rotation
        useNativeDriver: true, // Use native driver for performance
      })
    ).start();
  }, [rotateValue]);

  // Interpolate the rotation value to rotate 360 degrees
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
  });

  // Apply the animated rotation style
  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <Animated.View style={[styles.loader, animatedStyle]}>
      <View style={styles.loaderPart} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderPart: {
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: '#d3d3d3', // Static gray color
    borderTopColor: '#3498db', // Spinning part color
    borderRadius: 12, // Circular shape
  },
});

export default Preloader;
