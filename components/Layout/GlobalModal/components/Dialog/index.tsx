import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useContext } from 'react';
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

import { GlobalsContext } from '@/context/Globals.context';

const Dialog = ({
  title,
  message,
  buttonText,
}: {
  title: string;
  message: string;
  buttonText: string;
}) => {
  const context = useContext(GlobalsContext);

  // Ensure context is not undefined
  if (!context) {
    throw new Error('error: context error');
  }

  // Now it's safe to access `testing` after the type check
  const { hideModal } = context;

  return (
    <View
      className='modal-content flex-1 w-full flex px-3 items-center justify-center relative'
      style={{ backgroundColor: background_variant_6 }}
    >
      <View
        className='px-5 py-5 flex rounded-[15px] w-full'
        style={{ backgroundColor: background_variant_1 }}
      >
        <Text
          style={{ fontFamily: 'font_600', color: text_variant_2 }}
          className='text-[17px] mb-3'
        >
          {title}
        </Text>
        <View className='mb-4'>
          <Text
            className='text-[12px] leading-[20px]'
            style={{ fontFamily: 'font_400', color: text_variant_1 }}
          >
            {message}
          </Text>
        </View>
        <TouchableOpacity
          className='px-6 py-3 rounded-[10px] self-start'
          style={{
            backgroundColor: background_variant_5,
            width: '100%',
            cursor: 'pointer',
          }}
          onPress={() => hideModal()}
        >
          <Text
            className='mt-[0.5px]'
            style={{
              fontFamily: 'font_600',
              textAlign: 'center',
              fontSize: 12,
              color: `${text_variant_2}`,
            }}
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dialog;
