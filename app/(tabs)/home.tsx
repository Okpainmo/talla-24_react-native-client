import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import { Link, router } from 'expo-router';
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
} = default_light_backgrounds || {};
const {
  text_variant_1,
  text_variant_2,
  text_variant_3,
  text_variant_4,
  text_variant_5,
} = default_light_texts || {};

const Home = () => {
  return (
    <ScrollView
      className='flex-1'
      style={{
        backgroundColor: background_variant_1,
        paddingTop: Platform.OS === 'android' ? 60 : 0,
      }}
    >
      <View
        className='header flex-1 border-b px-3 pb-1'
        style={{
          borderColor: text_variant_3,
          // shadowColor: text_variant_1,
          // shadowOpacity: 0.1,
          // shadowRadius: 10,
          // shadowOffset: {
          //   width: 0,
          //   height: 0,
          // },
          // elevation: Platform.OS === 'android' ? 2 : 0,
        }}
      >
        <View className='flex flex-row justify-end gap-x-5 items-center '>
          <Pressable
            onPress={() => router.back()}
            // style={{ borderColor: text_variant_1 }}
            // className={`mb-10 w-[40px] h-[40px] rounded-full border flex items-center justify-center`}
          >
            <Ionicons
              name='notifications-outline'
              size={26}
              color={text_variant_1}
            />
          </Pressable>
          <Pressable
            onPress={() => router.back()}
            // style={{ borderColor: text_variant_1 }}
            // className={`mb-10 w-[40px] h-[40px] rounded-full border flex items-center justify-center`}
          >
            <Ionicons
              name='help-circle-outline'
              size={28}
              color={text_variant_1}
            />
          </Pressable>
        </View>
        <View className='mt-5'>
          <Text
            className='text-[28px]'
            style={{ fontFamily: 'font_600', color: text_variant_1 }}
          >
            Home
          </Text>
        </View>
      </View>
      <View className='mt-[20px] px-3'>
        <View
          className='rounded-[15px] py-5'
          style={{ backgroundColor: background_variant_2 }}
        >
          <View className='hardware-status-wrapper px-5 flex flex-row'>
            <Text style={{ color: text_variant_5, fontFamily: 'font_400' }}>
              Hardware Status:
            </Text>

            <Text
              className='ml-2 underline'
              style={{ fontFamily: 'font_500', color: text_variant_5 }}
            >
              offline
            </Text>
          </View>
          <View className='px-5 mt-12'>
            <Text
              className='text-2xl'
              style={{ fontFamily: 'font_600', color: text_variant_5 }}
            >
              Talla 24
            </Text>
          </View>
        </View>
        <View className='mt-5 flex-1 flex-row'>
          <View
            className='border rounded-[15px] p-4 flex-1 mr-2'
            style={{ borderColor: text_variant_3 }}
          >
            <View
              className='flex flex-1 mr-2 justify-between flex-row 
          items-center'
            >
              <Text className='text-[12px]' style={{ fontFamily: 'font_400' }}>
                Devices
              </Text>
              <Ionicons
                name='phone-portrait-outline'
                size={26}
                color={text_variant_1}
              />
            </View>
            <View className='mt-8 py-4 flex-1 justify-center items-center'>
              <Text
                className='text-4xl'
                style={{ color: text_variant_2, fontFamily: 'font_300' }}
              >
                1
              </Text>
              <Text
                className='text-[12px] mt-2'
                style={{ color: text_variant_2, fontFamily: 'font_400' }}
              >
                Connected
              </Text>
            </View>
          </View>
          <View
            className='border rounded-[15px] p-4 flex-1 ml-2'
            style={{ borderColor: text_variant_3 }}
          >
            <View
              className='flex flex-1 mr-2 justify-between flex-row 
          items-center'
            >
              <Text className='text-[12px]' style={{ fontFamily: 'font_400' }}>
                Accounts
              </Text>
              <Ionicons
                name='people-outline'
                size={28}
                color={text_variant_1}
              />
            </View>
            <View className='flex flex-row'>
              <View
                className='mt-8 flex-1 justify-center items-center border-r pr-4 py-3'
                style={{ borderColor: text_variant_3 }}
              >
                <Text
                  className='text-4xl'
                  style={{ color: text_variant_2, fontFamily: 'font_300' }}
                >
                  1
                </Text>
                <Text
                  className='text-[12px] mt-2'
                  style={{ color: text_variant_2, fontFamily: 'font_400' }}
                >
                  online
                </Text>
              </View>
              <View className='mt-8 flex-1 justify-center items-center ml-4'>
                <Text
                  className='text-4xl'
                  style={{ color: text_variant_1, fontFamily: 'font_300' }}
                >
                  25
                </Text>
                <Text
                  className='text-[12px] mt-2'
                  style={{ color: text_variant_1, fontFamily: 'font_400' }}
                >
                  Offline
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
