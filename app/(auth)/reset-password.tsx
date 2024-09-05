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

import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';

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

const ResetPasssword = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{
        flex: 1,
        backgroundColor: background_variant_1,
      }}
    >
      <ScrollView
        className='px-3 mt-[30px]'
        style={{
          backgroundColor: background_variant_1,
          paddingTop: Platform.OS === 'android' ? 55 : 0,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{ borderColor: text_variant_3 }}
          className={`mb-10 w-[40px] h-[40px] rounded-full border flex items-center justify-center`}
        >
          <Ionicons
            name='chevron-back-outline'
            size={22}
            color={text_variant_3}
          />
        </Pressable>
        <View className='bold page text'>
          <Text
            className='text-[30px]'
            style={{ color: text_variant_2, fontFamily: 'font_800' }}
          >
            Reset password.
          </Text>
          <Text
            style={{ fontFamily: 'font_400' }}
            className='mt-2 leading-[25px]'
          >
            Kindly provide your email. Your new password will be send to the
            provided email address.
          </Text>
        </View>
        <View className='sign-up-form-wrapper mt-[20px]'>
          <View className='input-group email flex gap-y-2 mb-[20px]'>
            <Text
              className='label'
              style={{ color: text_variant_1, fontFamily: 'font_400' }}
            >
              Email
            </Text>
            <TextInput
              placeholder='Enter your email'
              className='border border-b'
              style={{
                width: '100%',
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
              placeholderTextColor={text_variant_3} // Set the placeholder color here
              // value={loginForm.email}
              onChangeText={(text) => {
                // console.log('email input in progress...');
                // setLoginForm({
                //   ...loginForm,
                //   email: text,
                // });
              }}
            />
          </View>
        </View>
        <View className='button-wrapper mt-[25px]'>
          <TouchableOpacity
            style={{
              backgroundColor: background_variant_2,
              paddingVertical: 15,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 10,
              width: '100%',
              cursor: 'pointer',
            }}
            onPress={() => router.push('/home')}
          >
            <Text
              style={{
                fontFamily: 'font_700',
                textAlign: 'center',
                fontSize: 14,
                color: `${text_variant_5}`,
              }}
            >
              Request Password Reset
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className='sign-up-instead-wrapper flex flex-wrap gap-x-2 flex-row 
        items-center justify-center mt-[20px]'
        >
          <Text
            className='text-[12px]'
            style={{
              color: `${text_variant_1}`,
              textAlign: 'center',
              fontFamily: 'font_500',
            }}
          >
            Recalled password?
          </Text>
          <Link
            href='/log-in'
            className='text-[12px]'
            style={{
              color: `${text_variant_2}`,
              fontFamily: 'font_500',
            }}
          >
            Log in
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasssword;
