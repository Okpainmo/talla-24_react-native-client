import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';
import { Ionicons } from '@expo/vector-icons';
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

const ErrorPopUp = ({ popUpMessage }: { popUpMessage: string }) => {
  return (
    <View
      className='modal-content flex-1 w-full flex flex-row justify-center relative top-[15px]'
      //   style={{ backgroundColor: background_variant_6 }}
    >
      {/* <ImageBackground
          style={{
            width: 60,
            height: 60,
            // borderRadius: 50,
          }}
          source={Logo}
          // resizeMethod='scale'
          // accessibilityLabel='user avatar'
        >
          <View
            className='w-full h-full flex justify-center items-center'
            // style={{ backgroundColor: background_variant_6 }}
          >
          </View>
        </ImageBackground> */}
      <View
        className='flex flex-row items-center rounded-[15px] min-w-[150px] px-3 py-1 self-start 
        justify-evenly'
        style={{ backgroundColor: background_variant_5 }}
      >
        <Ionicons
          className='mr-1'
          name='close-circle'
          size={23}
          color='#ef4444'
          //   style={{ color: text_variant_2 }}
        />
        <Text
          className='text-[12px] ml-1'
          style={{ color: text_variant_2, fontFamily: 'font_400' }}
        >
          {popUpMessage}
        </Text>
      </View>
    </View>
  );
};

export default ErrorPopUp;

const styles = StyleSheet.create({});
