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
import { AuthContext } from '@/context/Auth.context';

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

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const context = useContext(AuthContext);

  // Ensure context is not undefined
  if (!context) {
    throw new Error(
      'GlobalsContext must be used within a GlobalsContextProvider'
    );
  }

  // Now it's safe to access `testing` after the type check
  const {
    handleSignUp,
    loading,
    setError,
    setLoading,
    signUpForm,
    setSignUpForm,
  } = context;

  const signUp = () => {
    try {
      handleSignUp(
        signUpForm.fullName,
        signUpForm.email,
        signUpForm.password,
        signUpForm.confirmedPassword
      ); // Call the logIn function with email and password
    } catch (error) {
      setError('An error occurred while attempting to sign up.');
      setLoading(false);
      console.error('An error occurred:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{
        flex: 1,
        backgroundColor: background_variant_1,
        // paddingBottom: 100,
      }}
    >
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
          className={`mb-4 mt-4 w-[40px] h-[40px] rounded-full border flex items-center justify-center`}
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
            Request Access.
          </Text>
          <Text style={{ fontFamily: 'font_400' }} className='leading-[25px]'>
            Kindly create an account, and wait for an admin to approve your
            request.
          </Text>
        </View>
        <View className='sign-up-form-wrapper mt-[15px]'>
          <View className='input-group full-name flex gap-y-2 mb-[20px]'>
            <Text
              className='label'
              style={{ color: text_variant_1, fontFamily: 'font_500' }}
            >
              Full Name
            </Text>
            <TextInput
              placeholder='provide your full name'
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
                setSignUpForm({
                  ...signUpForm,
                  fullName: text,
                });
              }}
            />
          </View>
          <View className='input-group email flex gap-y-2 mb-[20px]'>
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
                setSignUpForm({
                  ...signUpForm,
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
                // console.log('email input in progress...');
                setSignUpForm({
                  ...signUpForm,
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
          <View className='input-group password flex gap-y-2 mb-[20px] relative'>
            <Text
              className='label'
              style={{ color: text_variant_1, fontFamily: 'font_500' }}
            >
              Repeat Password
            </Text>
            <TextInput
              placeholder='Repeat password'
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
              secureTextEntry={!showConfirmPassword}
              // value={loginForm.email}
              onChangeText={(password) => {
                // console.log('email input in progress...');
                setSignUpForm({
                  ...signUpForm,
                  confirmedPassword: password,
                });
              }}
            />
            <View
              className='password-visibility-controller-wrapper absolute top-[45px] 
            right-[15px]'
            >
              <Pressable
                onPress={() => setShowConfirmPassword(true)}
                className={`flex ${showConfirmPassword ? 'hidden' : 'flex'}`}
              >
                <Ionicons name='eye-outline' size={22} color={text_variant_1} />
              </Pressable>
              <Pressable
                onPress={() => setShowConfirmPassword(false)}
                className={`flex ${showConfirmPassword ? 'flex' : 'hidden'}`}
              >
                <Ionicons
                  name='eye-off-outline'
                  size={22}
                  color={text_variant_1}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View className='button-wrapper mt-[20px]'>
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
            onPress={signUp}
            disabled={loading} // Disable button while loading
            // onPress={() => router.push('/home')}
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
                Sign up/Request Access
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View
          className='sign-up-instead-wrapper flex flex-wrap gap-x-2 flex-row 
        items-center justify-center mt-[20px] pb-[150px]'
        >
          <Text
            className='text-[12px]'
            style={{
              color: `${text_variant_1}`,
              textAlign: 'center',
              fontFamily: 'font_500',
            }}
          >
            Already have an account?
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

export default LogIn;
