import {
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const mockAvatar1 = require('../../assets/images/img-3.jpg');

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
} = default_light_backgrounds || {};
const {
  text_variant_1,
  text_variant_2,
  text_variant_3,
  text_variant_4,
  text_variant_5,
} = default_light_texts || {};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={{
        backgroundColor: background_variant_1,
        paddingTop: Platform.OS === 'android' ? 50 : 0,
      }}
      className='w-full'
    >
      <View
        className='header flex flex-row items-center px-3 pb-[7px]'
        style={{ backgroundColor: background_variant_1 }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{ borderColor: text_variant_3 }}
          className={`mr-6 w-[40px] h-[40px] rounded-full border flex items-center justify-center`}
        >
          <Ionicons
            name='chevron-back-outline'
            size={22}
            color={text_variant_3}
          />
        </Pressable>
        <Text
          className='text-[25px] mt-1'
          style={{ color: text_variant_1, fontFamily: 'font_800' }}
        >
          Notifications.
        </Text>
      </View>
      <ScrollView className='px-3'>
        <View className='pb-[60px] mt-[50px] hidden'>
          <Text
            className='text-[14px] leading-[25px] text-center'
            style={{ fontFamily: 'font_400' }}
          >
            There are no notifications to view...
          </Text>
        </View>
        <View className='notifications-rack flex mt-3 pb-[100px]'>
          <View
            className='access-request-card w-full flex-1  border rounded-[10px] p-3 mb-4'
            style={{ borderColor: text_variant_3 }}
          >
            <Text
              className='mb-2'
              style={{ color: text_variant_1, fontFamily: 'font_400' }}
            >
              Access request
            </Text>
            <View className='flex flex-row items-center'>
              {/* <Image
              style={{
                width: 50,
                objectFit: 'contain',
                height: 50,
                borderRadius: 50,
              }}
              source={mockAvatar1}
              // resizeMethod='scale'
              accessibilityLabel='user avatar'
            /> */}
              <View
                className='mr-4 w-[50px] h-[50px] rounded-full flex items-center justify-center'
                style={{ backgroundColor: background_variant_3 }}
              >
                <Ionicons
                  name='person-outline'
                  size={22}
                  color={text_variant_1}
                />
              </View>
              <View className='flex justify-between'>
                <Text
                  className='text-[14px]'
                  style={{ color: text_variant_1, fontFamily: 'font_600' }}
                >
                  Andrew Okpainmo
                </Text>
                <Text
                  className='text-[11px] mt-[3px]'
                  style={{ color: text_variant_1, fontFamily: 'font_400' }}
                >
                  okpainmoandrew@gmail.com
                </Text>
              </View>
            </View>
            <View className='flex-1 w-full flex-row mt-4'>
              <Pressable
                // href={'/stream'}
                className='rounded-[10px] px-4 flex items-center justify-center py-3 mr-2'
                style={{
                  // fontFamily: 'font_200',
                  backgroundColor: background_variant_2,
                }}
                // asChild
              >
                <TouchableOpacity>
                  <Text
                    className='text-[12px]'
                    style={{ color: text_variant_5, fontFamily: 'font_500' }}
                  >
                    Approve
                  </Text>
                </TouchableOpacity>
              </Pressable>
              <Pressable
                // href={'/log-in'}
                className='rounded-[10px] px-4 flex items-center justify-center py-3 
                mr-2'
                style={{
                  // fontFamily: 'font_200',
                  backgroundColor: background_variant_5,
                }}
                // asChild
              >
                <TouchableOpacity>
                  <Text
                    className='text-[12px] text-blue-700'
                    style={{ fontFamily: 'font_500' }}
                  >
                    Decline
                  </Text>
                </TouchableOpacity>
              </Pressable>
            </View>
          </View>
          <View
            className='access-request-card w-full flex-1  border rounded-[10px] p-3 mb-4'
            style={{ borderColor: text_variant_3 }}
          >
            <Text
              className='mb-2'
              style={{ color: text_variant_1, fontFamily: 'font_400' }}
            >
              Access request
            </Text>
            <View className='flex flex-row items-center'>
              {/* <Image
              style={{
                width: 50,
                objectFit: 'contain',
                height: 50,
                borderRadius: 50,
              }}
              source={mockAvatar1}
              // resizeMethod='scale'
              accessibilityLabel='user avatar'
            /> */}
              <View
                className='mr-4 w-[50px] h-[50px] rounded-full flex items-center justify-center'
                style={{ backgroundColor: background_variant_3 }}
              >
                <Ionicons
                  name='person-outline'
                  size={22}
                  color={text_variant_1}
                />
              </View>
              <View className='flex justify-between'>
                <Text
                  className='text-[14px]'
                  style={{ color: text_variant_1, fontFamily: 'font_600' }}
                >
                  Andrew Okpainmo
                </Text>
                <Text
                  className='text-[11px] mt-[3px]'
                  style={{ color: text_variant_1, fontFamily: 'font_400' }}
                >
                  okpainmoandrew@gmail.com
                </Text>
              </View>
            </View>
            <View className='flex-1 w-full flex-row mt-4'>
              <Pressable
                // href={'/stream'}
                className='rounded-[10px] px-4 flex items-center justify-center py-3 mr-2'
                style={{
                  // fontFamily: 'font_200',
                  backgroundColor: background_variant_2,
                }}
                // asChild
              >
                <TouchableOpacity>
                  <Text
                    className='text-[12px]'
                    style={{ color: text_variant_5, fontFamily: 'font_500' }}
                  >
                    Approve
                  </Text>
                </TouchableOpacity>
              </Pressable>
              <Pressable
                // href={'/log-in'}
                className='rounded-[10px] px-4 flex items-center justify-center py-3 
                mr-2'
                style={{
                  // fontFamily: 'font_200',
                  backgroundColor: background_variant_5,
                }}
                // asChild
              >
                <TouchableOpacity>
                  <Text
                    className='text-[12px] text-blue-700'
                    style={{ fontFamily: 'font_500' }}
                  >
                    Decline
                  </Text>
                </TouchableOpacity>
              </Pressable>
            </View>
          </View>
          <View
            className='access-request-card w-full flex-1  border rounded-[10px] p-3 mb-4'
            style={{ borderColor: text_variant_3 }}
          >
            <Text
              className='mb-2'
              style={{ color: text_variant_1, fontFamily: 'font_400' }}
            >
              Access request
            </Text>
            <View className='flex flex-row items-center'>
              {/* <Image
              style={{
                width: 50,
                objectFit: 'contain',
                height: 50,
                borderRadius: 50,
              }}
              source={mockAvatar1}
              // resizeMethod='scale'
              accessibilityLabel='user avatar'
            /> */}
              <View
                className='mr-4 w-[50px] h-[50px] rounded-full flex items-center justify-center'
                style={{ backgroundColor: background_variant_3 }}
              >
                <Ionicons
                  name='person-outline'
                  size={22}
                  color={text_variant_1}
                />
              </View>
              <View className='flex justify-between'>
                <Text
                  className='text-[14px]'
                  style={{ color: text_variant_1, fontFamily: 'font_600' }}
                >
                  Andrew Okpainmo
                </Text>
                <Text
                  className='text-[11px] mt-[3px]'
                  style={{ color: text_variant_1, fontFamily: 'font_400' }}
                >
                  okpainmoandrew@gmail.com
                </Text>
              </View>
            </View>
            <View className='flex-1 w-full flex-row mt-4'>
              <Pressable
                // href={'/stream'}
                className='rounded-[10px] px-4 flex items-center justify-center py-3 mr-2'
                style={{
                  // fontFamily: 'font_200',
                  backgroundColor: background_variant_2,
                }}
                // asChild
              >
                <TouchableOpacity>
                  <Text
                    className='text-[12px]'
                    style={{ color: text_variant_5, fontFamily: 'font_500' }}
                  >
                    Approve
                  </Text>
                </TouchableOpacity>
              </Pressable>
              <Pressable
                // href={'/log-in'}
                className='rounded-[10px] px-4 flex items-center justify-center py-3 
                mr-2'
                style={{
                  // fontFamily: 'font_200',
                  backgroundColor: background_variant_5,
                }}
                // asChild
              >
                <TouchableOpacity>
                  <Text
                    className='text-[12px] text-blue-700'
                    style={{ fontFamily: 'font_500' }}
                  >
                    Decline
                  </Text>
                </TouchableOpacity>
              </Pressable>
            </View>
          </View>
          <View
            className='access-request-card w-full flex-1  border rounded-[10px] p-3 mb-4'
            style={{ borderColor: text_variant_3 }}
          >
            <Text
              className='mb-2'
              style={{ color: text_variant_1, fontFamily: 'font_400' }}
            >
              Access request
            </Text>
            <View className='flex flex-row items-center'>
              {/* <Image
              style={{
                width: 50,
                objectFit: 'contain',
                height: 50,
                borderRadius: 50,
              }}
              source={mockAvatar1}
              // resizeMethod='scale'
              accessibilityLabel='user avatar'
            /> */}
              <View
                className='mr-4 w-[50px] h-[50px] rounded-full flex items-center justify-center'
                style={{ backgroundColor: background_variant_3 }}
              >
                <Ionicons
                  name='person-outline'
                  size={22}
                  color={text_variant_1}
                />
              </View>
              <View className='flex justify-between'>
                <Text
                  className='text-[14px]'
                  style={{ color: text_variant_1, fontFamily: 'font_600' }}
                >
                  Andrew Okpainmo
                </Text>
                <Text
                  className='text-[11px] mt-[3px]'
                  style={{ color: text_variant_1, fontFamily: 'font_400' }}
                >
                  okpainmoandrew@gmail.com
                </Text>
              </View>
            </View>
            <View className='flex-1 w-full flex-row mt-4'>
              <Pressable
                // href={'/stream'}
                className='rounded-[10px] px-4 flex items-center justify-center py-3 mr-2'
                style={{
                  // fontFamily: 'font_200',
                  backgroundColor: background_variant_2,
                }}
                // asChild
              >
                <TouchableOpacity>
                  <Text
                    className='text-[12px]'
                    style={{ color: text_variant_5, fontFamily: 'font_500' }}
                  >
                    Approve
                  </Text>
                </TouchableOpacity>
              </Pressable>
              <Pressable
                // href={'/log-in'}
                className='rounded-[10px] px-4 flex items-center justify-center py-3 
                mr-2'
                style={{
                  // fontFamily: 'font_200',
                  backgroundColor: background_variant_5,
                }}
                // asChild
              >
                <TouchableOpacity>
                  <Text
                    className='text-[12px] text-blue-700'
                    style={{ fontFamily: 'font_500' }}
                  >
                    Decline
                  </Text>
                </TouchableOpacity>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;
