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
import Preloader from './components/Preloader';
const Logo = require('@/assets/images/icon.png');
import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';
import SuccessPopUp from './components/SuccessPopUp';
import CautionPopUp from './components/CautionPopUp';
import ErrorPopUp from './components/ErrorPopUp';
import Dialog from './components/Dialog';
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

const GlobalModal = () => {
  return (
    <Modal
      //   animationType='slide'
      //   animationType='none'
      animationType='fade'
      transparent={true}
      visible={true}
      // style={{ height: 300 }}
    >
      {/* <Preloader /> */}
      {/* <SuccessPopUp popUpMessage='successful request' /> */}
      {/* <ErrorPopUp popUpMessage='request unsuccessful, please try again' /> */}
      {/* <CautionPopUp popUpMessage='press again to exit' /> */}
      <Dialog
        title='Request sent successfully.'
        message='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
              repellendus corporis ex quos dolor unde repellendus corporis ex
              quos dolor.'
        buttonText='Got it, thanks!'
      />
    </Modal>
  );
};

export default GlobalModal;

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
