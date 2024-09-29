import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
const Logo = require('@/assets/images/icon.png');
import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';
const {
  background_variant_1,
  background_variant_2,
  background_variant_3,
  background_variant_4,
  background_variant_5,
  background_variant_6,
} = default_light_backgrounds || {};
const {
  text_variant_1,
  text_variant_2,
  text_variant_3,
  text_variant_4,
  text_variant_5,
} = default_light_texts || {};

const Preloader = () => {
  // Create an Animated.Value for the scaling factor
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Function to start the zooming animation
  const startZooming = () => {
    // Create a loop that alternates between zooming in and out
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.25, // Zoom in scale factor
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Zoom out scale factor
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Start the animation when the component is mounted
  useEffect(() => {
    startZooming();
  }, []);

  return (
    <View
      className='modal-content flex-1 w-full flex px-3 items-center justify-center relative'
      // style={{ backgroundColor: background_variant_6 }}
    >
      <View style={styles.container}>
        <Animated.Image
          source={Logo} // Replace with your image URL
          style={[styles.image, { transform: [{ scale: scaleAnim }] }]} // Apply the scaling animation
          resizeMode='contain'
        />
      </View>
    </View>
  );
};

export default Preloader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
});
