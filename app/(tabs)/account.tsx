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

const Profile = () => {
  const [showNameInput, setShowNameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  return (
    <KeyboardAvoidingView
      className='flex flex-1 justify-center items-center flex-col w-full'
      style={{
        backgroundColor: background_variant_1,
        paddingTop: Platform.OS === 'android' ? 50 : 0,
      }}
      behavior='padding'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <View
        className='header flex flex-row items-center mb-[10px] px-3 w-full'
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
          Account.
        </Text>
      </View>
      <ScrollView className='flex flex-1 w-full'>
        {/* <View
          className='flex flex-1 px-3'
          style={{ backgroundColor: background_variant_1 }}
        > */}
        {/* <View className='user-avatar-wrapper relative flex flex-row justify-center 
        w-full mb-10 mt-6'>
          <View>
            <Image
              style={{
                width: 100,
                objectFit: 'contain',
                height: 100,
                borderRadius: 50,
              }}
              source={mockAvatar1}
              // resizeMethod='scale'
              accessibilityLabel='user avatar'
            />
            <View
              className='absolute bottom-[5px] right-0 w-[30px] h-[30px] rounded-full flex flex-row 
            items-center justify-center'
              style={{ backgroundColor: background_variant_2 }}
            >
              <Ionicons
                name='camera-outline'
                size={22}
                color={text_variant_2}
              />
            </View>
          </View>
        </View> */}
        <View
          className='user-avatar-wrapper relative flex flex-row justify-center 
        w-full mb-6 mt-6'
        >
          <View
            className='mr-4 w-[100px] h-[100px] rounded-full flex items-center justify-center'
            style={{ backgroundColor: background_variant_3 }}
          >
            <Ionicons name='person-outline' size={30} color={text_variant_1} />
          </View>
        </View>
        <View className='other-updates-section flex px-3 mb-[100px]'>
          <View className='username flex flex-row mb-6'>
            <Ionicons name='person-outline' size={22} color={text_variant_1} />
            <View className='user-details-wrapper flex justify-between ml-4'>
              <Text
                className='user-name text-[14px] mb-3'
                style={{ color: text_variant_1, fontFamily: 'font_500' }}
              >
                Name
              </Text>
              <View
                className={`${
                  showNameInput ? 'flex' : 'hidden'
                } mb-[15px] flex-1`}
              >
                <TextInput
                  className='border border-b'
                  placeholder='add new user name'
                  style={{
                    width: '75%',
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    // border-bottom: '1px solid',
                    // backgroundColor: `${background_variant_3}`,
                    borderRadius: 10,
                    color: `${text_variant_3}`,
                    borderColor: `${text_variant_3}`,
                    fontSize: 14,
                    fontFamily: 'font_400',
                  }}
                  multiline={true}
                  placeholderTextColor={text_variant_1} // Set the placeholder color here
                  // value='Andrew James Okpainmo'
                  // value={loginForm.password}
                  // onChangeText={(text) => {
                  //   // console.log('password input in progress...');

                  //   setLoginForm({
                  //     ...loginForm,
                  //     password: text,
                  //   });
                  // }}
                />
                <TouchableOpacity
                  onPress={() => setShowNameInput(false)}
                  className='px-4 py-2 text-[12px] mt-4 w-[100px] rounded-[10px]'
                  style={{
                    backgroundColor: background_variant_5,
                  }}
                >
                  <Text
                    className='text-center'
                    style={{ fontFamily: 'font_500', color: text_variant_2 }}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                className={`user-name text-[14px] ${
                  showNameInput ? 'hidden' : 'flex'
                } mb-[15px]`}
                style={{ color: text_variant_1, fontFamily: 'font_400' }}
              >
                Andrew James Okpainmo
              </Text>
              <Text
                className='user-status text-[12px] mt-[3px] w-[80%] flex flex-wrap'
                style={{ color: text_variant_1, fontFamily: 'font_300' }}
              >
                This is your Talla-24 username, it will be visible to all users
                and admins.
              </Text>
            </View>
            <Pressable
              onPress={() => setShowNameInput(true)}
              className='absolute right-3 z-20'
              // style={{ backgroundColor: background_variant_2 }}
            >
              <Ionicons
                className='relative z-10'
                name='create-outline'
                size={22}
                color={text_variant_2}
              />
            </Pressable>
          </View>
          <View className='email flex flex-row mb-6'>
            <Ionicons name='mail-outline' size={22} color={text_variant_1} />
            <View className='user-details-wrapper flex justify-between ml-4'>
              <Text
                className='email text-[14px] mb-3'
                style={{ color: text_variant_1, fontFamily: 'font_500' }}
              >
                Email
              </Text>
              <View
                className={`${
                  showEmailInput ? 'flex' : 'hidden'
                } mb-[15px] flex-1`}
              >
                <TextInput
                  className='border border-b'
                  placeholder='add new user name'
                  style={{
                    width: '75%',
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    // border-bottom: '1px solid',
                    // backgroundColor: `${background_variant_3}`,
                    borderRadius: 10,
                    color: `${text_variant_3}`,
                    borderColor: `${text_variant_3}`,
                    fontSize: 14,
                    fontFamily: 'font_400',
                  }}
                  multiline={true}
                  placeholderTextColor={text_variant_1} // Set the placeholder color here
                  // value='Andrew James Okpainmo'
                  // value={loginForm.password}
                  // onChangeText={(text) => {
                  //   // console.log('password input in progress...');

                  //   setLoginForm({
                  //     ...loginForm,
                  //     password: text,
                  //   });
                  // }}
                />
                <TouchableOpacity
                  onPress={() => setShowEmailInput(false)}
                  className='px-4 py-2 text-[12px] mt-4 w-[100px] rounded-[10px]'
                  style={{
                    backgroundColor: background_variant_5,
                  }}
                >
                  <Text
                    className='text-center'
                    style={{ fontFamily: 'font_500', color: text_variant_2 }}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                className={`user-name text-[14px] ${
                  showEmailInput ? 'hidden' : 'flex'
                } mb-[15px]`}
                style={{ color: text_variant_1, fontFamily: 'font_400' }}
              >
                okpainmoandrew@gmail.com
              </Text>
              <Text
                className='user-status text-[12px] mt-[3px] w-[80%] flex flex-wrap'
                style={{ color: text_variant_1, fontFamily: 'font_300' }}
              >
                This is your Talla-24 email, it will be visible to all users and
                admins.
              </Text>
            </View>
            <Pressable
              onPress={() => setShowEmailInput(true)}
              className='absolute right-3 z-20'
              // style={{ backgroundColor: background_variant_2 }}
            >
              <Ionicons
                className='relative z-10'
                name='create-outline'
                size={22}
                color={text_variant_2}
              />
            </Pressable>
          </View>
        </View>

        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

// const styles = StyleSheet.create({
//   safePadding: {
//     paddingTop: Platform.OS === 'android' ? 45 : 0,
//     backgroundColor: background_variant_1,
//   },
// });
