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
  ActivityIndicator,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import {
  default_light_backgrounds,
  default_light_texts,
} from '@/constants/colours';

import { AuthContext } from '@/context/Auth.context';
import { GlobalsContext } from '@/context/Globals.context';

import GlobalModal from '@/components/Layout/GlobalModal';

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

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const globalsContext = useContext(GlobalsContext);
  const authContext = useContext(AuthContext);

  // Ensure context is not undefined
  if (!authContext || !globalsContext) {
    throw new Error('error: context error');
  }

  // Now it's safe to access `testing` after the type check
  const { handleLogin, loading } = authContext;
  const { showModal, hideModal } = globalsContext;

  const loginUser = () => {
    handleLogin(loginForm.email, loginForm.password); // Call the logIn function with email and password
  };

  return (
    <KeyboardAvoidingView
      // className='relative'
      behavior='padding'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{
        flex: 1,
        backgroundColor: background_variant_1,
      }}
    >
      <GlobalModal />
      <ScrollView
        className='px-3 mt-[15px]'
        style={{
          backgroundColor: background_variant_1,
          paddingTop: Platform.OS === 'android' ? 55 : 0,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{ borderColor: text_variant_3 }}
          className={`mb-4 w-[40px] h-[40px] rounded-full border flex items-center justify-center`}
        >
          <Ionicons
            name='chevron-back-outline'
            size={22}
            color={text_variant_3}
          />
        </Pressable>
        <Text
          className='text-[30px]'
          style={{ color: text_variant_2, fontFamily: 'font_800' }}
        >
          Log in.
        </Text>
        <View className='sign-up-form-wrapper mt-[15px]'>
          <View className='input-group email flex gap-y-2 mb-[30px]'>
            <Text
              className='label'
              style={{ color: text_variant_1, fontFamily: 'font_500' }}
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
                color: `${text_variant_1}`,
                borderColor: `${text_variant_3}`,
                fontSize: 14,
                fontFamily: 'font_400',
              }}
              placeholderTextColor={text_variant_3} // Set the placeholder color here
              // value={loginForm.email}
              onChangeText={(text) => {
                // console.log('email input in progress...');
                setLoginForm({
                  ...loginForm,
                  email: text,
                });
              }}
            />
          </View>
          <View className='input-group password flex gap-y-2 mb-[20px] relative'>
            <Text
              className='label'
              style={{ color: text_variant_1, fontFamily: 'font_500' }}
            >
              Password
            </Text>
            <TextInput
              placeholder='Enter password'
              className='border'
              style={{
                width: '100%',
                paddingHorizontal: 12,
                paddingVertical: 12,
                // backgroundColor: `${background_variant_3}`,
                borderRadius: 10,
                borderColor: `${text_variant_3}`,
                color: `${text_variant_1}`,
                fontSize: 14,
                fontFamily: 'font_400',
              }}
              placeholderTextColor={text_variant_3} // Set the placeholder color here
              secureTextEntry={!showPassword}
              // value={loginForm.email}
              onChangeText={(password) => {
                // console.log('password input in progress...');
                setLoginForm({
                  ...loginForm,
                  password: password,
                });
              }}
            />
            <View
              className='password-visibility-controller-wrapper absolute top-[45px] 
            right-[15px]'
            >
              <Pressable
                onPress={() => setShowPassword(true)}
                className={`flex ${showPassword ? 'hidden' : 'flex'}`}
              >
                <Ionicons name='eye-outline' size={22} color={text_variant_1} />
              </Pressable>
              <Pressable
                onPress={() => setShowPassword(false)}
                className={`flex ${showPassword ? 'flex' : 'hidden'}`}
              >
                <Ionicons
                  name='eye-off-outline'
                  size={22}
                  color={text_variant_1}
                />
              </Pressable>
            </View>
          </View>
          <Link
            className='text-right w-full text-[12px]'
            // href='/start-password-recovery'
            href='/reset-password'
            style={{
              color: text_variant_2,
              fontFamily: 'font_500',
            }}
          >
            Forgot password?
          </Link>
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
            onPress={loginUser}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <ActivityIndicator size='small' color='#dbeafe' />
            ) : (
              <Text
                style={{
                  fontFamily: 'font_700',
                  textAlign: 'center',
                  fontSize: 14,
                  color: `${text_variant_5}`,
                }}
              >
                Log in
              </Text>
            )}
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
            Don't have an account yet?
          </Text>
          <Link
            href='/request-access'
            className='text-[12px]'
            style={{
              color: `${text_variant_2}`,
              fontFamily: 'font_500',
            }}
          >
            Request access
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LogIn;
